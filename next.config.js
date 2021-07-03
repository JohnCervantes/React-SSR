require("dotenv").config();

module.exports = {
  reactStrictMode: true,
  env: {
    SECRET: process.env.SECRET,
    URI: process.env.URI,
    DB_URI: process.env.DB_URI
  },
};
