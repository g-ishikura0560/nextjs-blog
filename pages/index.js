import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRecoilState } from "recoil";

import Layout, { siteTitle } from "../components/layout";
import { selectedTagState } from "../grobalStates/selectedTagAtom";
import { getPostsData } from "../lib/post";

import styles from "../styles/Home.module.css";
import utilStyles from "../styles/utils.module.css";

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
  const [selectedTag, setSelectedTag] = useRecoilState(selectedTagState);
  const onClickTag = (tag) => {
    setSelectedTag(tag);
  };
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className={utilStyles.headingMd}>
        TODO: ここにタグフィルターを行える機能がほしい
      </div>

      <div className={`${utilStyles.headingMd} ${utilStyles.padding50px}`}>
        <div className={styles.grid}>
          {allPostsData.map(
            ({ id, title, date, thumbnail, tags }) =>
              (selectedTag === "" || tags.find((t) => t === selectedTag)) && (
                <article key={id}>
                  <Link href={`/posts/${id}`}>
                    <img src={thumbnail} className={styles.thumbnailImage} />
                  </Link>
                  <Link legacyBehavior href={`/posts/${id}`}>
                    <a className={utilStyles.boldText}>{title}</a>
                  </Link>
                  <br />
                  <div className={utilStyles.lightText}>{date}</div>
                  {tags.map((t) => (
                    <button
                      key={t}
                      className={utilStyles.tagsButton}
                      onClick={() => onClickTag(t)}
                    >
                      {t}
                    </button>
                  ))}
                </article>
              )
          )}
        </div>
      </div>
    </Layout>
  );
}
