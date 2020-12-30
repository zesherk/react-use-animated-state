import * as React from "react";
import transitions from "./transitions";

type AnimationType = keyof typeof transitions;
interface CustomAnimation {
  duration: number;
  from: React.CSSProperties;
  to: React.CSSProperties;
  transition?: {
    property: React.CSSProperties["transitionProperty"];
    timingFunction: React.CSSProperties["transitionTimingFunction"];
    delay?: React.CSSProperties["transitionDelay"];
  };
}

export default function useAnimatedState(
  value: boolean,
  options: CustomAnimation | AnimationType = "fade"
) {
  const [show, setShow] = React.useState<boolean>(value);
  const [animateShow, setAnimateShow] = React.useState<boolean>(value);
  const [style, setStyle] = React.useState<React.CSSProperties>({});
  const AnimationTimer = React.useRef<ReturnType<typeof setTimeout>>();
  const RequestAnimation = React.useRef<
    ReturnType<typeof requestAnimationFrame>
  >();

  const config = React.useMemo(() => {
    // @TODO Think of a better condition
    if (typeof options === "string") {
      return transitions[options as AnimationType];
    }
    return options as CustomAnimation;
  }, [options]);

  React.useEffect(() => {
    if (animateShow) {
      setShow(animateShow);
      RequestAnimation.current = requestAnimationFrame(() => {
        setStyle(config.to);
      });
    }
    setStyle(config.from);
    AnimationTimer.current = setTimeout(() => {
      setShow(animateShow);
    }, config.duration);

    return () => {
      if (AnimationTimer.current) clearTimeout(AnimationTimer.current);
      if (RequestAnimation.current)
        cancelAnimationFrame(RequestAnimation.current);
    };
  }, [animateShow]);

  return [
    show,
    setAnimateShow,
    {
      style: {
        ...((config as CustomAnimation).transition
          ? {
              transitionProperty: (config as CustomAnimation).transition
                ?.property,
              transitionTimingFunction: (config as CustomAnimation).transition
                ?.timingFunction,
              transitionDuration: `${(config as CustomAnimation).duration}ms`,
              ...((config as CustomAnimation).transition?.delay && {
                transitionDelay: (config as CustomAnimation).transition?.delay,
              }),
            }
          : {
              transition: `all cubic-bezier(.46,.1,.52,.98) ${config.duration}ms`,
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
