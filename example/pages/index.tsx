import Head from "next/head";
import styles from "../styles/Home.module.css";

import { useState, useEffect } from "react";
import { useAnimatedState } from "../../use-animated-state/dist";

export default function Home() {
  const [show, setShow, { style }] = useAnimatedState(false, "shiftAway");

  return (
    <div className={styles.container}>
      <Head>
        <title>React useAnimatesState hook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          React <a href="https://nextjs.org">useAnimatesState</a> hook
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
          <div>
            {show && (
              <div className={styles.card} style={style}>
                <h3>I'm transitioning!</h3>
                <p>Discover and deploy boilerplate example Next.js projects.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/zesherk"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with ❤ by <strong>Zesherk</strong>
        </a>
      </footer>
    </div>
  );
}
