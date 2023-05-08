import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Layout, { siteTitle } from "../components/layout";
import { getPostsData } from "../lib/post";

import styles from "../styles/Home.module.css";
import utilStyle from "../styles/utils.module.css";

// SSG
export async function getStaticProps() {
  const allPostsData = getPostsData();
  return {
    props: {
      allPostsData: allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className={utilStyle.headingMd}>
        TODO: ここにタグフィルターを行える機能がほしい
      </div>

      <div className={`${utilStyle.headingMd} ${utilStyle.padding50px}`}>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={thumbnail} className={styles.thumbnailImage} />
              </Link>
              <Link legacyBehavior href={`/posts/${id}`}>
                <a className={utilStyle.boldText}>{title}</a>
              </Link>
              <br />
              <div className={utilStyle.lightText}>{date}</div>
              <div>TODO: mdから取得したtag情報</div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
