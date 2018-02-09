/* eslint-disable */
const path = require('path');

module: {
  devServer: { contentBase: path.join(__dirname, "dist"); compress: true; port: 9000 }
  rules: [
    {
      test: /\.(png|jp(e*)g|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8000, // Convert images < 8kb to base64 strings
          name: 'images/[hash]-[name].[ext]'
        }
      }]
    }
  ]
}
