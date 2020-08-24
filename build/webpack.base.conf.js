const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
    src: path.join(__dirname, "../src"),
    dist: path.join(__dirname, "../dist"),
    assets: "assets/",
    js: 'js/',
    style: "style/",
};

const PAGES_DIR = `${PATHS.src}/views/pages/`;
const PAGES = fs
    .readdirSync(PAGES_DIR)
    .filter((fileName) => fileName.endsWith(".pug"));

module.exports = {
    externals: {
        paths: PATHS,
    },
    entry: {
        app: PATHS.src,
    },
    output: {
        filename: `js/[name].[hash].js`,
        path: PATHS.dist,
        publicPath: "/",
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendors",
                    test: /node_modules/,
                    chunks: "all",
                    enforce: true,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                oneOf: [
                    {
                        use: ["pug-loader"],
                    },
                ],
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules/",
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loader: {
                        scss: "vue-style-loader!css-loader!sass-loader",
                    },
                },
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                },
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                },
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {sourceMap: true},
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: {path: `./postcss.config.js`},
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {sourceMap: true},
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {sourceMap: true},
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: {path: `./postcss.config.js`},
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        alias: {
            "~": PATHS.src,
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.style}css/[name].[hash].css`,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${PATHS.src}/${PATHS.assets}img`,
                    to: `${PATHS.assets}img`,
                },
                {
                    from: `${PATHS.src}/${PATHS.assets}svg`,
                    to: `${PATHS.assets}svg`,
                },
                {
                    from: `${PATHS.src}/${PATHS.assets}fonts`,
                    to: `${PATHS.assets}fonts`,
                },
                {
                    from: `${PATHS.src}/${PATHS.js}plugins`,
                    to: `js/plugins`,
                },
            ],
        }),
        ...PAGES.map(
            (page) =>
                new HtmlWebpackPlugin({
                    template: `${PAGES_DIR}/${page}`,
                    filename: `./${page.replace(/\.pug/, ".html")}`,
                }),
        ),
    ],
};
