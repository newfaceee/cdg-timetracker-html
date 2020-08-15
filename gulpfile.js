const gulp = require("gulp");
const sass = require("gulp-sass");
const posthtml = require("gulp-posthtml");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const autoprefixer = require("autoprefixer");
const del = require("del");
const include = require("posthtml-include");
const server = require("browser-sync").create();

// Очистка директории build
gulp.task("clean", () => {
  return del("build");
});

// Генерирование html файла
gulp.task("html", () => {
  return gulp
    .src("source/*.html")
    .pipe(posthtml([include()]))
    .pipe(gulp.dest("build"));
});

// Генерирование одного css файла
gulp.task("css", function () {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(rename("style.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

// Обновление сервера
gulp.task("refresh", (done) => {
  server.reload();
  done();
});

// Сервер для разработки
gulp.task("server", () => {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("copy"));
});

gulp.task("copy", () => {
  return gulp
    .src(["source/js/**"], {
      base: "source",
    })
    .pipe(gulp.dest("build"));
});

gulp.task("svg", () => {
  return gulp
    .src(["source/icons/**"], {
      base: "source",
    })
    .pipe(gulp.dest("build"));
});

gulp.task("img", () => {
  return gulp
    .src(["source/img/**"], {
      base: "source",
    })
    .pipe(gulp.dest("build"));
});

gulp.task("fonts", () => {
  return gulp
    .src(["source/fonts/**"], {
      base: "source",
    })
    .pipe(gulp.dest("build"));
});

gulp.task(
  "build",
  gulp.series("clean", "copy", "html", "css", "svg", "img", "fonts")
);
gulp.task("start", gulp.series("build", "server"));
