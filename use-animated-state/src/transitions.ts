const timeout = 200;
const transitions = {
  fade: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    timeout,
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
    timeout,
  },
};

export default transitions;
