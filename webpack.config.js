const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./js/main.js",
  // webpack 동작시 어디에서부터 내용을 읽어야하는지 진입점
  output: {
    // entry로 읽어낸 결과(번들)를 반환, entry로 받은 파일을 path의 경로로 정한 폴더에 filename이름을 가진채로 만들어줌

    // path: path.resolve(__dirname, "dist"),
    // // 결과물이 반환될 디렉토리를 절대경로로 명시.
    // filename: "main.js",
    clean: true,
    // 전에 있던 파일을 지우고 새로운 파일만 남게 함
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        // .css로 끝나는 파일을 찾는 정규표현식
        //  s?가 추가되면 scss나 css둘 다 찾는것
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
        // js파일에선 css를 해석할 수 없기 때문에 import 된 css파일은 css-loader로 해석하도록 함. 그 후 style-loader가 html파일에 해석된 css를 스타일로 적용. 순서가 중요한데 아래에서 위로 읽음
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    // entry를 읽어들여서 output에 있는 옵션으로 만들는 과정에서 plugins에 있는 여러 플러그인들이 쓰인다.
    new HtmlPlugin({
      // 템플릿을 현재 경로의 index.html로 지정
      template: "./index.html",
    }),
    new CopyPlugin({
      // static폴더에 있는 파일들이 빌드시 dist에 들어갈 수 있게 만들어 줌
      patterns: [{ from: "static" }],
    }),
  ],

  devServer: {
    host: "localhost",
  },
};
