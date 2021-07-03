require("dotenv").config();

module.exports = {
  reactStrictMode: true,
  env: {
    SECRET: process.env.SECRET,
    uri: process.env.URI,
  },
};
