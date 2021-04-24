export const pageEffect = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

export const hoverMotion = {
  rest: { opacity: 0, ease: "easeOut", duration: 0.5, type: "tween" },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeIn",
    },
  },
};
