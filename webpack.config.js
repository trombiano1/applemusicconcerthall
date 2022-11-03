const path = require('path')

var I18nPlugin = require("@zainulbr/i18n-webpack-plugin");
var languages = {
	"en": null,
	"de": require("./de.json")
};

module.exports = [
// module.exports = Oject.keys(languages).map(function(language) {
    {
		name: "en",
        entry: '/src/js/index.js',
		// devServer: {
        //     static: path.resolve(__dirname, 'dist'),
        //     port: process.env.PORT || 8080,
        //     hot: true,
        //     allowedHosts: "all"
        // },
		output: {
            filename: "main.js",
			path: path.join(__dirname, "dist")
		},
		plugins: [
			new I18nPlugin(
				languages["en"]
			)
		],
		resolve: {
            fallback: {
                "fs": false
            }
        },
        module: {
            rules: [
            {
                test: /\.(scss)$/,
                use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader',
                    options: {
                    postcssOptions: {
                        plugins: () => [
                        require('autoprefixer')
                        ]
                    }
                    }
                },
                {
                    loader: 'sass-loader'
                }
                ]
            }
        ]},
        plugins: [
			new I18nPlugin(
				languages["en"]
			)
		]
	},
    {
		name: "de",
        entry: '/src/js/index.js',
		// mode: "development || "production",
		// entry: "./example",
		output: {
            filename: "de.main.js",
			path: path.join(__dirname, "dist")
		},
		plugins: [
			new I18nPlugin(
				languages["de"]
			)
		],
		resolve: {
            fallback: {
                "fs": false
            }
        },
        module: {
            rules: [
            {
                test: /\.(scss)$/,
                use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader',
                    options: {
                    postcssOptions: {
                        plugins: () => [
                        require('autoprefixer')
                        ]
                    }
                    }
                },
                {
                    loader: 'sass-loader'
                }
                ]
            }
        ]},
        plugins: [
			new I18nPlugin(
				languages["de"]
			)
		]
	}
];

// module.exports = {
//   devServer: {
//     static: path.resolve(__dirname, 'dist'),
//     port: process.env.PORT || 8080,
//     hot: true,
//     allowedHosts: "all"
//   }
//   
// }