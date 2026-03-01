export const sectionAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

export const containerVariants = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const itemVariants = {
  initial: { opacity: 0, y: 20 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const buttonHoverTap = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
};

export const cardHoverTap = {
  whileHover: { y: -5 },
  whileTap: { scale: 0.98 }
};