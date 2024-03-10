import { Outlet } from '@remix-run/react'
import React from 'react'
const Posts = () => {
  return (
    <div>
      <h1>POSTS</h1>
      <Outlet />
    </div>
  )
}

export default Posts;
