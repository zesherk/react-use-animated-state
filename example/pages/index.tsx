import { useState, useEffect } from "react";
import { useAnimatedState } from "../../use-animated-state/dist";

export default function Index() {
  const [show, setShow, { style }] = useAnimatedState(false, {
    timeout: 200,
    from: { height: "0px" },
    to: { height: "100px" },
  });

  return (
    <>
      <div onClick={() => setShow((v) => !v)}>Animate</div>

      {show && (
        <div
          style={
            {
              width: "100px",
              height: "100px",
              background: "black",
              ...style,
            } as any
          }
        />
      )}
    </>
  );
}
