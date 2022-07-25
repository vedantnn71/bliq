const withTM = require("next-transpile-modules")(["ui", "lib"]);

module.exports = withTM({
  images: {
    domains: ["lh3.googleusercontent.com"]
  },
  reactStrictMode: true,
});
