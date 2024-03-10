import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

interface Post {
  id: string;
  title: string;
  createdAt: Date;
}
interface LoaderData {
  posts: Post[];
}

export const loader = async () => {
  const data: LoaderData = {
    posts: await db.post.findMany({
      take: 20,
      select: { id: true, title: true, createdAt: true },
      orderBy: {createdAt: 'desc' }
    }),
  }
  return data;
};

const PostItems = () => {
  const { posts } = useLoaderData<LoaderData>();
  return (
    <>
      <div className="page-header">
        <h1>Post Items</h1>
        <Link to="/posts/news" className="btn">
          New Post
        </Link>
      </div>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={post.id.toString()}>
              <h3>{post.title}</h3>
              {new Date(post.createdAt).toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostItems;
