import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRecoilState } from "recoil";

import Layout, { siteTitle } from "../components/layout";
import { selectedTagState } from "../grobalStates/selectedTagAtom";
import { getPostsData } from "../lib/post";

import styles from "../styles/Home.module.css";
import utilStyles from "../styles/utils.module.css";

// SSG
export async function getStaticProps() {
  const allPostsData = getPostsData();
  const sortData = allPostsData.sort(
    (x, y) => -(new Date(x.date).getTime() - new Date(y.date).getTime())
  );
  const tags = allPostsData.map((d) => {
    return d.tags;
  });
  const tagsSet = new Set(tags.reduce((x, y) => [...x, ...y]));
  return {
    props: {
      allPostsData: sortData,
      allTags: [...tagsSet],
    },
  };
}

export default function Home({ allPostsData, allTags }) {
  const [searchKeyWork, setSearchKeyWord] = useState("");
  const [displayPostsData, setDisplayPostsData] = useState(allPostsData);
  const [selectedTag, setSelectedTag] = useRecoilState(selectedTagState);
  const onClickSearch = () => {
    const filterData = allPostsData.filter(
      (d) =>
        d.content.match(searchKeyWork) || String(d.tags).match(searchKeyWork)
    );
    setDisplayPostsData(filterData);
    setSelectedTag("");
  };
  const onClickReset = () => {
    setDisplayPostsData(allPostsData);
    setSelectedTag("");
  };
  const onClickTag = (tag) => {
    setDisplayPostsData(allPostsData);
    setSelectedTag(tag);
  };
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className={`${utilStyles.headingMd} ${utilStyles.paddingTop50px}`}>
        {displayPostsData.length === 0 ? (
          <div className={styles.notFound}>記事が見つかりません</div>
        ) : (
          <div className={styles.grid}>
            {displayPostsData.map(
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
        )}
        <hr className={utilStyles.marginTop50px} />
        <h2>Category</h2>
        <div className={`${utilStyles.center}`}>
          {allTags.map((t) => (
            <button
              key={t}
              className={utilStyles.tagsButton}
              onClick={() => onClickTag(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className={`${utilStyles.center} ${styles.searchInput}`}>
          <input
            type="text"
            onInput={(e) => setSearchKeyWord(e.currentTarget.value)}
            placeholder={"記事を検索"}
          />
          <button className={styles.searchButton} onClick={onClickSearch}>
            検索
          </button>
          <button className={styles.resetButton} onClick={onClickReset}>
            リセット
          </button>
        </div>
        {/* TODO: アーカイブ */}
      </div>
    </Layout>
  );
}
