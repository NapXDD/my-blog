import { Post } from "@/component/blog/interace";
import BlogList from "@/component/blog/list/list";
import { getAllPosts } from "@/utils/mdx";
import NodeCache from "node-cache";

const CACHE_DURATION = 60 * 60; // 1 hour
const cache = new NodeCache({ stdTTL: CACHE_DURATION });

// export default function BlogPage({ posts }: { posts: Post[] }) {
//   return <BlogList posts={posts || []} />;
// }

export async function getData() {
  let posts = cache.get<Post[]>("posts");
  if (!posts) {
    posts = getAllPosts();
    cache.set("posts", posts);
  }
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc

  return posts;
}

export default async function BlogPage() {
  const data = await getData();
  return <BlogList posts={data || []} />;
}
