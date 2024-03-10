/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/*.css"],
  routes(defineRoutes) {
    return defineRoutes((route) => {
      route("/posts/news", "routes/posts/news.tsx");
      // route("trending", "concerts/trending.tsx");
      route("/posts/:postId", "routes/posts/postId.tsx");
    });
  },
};
