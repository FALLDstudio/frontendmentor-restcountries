module.exports = {
    entry : {
        main : './src/index.js',
        //vendor : './src/js/vendor.js'
    },
    module: {
        rules : [
            {
                test : /\.html$/,
                use : [{
                    loader : 'html-loader',
                    options : {
                        minimize : false
                    }
                }]
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