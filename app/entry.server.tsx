/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import type { ActionFunctionArgs, AppLoadContext, EntryContext, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { NonceContext } from "./misc/nonce-context";

const ABORT_DELAY = 5000;

const features = ['accelerometer', 'ambient-light-sensor', 'attribution-reporting', 'autoplay', 'bluetooth', 'browsing-topics', 'camera', 'compute-pressure', 'cross-origin-isolated', 'deferred-fetch', 'deferred-fetch-minimal', 'display-capture', 'document-domain', 'encrypted-media', 'fullscreen', 'gamepad', 'geolocation', 'gyroscope', 'hid', 'identity-credentials-get', 'idle-detection', 'local-fonts', 'magnetometer', 'microphone', 'midi', 'otp-credentials', 'payment', 'picture-in-picture', 'publickey-credentials-create', 'publickey-credentials-get', 'screen-wake-lock', 'serial', 'speaker-selection', 'storage-access', 'usb', 'web-share', 'window-management', 'xr-spatial-tracking'] as const;

function setSecHeaders(responseHeaders: Headers) {
  responseHeaders.set("X-Content-Type-Options", "nosniff");
  responseHeaders.set("Cross-Origin-Resource-Policy", "same-site");
  if(!process.env.CF_PAGES)
    responseHeaders.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
}

export function handleDataRequest(
  response: Response,
  {
    request,
    params,
    context,
  }: LoaderFunctionArgs | ActionFunctionArgs
) {
  setSecHeaders(response.headers);
  return response;
}

const hexlist = '0123456789abcdef';
const b64list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function guid_to_base64(g: string) {
  let s = g.replace(/[^0-9a-f]/ig, '').toLowerCase();
  s += '0';
  let a, p, q;
  let r = '';
  let i = 0;
  while (i < 33) {
    a = (hexlist.indexOf(s.charAt(i++)) << 8) |
      (hexlist.indexOf(s.charAt(i++)) << 4) |
      (hexlist.indexOf(s.charAt(i++)));
    p = a >> 6;
    q = a & 63;
    r += b64list.charAt(p) + b64list.charAt(q);
  }
  return r;
}

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  // This is ignored so we can keep it in the template for visibility.  Feel
  // free to delete this parameter in your app if you're not using it!
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadContext: AppLoadContext
) {
  const noncevalue = guid_to_base64(crypto.randomUUID());
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ABORT_DELAY);
      
  const body = await renderToReadableStream(
    <NonceContext.Provider value={noncevalue}><RemixServer
      context={remixContext}
      url={request.url}
      abortDelay={ABORT_DELAY}
      nonce={noncevalue}
    /></NonceContext.Provider>,
    {
      nonce: noncevalue,
      signal: controller.signal,
      onError(error: unknown) {
        if (!controller.signal.aborted) {
          // Log streaming rendering errors from inside the shell
          console.error(error);
        }
        responseStatusCode = 500;
      },
    }
  );

  body.allReady.then(() => clearTimeout(timeoutId));

  if (isbot(request.headers.get("user-agent") || "")) {
    await body.allReady;
  }
  responseHeaders.set("Content-Type", "text/html");
  responseHeaders.set("X-Frame-Options", 'SAMEORIGIN');
  responseHeaders.set("X-Xss-Protection", "1; mode=block");
  setSecHeaders(responseHeaders);
  responseHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
  responseHeaders.set("Permissions-Policy", `interest-cohort=(), ${features.map(i => `${i}=(self)`).join(", ")}`);
  
  responseHeaders.set("Cross-Origin-Embedder-Policy", "require-corp");
  responseHeaders.set("Cross-Origin-Opener-Policy", "same-origin");
  responseHeaders.set("Cross-Origin-Resource-Policy", "same-site");

  responseHeaders.set("Content-Security-Policy", `default-src 'self'; script-src https://challenges.cloudflare.com static.cloudflareinsights.com 'self' 'strict-dynamic' 'nonce-${noncevalue}' 'unsafe-inline'; style-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com 'unsafe-inline'; frame-src https://challenges.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com; connect-src cloudflareinsights.com 'self' https://api.semanticscholar.org; prefetch-src https://fonts.gstatic.com https://fonts.googleapis.com https://api.semanticscholar.org; child-src 'none'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests; block-all-mixed-content; disown-opener; base-uri 'none'`); //; require-trusted-types-for 'script'

  responseHeaders.set("Service-Worker-Allowed", "/");
  const hints = "Accept, Sec-CH-UA, Sec-CH-UA-Mobile, Sec-CH-UA-Platform, Sec-CH-UA-Form-Factors, Sec-CH-UA-Model, Sec-CH-UA-Platform-Version, Sec-CH-Prefers-Reduced-Transparency, Sec-CH-Prefers-Reduced-Motion, Sec-CH-Prefers-Color-Scheme, Device-Memory, Width, Viewport-Width, Save-Data, Downlink, ECT, RTT, Available-Dictionary, Dictionary-ID, Use-As-Dictionary, Origin-Agent-Cluster, Accept-Signature, Early-Data, Signature, Signed-Headers, Speculation-Rules, Supports-Loading-Mode";
  responseHeaders.set("Accept-CH", hints);
  responseHeaders.set("Vary", hints);
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
