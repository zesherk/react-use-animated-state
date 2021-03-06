const duration = 200;
const transitions = {
  fade: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    duration,
  },
  shiftAway: {
    from: {
      transform: "translateY(-10px)",
      transformOrigin: "0 -50%",
      opacity: 0,
    },
    to: {
      transform: "translateY(0)",
      transformOrigin: "0 -50%",
      opacity: 1,
    },
    duration,
  },
  shiftToward: {
    from: {
      transform: "translateY(10px)",
      transformOrigin: "0 -50%",
      opacity: 0,
    },
    to: {
      transform: "translateY(0)",
      transformOrigin: "0 -50%",
      opacity: 1,
    },
    duration,
  },
};

export default transitions;
