import * as React from "react";
import transitions from "./transitions";

type AnimationType = "fade" | "shiftAway";
interface CustomAnimation {
  timeout: number;
  from: React.CSSProperties;
  to: React.CSSProperties;
  transition?: {
    property: React.CSSProperties["transitionProperty"];
    duration: React.CSSProperties["transitionDuration"];
    timingFunction: React.CSSProperties["transitionTimingFunction"];
    delay?: React.CSSProperties["transitionDelay"];
  };
}

export default function useAnimatedState(
  value: boolean,
  options: CustomAnimation | AnimationType = "fade"
) {
  const [show, setShow] = React.useState<boolean>(value);
  const [fakeShow, setFakeShow] = React.useState<boolean>(value);

  const [style, setStyle] = React.useState<React.CSSProperties>({});
  const config = React.useMemo(() => {
    // @TODO Think of a better condition
    if (typeof options === "string") {
      return transitions[options as AnimationType];
    }
    return options as CustomAnimation;
  }, [options]);

  React.useEffect(() => {
    if (fakeShow) {
      setShow(fakeShow);
      setStyle(config.from);
      setTimeout(() => {
        setStyle(config.to);
      });
    } else {
      setStyle({ ...config.from });
      setTimeout(() => {
        setShow(fakeShow);
      }, config.timeout);
    }
  }, [fakeShow]);

  return [
    show,
    setFakeShow,
    {
      style: {
        ...((config as CustomAnimation).transition
          ? {
              transitionProperty: (config as CustomAnimation).transition
                ?.property,
              transitionDuration: (config as CustomAnimation).transition
                ?.duration,
              transitionTimingFunction: (config as CustomAnimation).transition
                ?.timingFunction,
              ...((config as CustomAnimation).transition?.delay && {
                transitionDelay: (config as CustomAnimation).transition?.delay,
              }),
            }
          : {
              transition: `all cubic-bezier(.46,.1,.52,.98) ${config.timeout}ms`,
            }),
        ...style,
      },
    },
  ] as [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
    {
      style: React.CSSProperties;
    }
  ];
}
