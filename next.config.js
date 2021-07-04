require("dotenv").config();
const { withPlaiceholder } = require("@plaiceholder/next");

module.exports = withPlaiceholder({
  reactStrictMode: true,
  env: {
    SECRET: process.env.SECRET,
    URI: process.env.URI,
    DB_URI: process.env.DB_URI,
  },
  images: {
    domains: ["images.dog.ceo"],
  },
});
