const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const vueLoaderPlugin = require('vue-loader/lib/plugin');
const config = require('../config');
const HappyPack = require('happypack');
const os = require('os');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const devMode = process.argv.indexOf('--mode=production') === -1;
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

function assetsPath (_path) {
  const assetsSubDirectory = devMode ? config.dev.assetsSubDirectory : config.build.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path)
}

module.exports = {
  entry: ['@babel/polyfill', path.resolve(__dirname, '../src/main.js')],
  output: {
    path: config.build.assetsRoot,
    filename: assetsPath('js/[name].[hash:8].js'),
    chunkFilename: assetsPath('js/[name].[hash:8].js'),
    publicPath: devMode ? config.dev.assetsPublicPath : config.build.assetsPublicPath
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
      '@': path.resolve(__dirname, '../src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components')
    },
    extensions: ['*', '.js', '.json', '.vue', '.ts', '.tsx']
  },
  plugins: [
    new vueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
      inject: true,
      favicon: path.resolve(__dirname, '../public/favicon.ico')
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].css'
    }),
    new HappyPack({
      id: 'happyBabel',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env']],
            cacheDirectory: true
          }
        }
      ],
      threadPool: happyThreadPool
    })
  ],
  module: {
    noParse: /jquery/,
    rules: [
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              preserveWhitespace: false
            },
            include: [path.resolve(__dirname, 'src')],
            exclude: /node_modules/
          }
        }]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.css$/,
        use: [{
          loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          options: {
            publicPath: "../dist/css/",
            hmr: devMode
          }
        }, 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: [require('autoprefixer')]
          }
        }]
      },
      {
        test: /\.less$/,
        use: [{
          loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          options: {
            publicPath: "../dist/css/",
            hmr: devMode
          }
        }, 'css-loader', {
          loader: 'postcss-loader',
          options: { plugins: [require('autoprefixer')] }
        }, 'less-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ],
        include: [path.resolve(__dirname, 'src/assets/images')],
        exclude: /node_modules/
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: { name: 'media/[name].[hash:8].[ext]' }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10240, loader: 'file-loader', options: { name: 'fonts/[name].[hash:8].[ext]' } }
          }
        ]
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'happypack/loader?id=happyBabel'
        }],
        exclude: /node_modules/
      }
    ]
  }
}