import * as React from "react";

export default function useAnimatedState(
  value: boolean,
  options: {
    timeout: number;
    from: React.CSSProperties;
    to: React.CSSProperties;
  }
) {
  const [show, setShow] = React.useState<boolean>(value);
  const [fakeShow, setFakeShow] = React.useState<boolean>(value);

  const [style, setStyle] = React.useState<React.CSSProperties>({});

  React.useEffect(() => {
    if (fakeShow) {
      setShow(fakeShow);
      setStyle(options.from);
      setTimeout(() => {
        setStyle(options.to);
      });
    } else {
      setStyle({ ...options.from });
      setTimeout(() => {
        setShow(fakeShow);
      }, options.timeout);
    }
  }, [fakeShow]);

  return [
    show,
    setFakeShow,
    {
      style: { transition: `all ease ${options.timeout}ms`, ...style },
    },
  ] as [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
    {
      style: React.CSSProperties;
    }
  ];
}
