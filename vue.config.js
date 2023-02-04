const { defineConfig } = require("@vue/cli-service");
const fs = require("fs");

module.exports = defineConfig({
  devServer: {
    host: "0.0.0.0",
    port: 8081,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    https: {
      key: fs.readFileSync("./certs/localhost-key.pem"),
      cert: fs.readFileSync("./certs/localhost.pem"),
    },
  },
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "~@/assets/styles/variables.scss"; `,
      },
    },
  },
  publicPath: process.env.NODE_ENV === "production" ? "/foodapp/" : "/",
});
