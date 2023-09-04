/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: { unoptimized: true },
};

// const kcEndpoint = "https://api-dev.dthreaddev.com/api/authorization/oauth";
// const kcEndpoint =
//   "http://localhost:8080/realms/devicethread/protocol/openid-connect/auth";

module.exports = nextConfig;
module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/playground",
        permanent: true,
      },
      // {
      //   source: "/oauth",
      //   basePath: false,
      //   destination: kcEndpoint,
      //   permanent: false,
      // },
    ];
  },
};
