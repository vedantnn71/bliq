const withTM = require("next-transpile-modules")(["ui", "lib"]);

module.exports = withTM({
  images: {
    domains: ["lh3.googleusercontent.com"]
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/api/auth/session",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
});
