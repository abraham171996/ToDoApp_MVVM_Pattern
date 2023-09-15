const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
  entry: './src/js/index.js',

  output: {

    path: path.resolve(__dirname, 'dist'),
 
    filename: 'bundle.js',
  },
  
  module: {
    rules: [
      {

        test: /\.js$/,
      
        exclude: /node_modules/,
        
        use: 'babel-loader',
      },
      {
        
        test: /\.css$/i,
     
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', // Load CSS
          'sass-loader', // Convert Sass to CSS
        ],
      },
      {
        // Test for image files
        test: /\.(png|jpe?g|gif|svg)$/i,
			  // For image types, we'll use asset/resource.
        type: "asset/resource",
      },
    ],
  },
  // Plugins used in the build process
  plugins: [
    // Generate an HTML file with the bundled JavaScript
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // Extract CSS into a separate file
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
		new CleanWebpackPlugin(),
  ],
  // Development server configuration
  devServer: {
    // Serve content from the 'dist' directory
    static: path.join(__dirname, 'dist'),
    // Specify the port for the development server
    port: 8080,
  },
};