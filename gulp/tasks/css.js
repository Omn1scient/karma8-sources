export const css = () => {
  return app.gulp.src(app.path.src.css)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "IMAGES",
        message: "Error: <%= error.message %>"
      }))
    )
    .pipe(app.plugins.newer(app.path.build.css))
    .pipe(
      app.plugins.if(
        app.isBuild,
        app.gulp.dest(app.path.build.css)
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        app.gulp.src(app.path.src.css)
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        app.plugins.newer(app.path.build.css)
      )
    )

    .pipe(app.gulp.src(app.path.src.css))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
}