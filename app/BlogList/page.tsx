import { Post } from "../../component/blog/interace";
import { getAllPosts } from "@/utils/mdx";
import { GetStaticProps } from "next";
import NodeCache from "node-cache";
import BlogList from "../../component/blog/list";

const CACHE_DURATION = 60 * 60; // 1 hour
const cache = new NodeCache({ stdTTL: CACHE_DURATION });

// export default function BlogPage({ posts }: { posts: Post[] }) {
//   return <BlogList posts={posts || []} />;
// }

// export const getStaticProps: GetStaticProps = async () => {
//   let posts = cache.get<Post[]>("posts");
//   if (!posts) {
//     posts = getAllPosts();
//     cache.set("posts", posts);
//   }
//   return {
//     revalidate: CACHE_DURATION,
//     props: { posts },
//   };
// };

export default function BlogPage() {
  let posts = cache.get<Post[]>("posts");
  if (!posts) {
    posts = getAllPosts();
    cache.set("posts", posts);
  }
  return <BlogList posts={posts || []} />;
}
