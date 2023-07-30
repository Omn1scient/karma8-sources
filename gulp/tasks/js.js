import webpack from "webpack-stream";

export const js = () => {
	return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "JS",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(webpack({
			mode: app.isBuild ? 'production' : 'none', // 'production' : 'development',
			output: {
				filename: 'app.js', // 'app.min.js'
			}
		}))

		.pipe(app.gulp.dest(app.path.build.js))

		.pipe(app.gulp.src(app.path.src.allJs)) // Берем все файлы *.js кроме app.js из папки src
		.pipe(app.gulp.dest(app.path.build.js)) // Кладём файлы *.js в папку dest

		.pipe(app.plugins.browsersync.stream());
}