
import webp from "gulp-webp";
import imagemin from "gulp-imagemin";
import rename from "gulp-rename";
import imageResize from "gulp-image-resize";

let images = () => {
    return app.gulp.src(app.path.src.images)
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "IMG",
            message: "Error: <%= error.message %>"
        })
    ))
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(webp())
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.images))
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(imagemin({
        progressive: true,
        svgPlugins: [{ removeVievBox: false }],
        interlaced: true,
        optimizationLevel: 3
    }))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.images))
    .pipe(imageResize({
        width : 100,
        height : 100,
        crop : true,
        upscale : false,
        imageMagick: true
      }))
    .pipe(rename(function(opt) {
        opt.basename = `${opt.basename}-low`
        return opt;
      }))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.browsersync.stream())
}

export { images }