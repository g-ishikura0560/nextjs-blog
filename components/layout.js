import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { selectedTagState } from "../grobalStates/selectedTagAtom";
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
  const setText = useSetRecoilState(selectedTagState);
  const router = useRouter();

  const goHome = () => {
    setText("");
    router.push("/");
  };

  useEffect(() => {
    if (!vantaEffect) {
      window.THREE = THREE;
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE: window.THREE,
          highlightColor: "pink",
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
        <div className={styles.name} onClick={goHome}>
          <h1 className={utilStyles.heading2Xl}>{name}</h1>
        </div>
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
