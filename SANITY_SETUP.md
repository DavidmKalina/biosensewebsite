# Sanity content setup

This site's content (projects, categories, team, publications, news, partners)
is managed in [Sanity](https://www.sanity.io). Your professor edits content in a
web app (Sanity Studio) and the changes appear on the live site within about a
minute, with no code change or redeploy needed.

The per-person publication feed on each profile is still pulled live from
Semantic Scholar and is unaffected by any of this.

Do these steps once. Anything marked **(you)** only needs a developer; the
professor only ever needs the Studio URL from step 6.

---

## 1. Create the Sanity project (you)

1. Go to <https://sanity.io/manage>, sign in (Google or GitHub).
2. Create a new project, e.g. "BioSIS Lab".
3. Copy the **Project ID** (looks like `a1b2c3d4`).
4. Open the project, go to **Datasets**, and make sure a dataset named
   `production` exists and is set to **Public** (so the website can read it).

## 2. Configure the Studio (you)

```bash
cd studio
cp .env.example .env        # then edit .env
npm install
```

Edit `studio/.env` and set:

- `SANITY_STUDIO_PROJECT_ID` = the Project ID from step 1
- `SANITY_WRITE_TOKEN` = a token with **Editor** rights, created at
  sanity.io/manage -> your project -> **API -> Tokens**. Only used for the
  one-time migration below; never commit it (it's gitignored).

Then log in the CLI:

```bash
npx sanity login
```

## 3. Migrate the existing content (you)

This copies all the content currently hard-coded in `src/data/sampleData.ts`
into Sanity and uploads the images from `public/images`:

```bash
# from the studio/ folder
npm run migrate
```

Run it **once**. When it finishes, run `npm run dev` inside `studio/` and check
everything looks right at <http://localhost:3333>.

## 4. Deploy the Studio so the professor can use it (you)

```bash
# from the studio/ folder
npx sanity deploy
```

Pick a hostname when prompted, e.g. `biosis`. The Studio is then live at
`https://biosis.sanity.studio`. That URL is what the professor bookmarks and
logs into. (You can re-run `npx sanity deploy` any time the schema changes.)

## 5. Allow the website to read from Sanity (you)

Add the website's URLs as **CORS origins** at sanity.io/manage -> your project
-> **API -> CORS origins** (no credentials needed):

- `http://localhost:5173` (local development)
- your Cloudflare Pages URL, e.g. `https://biosislab.au` and the
  `*.pages.dev` preview URL

## 6. Point the website at Sanity (you)

In the project root:

```bash
cp .env.example .env        # then set VITE_SANITY_PROJECT_ID
npm install                 # installs the new @sanity/client dependency
```

Set in the root `.env`:

- `VITE_SANITY_PROJECT_ID` = the Project ID from step 1
- `VITE_SANITY_DATASET` = `production`

For the deployed site, add those same two variables in
**Cloudflare Pages -> your project -> Settings -> Environment variables**, then
redeploy.

---

## Day-to-day editing (the professor)

1. Go to the Studio URL (e.g. `https://biosis.sanity.studio`) and log in.
2. Edit a Project, Category, Team member, etc. Upload images by dragging them in.
3. Click **Publish**. The change appears on the live site within ~a minute.

To add a project to a category, the professor just picks a **Subcategory** from
a dropdown on the project (each subcategory belongs to a category), so there are
no IDs to type.
