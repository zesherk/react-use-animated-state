import Head from "next/head";
import styles from "../styles/Home.module.css";

import { useAnimatedState } from "../../use-animated-state/dist";

export default function Home() {
  const [show, setShow, { style }] = useAnimatedState(false, "shiftAway");

  return (
    <div className={styles.container}>
      <Head>
        <title>React useAnimatedState hook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          React{" "}
          <a
            target="_blank"
            href="https://github.com/zesherk/use-animated-state"
          >
            useAnimatedState
          </a>{" "}
          hook
        </h1>
        <p className={styles.description}>
          Custom hook to animate mounting & unmounting components
        </p>
        <div
          className={styles.grid}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div
            onClick={() => setShow((v) => !v)}
            style={{
              padding: "0 12px",
              background: "#FF4757",
              borderRadius: "8px",
              height: "40px",
              lineHeight: "40px",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Toggle component
          </div>

          {show && (
            <div className={styles.card} style={style}>
              <h3>I'm transitioning!</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        Made with ❤ by{" "}
        <a href="https://github.com/zesherk" target="_blank">
          Zesherk
        </a>
      </footer>
    </div>
  );
}
