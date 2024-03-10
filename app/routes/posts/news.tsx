import { Link, redirect, useRouteError } from "@remix-run/react";
import { ReactNode } from "react";
import { db } from "~/utils/db.server";

export const action = async ({ request }: { request: Request }) => {
  const form = await request.formData();
  const title = form.get("title") as string | null;
  const body = form.get("body") as string | null;

  // Handle null values, and ensure the types match the expected structure
  const fields: { title: string; body: string } = {
    title: title || "", // Use an empty string or provide a default value
    body: body || "",   // Use an empty string or provide a default value
  };

  // todo - submit data to database
  const post = await db.post.create({ data: fields });
  return redirect(`/posts/${post.id}`);
};

const News = () => {
  return (
    <>
      <div className="page-header">
        <h1>News Post</h1>
        <Link to="/posts" className="btn btn-reverse">
          Back
        </Link>
      </div>

      <div className="page-content">
        <form method="POST" encType="multipart/form-data">
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>
          <div className="form-control">
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body" />
          </div>
          <button className="btn btn-block" type="submit">
            Add Post
          </button>
        </form>
      </div>
    </>
  );
};

export default News;
