// src/components/home/animationVariants.ts

// For the entire section wrapper
export const sectionAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

// For the grid/list container to stagger children
export const containerVariants = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  viewport: { once: true },
};

// For each item (card) in the grid/list
export const itemVariants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// For interactive buttons
export const buttonHoverTap = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

// For interactive cards
export const cardHoverTap = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.98 },
};