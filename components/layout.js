import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";

const name = "Neut Code Engineer Blog";
export const siteTitle = "Neut Blog";

const Layout = ({ children, home }) => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Link href="https://neutcode.com/">
          <img
            src="/images/logo_square.png"
            className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
          />
        </Link>
        <h1 className={utilStyles.heading2Xl}>{name}</h1>
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="https://neutcode.com/">← ホームへ戻る</Link>
        </div>
      )}
    </div>
  );
};

export default Layout;
