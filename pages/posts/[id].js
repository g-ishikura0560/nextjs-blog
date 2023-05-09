import Head from "next/head";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

import Layout from "../../components/layout";
import { selectedTagState } from "../../grobalStates/selectedTagAtom";
import { getAllPostsIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css";

export const getStaticPaths = async () => {
  const paths = getAllPostsIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};

const Post = ({ postData }) => {
  const router = useRouter();
  const setText = useSetRecoilState(selectedTagState);
  const onClickTag = (t) => {
    setText(t);
    router.push("/");
  };
  return (
    <Layout>
      <div
        className={`${utilStyles.blogArea} ${utilStyles.blogMessageMinHeihgt}`}
      >
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingX1}>{postData.title}</h1>
          <div className={utilStyles.lightText}>{postData.date}</div>
          {postData.tags.map((t) => (
            <button
              key={t}
              className={utilStyles.tagsButton}
              onClick={() => onClickTag(t)}
            >
              {t}
            </button>
          ))}
          <div
            dangerouslySetInnerHTML={{ __html: postData.blobContentHTML }}
          ></div>
        </article>
      </div>
    </Layout>
  );
};

export default Post;
