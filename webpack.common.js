module.exports = {
    entry : {
        main : './src/index.js',
        //vendor : './src/js/vendor.js'
    },
    module: {
        rules : [
            {
                test : /\.html$/,
                loader : 'html-loader'
            },
            {
                test : /\.(svg|png|jpe?g|webp|gif)$/,
                use : [
                    {
                        loader : 'file-loader',
                        options : {
                            name : '[name]-[hash].[ext]',
                            outputPath : 'img',
                            esModule : false
                        }
                    }
                ],
                type : 'javascript/auto'
            }
        ]
    }
}