# React Use Animated State


Use Animated State is a React custom hook that allows animating components when added or removed from the React tree, using simple CSS transitions.

It goes around the gap react has in components' lifecycle, since there isn't a method that notifies components when they're about to be unmounted, and allows them to run an operation before the unmounting is complete.


## Installation

To get started, add `react-use-animated-state` to your project:

```bash
yarn add react-use-animated-state
```

Or 

```bash
npm install --save react-use-animated-state
```

Please note that react-use-animated-state requires react@^16.8.0 as a peer dependency.


## Basic Usage

Use can use `useAnimatedState` exactly as `React.useState` is used; the main difference is that `useAnimatedState` returns an extra style object that needs to be passed down to the component that is being animated.

```jsx
import { useAnimatedState } from "react-use-animated-state";


function App() {
  // Use the hook the same way you would use React.useState, but fetch the style.
  const [show, setShow, { style }] = useAnimatedState(false);

  return (
    <>
      // Toggle the element, please note that setShow is simply a React.useState setter. 
      <button onClick={() => setShow((v) => !v)}>Toggle with animation</button>

      // Conditionally (un)mount the element, and populate the style useAnimatedState returned.
      {show && <div style={style}>I'm fading!</div>}
    </>
  );
}
```
By default, a fading transition is applied. Optionally, a second parameter can be passed down to the hook to choose another pre-defined animation.

```jsx
const [show, setShow, { style }] = useAnimatedState(false, "shiftAway");
```

The possible options are `fade`, `shiftAway`, and `shiftToward`.


## Advanced Usage
To use a custom animation, you can pass an object as a second parameter of the hook; the object should contain a `from`, `to`, and `duration` properties.
- `from` and `to`:
  - Type: **CSSProperties**: Both should describe the CSS props the component should transition while (un)mounting.
- `duration`: 
  - Type: **number**; The length of time the transition should take to complete in ms.

```jsx
  const [show, setShow, { style }] = useAnimatedState(false, {
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
    duration: 200,
  });
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)
