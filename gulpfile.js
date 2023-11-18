const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const pug = require("gulp-pug");
const replace = require("gulp-replace");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const svgSprite = require("gulp-svg-sprite");
const browserSync = require("browser-sync").create();
const del = require("del");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const realFavicon = require("gulp-real-favicon");
const faviconData = "faviconData.json";
const imagemin = require("gulp-imagemin");
const imageminJpg = require("imagemin-jpeg-recompress");
const imageminPng = require("imagemin-pngquant");
const changed = require("gulp-changed");
// const cached = require("gulp-cached");
// const remember = require("gulp-remember");

let jsLibs = [
  "node_modules/swiper/swiper-bundle.min.js",
  // "node_modules/inputmask/dist/inputmask.min.js",
  // "node_modules/@fancyapps/ui/dist/fancybox.umd.js",
  // 'node_modules/@popperjs/core/dist/umd/popper.min.js',
  // 'node_modules/tippy.js/dist/tippy.umd.min.js',
  // "node_modules/flatpickr/dist/flatpickr.min.js",
];
let cssLibs = [
  "node_modules/swiper/swiper-bundle.min.css",
  // "node_modules/@fancyapps/ui/dist/fancybox.css",
  // 'node_modules/tippy.js/dist/tippy.css',
  // "node_modules/flatpickr/dist/flatpickr.min.css",
];
let commonJsLibs = [
  "app/js/custom-libs/adaptive-height.js",
  "app/js/custom-libs/fade-toggle.js",
  "app/js/custom-libs/slide-toggle.js",
  "app/js/custom-libs/scrolling-toggle.js",
  "app/js/custom-libs/form-validate-class.js",
  "app/js/custom-libs/thanks.js",
  "app/js/custom-libs/modal.js",
  // "app/js/custom-libs/tooltip.js",
  // "app/js/custom-libs/scroll-top.js",
  // 'app/js/custom-libs/counter.js',
  // 'app/js/custom-libs/float-label.js',
  // 'app/js/custom-libs/anchor-scroll.js',
  // 'app/js/custom-libs/password-toggle.js',
  // 'app/js/custom-libs/select.js',
  // 'app/js/custom-libs/accordion.js',
  // 'app/js/custom-libs/tabs.js',
  // 'app/js/custom-libs/input-file-class.js',
  // 'app/js/custom-libs/input-mask-list.js',
  // 'app/js/custom-libs/input-mask.js',
  // 'app/js/custom-libs/simple-map.js',
  // 'app/js/custom-libs/cookie-class.js',
  // 'app/js/custom-libs/sticky-element-class.js',
  // 'app/js/custom-libs/table-of-contents.js',
];
function clean() {
  return del("dist");
}
function style() {
  return (
    gulp
      .src(cssLibs)
      .pipe(sourcemaps.init())
      .pipe(concat("libs.css"))
      .pipe(gulp.dest("dist/css")),
    gulp
      .src("app/sass/style.scss")
      .pipe(sourcemaps.init())
      .pipe(
        sass({ includePaths: ["app/blocks", "app/pages"] }).on(
          "error",
          sass.logError
        )
      )
      .pipe(
        autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
          cascade: true,
        })
      )
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("dist/css"))
      .on("end", browserSync.reload)
  );
}
function html() {
  return (
    gulp
      // .src('app/pages/**/*.pug', { since: gulp.lastRun(html) })
      // .pipe(cached("html"))
      .src("app/pages/**/*.pug")
      .pipe(
        pug({
          doctype: "html",
          pretty: true,
          basedir: "app",
          locals: {
            addClass: function (name, mods, addClass) {
              mods = mods || [];
              addClass = addClass || "";
              let value = "";

              mods.forEach(function (element) {
                value += " " + name + "_" + element;
              });

              return (value + " " + addClass).trim();
            },
          },
        })
      )
      .pipe(
        rename({
          dirname: "",
        })
      )
      // .pipe(remember("html"))
      .pipe(gulp.dest("dist/"))
      .on("end", browserSync.reload)
  );
  // .pipe(browserSync.stream())
}
function fontsTransfer() {
  return gulp.src("app/fonts/**/*.*").pipe(gulp.dest("dist/fonts"));
}
function tempJS() {
  return gulp
    .src(["app/js/backend-temp.js", "app/js/dev-temp.js"])
    .pipe(gulp.dest("dist/js"))
    .on("end", browserSync.reload);
}
function bundleJS() {
  return (
    gulp
      .src(jsLibs)
      .pipe(concat("libs.js"))
      .pipe(gulp.dest("dist/js"))
      .on("end", browserSync.reload),
    gulp
      .src(["app/blocks/**/*.js", "app/pages/**/*.js", "app/js/main.js"])
      .pipe(concat("scripts.js"))
      .pipe(gulp.dest("dist/js"))
      .on("end", browserSync.reload),
    gulp
      .src(commonJsLibs)
      .pipe(concat("common.js"))
      .pipe(gulp.dest("dist/js"))
      .on("end", browserSync.reload)
  );
}
function faviconSvg() {
  return gulp
    .src("app/favicon.svg")
    .pipe(gulp.dest("dist/"))
    .on("end", browserSync.reload);
}
function images() {
  return gulp
    .src("app/img/**/*.*")
    .pipe(changed("dist/img"))
    .pipe(
      imagemin(
        [
          imageminPng(),
          imageminJpg({
            progressive: true,
            max: 85,
            min: 80,
          }),
        ],
        { verbose: true }
      )
    )
    .pipe(gulp.dest("dist/img"));
}
function icons() {
  return gulp
    .src("app/icons/single/*.svg")
    .pipe(replace("&gt;", ">"))
    .pipe(rename({ prefix: "icon-" }))
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            dest: "",
            sprite: "icons.svg",
          },
        },
        svg: {
          namespaceClassnames: false,
          xmlDeclaration: false,
          doctypeDeclaration: false,
          namespaceIDs: false,
          dimensionAttributes: false,
        },
      })
    )
    .pipe(gulp.dest("app/icons/"));
}
function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
  gulp.watch("app/**/*.scss", style);
  gulp.watch("app/**/**/*.pug", html);
  gulp.watch("app/img/**/*.{png,jpg,jpeg,gif,webp,svg}", gulp.series(images));
  gulp.watch("app/icons/single/*.svg", gulp.series(icons));
  gulp.watch(["app/**/**/*.js", "app/**/*.js"], gulp.series(bundleJS, tempJS));
}

gulp.task("favicon", function (done) {
  realFavicon.generateFavicon(
    {
      masterPicture: "app/favicon.svg",
      dest: "dist/favicon",
      iconsPath: "./favicon",
      design: {
        ios: {
          pictureAspect: "noChange",
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: false,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true,
          },
        },
        desktopBrowser: {
          design: "raw",
        },
        windows: {
          pictureAspect: "noChange",
          backgroundColor: "#da532c",
          onConflict: "override",
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false,
            },
          },
        },
        androidChrome: {
          pictureAspect: "noChange",
          themeColor: "#ffffff",
          manifest: {
            display: "standalone",
            orientation: "notSet",
            onConflict: "override",
            declared: true,
          },
          assets: {
            legacyIcon: false,
            lowResolutionIcons: false,
          },
        },
        safariPinnedTab: {
          pictureAspect: "blackAndWhite",
          threshold: 10,
          themeColor: "#510094",
        },
      },
      settings: {
        scalingAlgorithm: "Mitchell",
        errorOnImageTooSmall: false,
        readmeFile: false,
        htmlCodeFile: false,
        usePathAsIs: false,
      },
      markupFile: faviconData,
    },
    function () {
      done();
    }
  );
});

gulp.task(
  "build",
  gulp.series(
    clean,
    icons,
    style,
    images,
    fontsTransfer,
    faviconSvg,
    bundleJS,
    tempJS,
    html,
    function (done) {
      done();
    }
  )
);

gulp.task("watch:dev", gulp.series("build", gulp.parallel(watch)));

exports.style = style;
exports.html = html;
exports.bundleJS = bundleJS;
exports.tempJS = tempJS;
exports.icons = icons;
exports.fontsTransfer = fontsTransfer;
exports.images = images;
exports.watch = watch;
exports.clean = clean;
