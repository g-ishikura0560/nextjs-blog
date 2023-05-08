import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import FOG from "vanta/dist/vanta.fog.min";
import * as THREE from "three";

import Footer from "./footer";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";

const name = "Neut Code Engineer Blog";
export const siteTitle = "Neut Blog";

const Layout = ({ children, home }) => {
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      window.THREE = THREE;
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE: window.THREE,
          highlightColor: "CC99FF",
        })
      );
    }
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header} ref={vantaRef}>
        <h1 className={utilStyles.heading2Xl}>{name}</h1>
      </header>
      <main>{children}</main>
      {!home && (
        <div className={utilStyles.blogArea}>
          <Link href="/">← ホームへ戻る</Link>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Layout;
