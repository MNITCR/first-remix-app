import { Link, redirect, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { Params } from "@remix-run/react";

interface Post {
  id: string;
  title: string;
  body: string;
}

export const loader = async ({ params }: { params: Params }) => {
  const post = await db.post.findUnique({
    where: { id: params.postId },
  });

  if (!post) throw new Error("Post not found");

  const data = { post };
  return data;
};

// delete
export const action = async ({
  request,
  params,
}: {
  request: Request;
  params: Params;
}) => {
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    const post = await db.post.findUnique({
      where: { id: params.postId },
    });

    if (!post) throw new Error("Post not found");

    await db.post.delete({ where: { id: params.postId } });
    return redirect("/posts");
  }
};

const PostId = () => {
  const { post } = useLoaderData() as { post: Post };
  return (
    <div>
      <div className="page-header">
        <h1>{post.title}</h1>
        <Link to="/posts" className="btn btn-reverse">
          Back
        </Link>
      </div>
      <div className="page-content">{post.body}</div>
      <div className="page-footer">
        <form method="post">
          <input type="hidden" name="_method" value="delete" />
          <button className="btn btn-delete">Delete</button>
        </form>
      </div>
    </div>
  );
};

export default PostId;
