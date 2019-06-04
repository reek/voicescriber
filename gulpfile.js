// importer les modules NPM
var gulp = require('gulp');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require("browserify");
var browserSync = require('browser-sync').create();
var transform = require('vinyl-transform');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer')
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var createIndex = require('create-index');
var del = require('del');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var flatten = require('gulp-flatten');
var shell = require('gulp-shell')
var ftp = require('vinyl-ftp');
var ghPages = require('gulp-gh-pages');

// Import environement variables
require('dotenv').config();

// Config project folders
var config = {
  src: './src', // dev 
  dist: './dist' // prod
}

/* js */

// Task to build JS files
gulp.task("js", function () {
  return browserify("src/main.js", {
    debug: true
  })
    .transform(babelify.configure({
      presets: ['@babel/preset-env']
    }))
    .bundle()
    // display better error message on error
    .on('error', function (err) {
      gutil.log("Browserify Error", err.message);
      gutil.log(gutil.colors.red('^^^^^ [Gulp] Error compilation ^^^^^'))
    })
    .pipe(source("bundle.js"))
    .pipe(gulp.dest(config.dist + '/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Task to build JS files 
gulp.task("js-prod", function () {
  return browserify("src/main.js", {
    debug: false
  })
    .transform(babelify.configure({
      presets: ['@babel/preset-env']
    }))
    .bundle()
    // display better error message on error
    .on('error', function (err) {
      gutil.log(gutil.colors.red('^^^^^ [Gulp] Error compilation ^^^^^'))
    })
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(config.dist + '/js'))
});

gulp.task("js-dep", function () {
  return gulp.src([
    'node_modules/materialize-css/dist/js/materialize.min.js'
  ])
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest(config.dist + '/js'))
});

/* './src/app/components'
    './src/app/features',
    './src/app/providers',
    './src/app/utils'  */
gulp.task('js-index', function () {
  createIndex.writeIndex(['./src/app']);
});


/* css */

gulp.task("css", function () {
  return gulp.src([
    './src/theme/*.css'
  ])
    .pipe(autoprefixer())
    .pipe(concat("style.css"))
    .pipe(gulp.dest(config.dist + '/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task("css-prod", function () {
  return gulp.src([
    './src/theme/*.css'
  ])
    .pipe(autoprefixer())
    .pipe(concat("style.css"))
    .pipe(csso())
    .pipe(gulp.dest(config.dist + '/css'))
});

gulp.task("css-dep", function () {
  return gulp.src([
    'node_modules/materialize-css/dist/css/materialize.min.css'
  ])
    .pipe(concat("vendors.css"))
    .pipe(gulp.dest(config.dist + '/css'))
});



/* html */

gulp.task("html", function () {
  return gulp.src(['./src/*.html'])
    .pipe(gulp.dest(config.dist))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task("html-prod", function () {
  return gulp.src(['./src/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(config.dist))
});

/* assets */

gulp.task("fonts", function () {
  return gulp.src(['./src/assets/fonts/**/*.{ttf,woff,woff2,eof,eof,svg,css}'])
    .pipe(flatten())
    .pipe(gulp.dest(config.dist + '/fonts'))

  /*     return gulp.src([config.dist + '/fonts/*.css'])
        .pipe(concat("fonts.css"))
        .pipe(csso())
        .pipe(gulp.dest(config.dist + '/fonts')) */
});

/* gulp.task("fonts", function () {
  return gulp.src([
      'dist/fonts/*.css'
    ])
    .pipe(concat("fonts.css"))
    .pipe(gulp.dest(config.dist + '/fonts'))
}); */


gulp.task("images", function () {
  return gulp.src(['./src/assets/images/**/*.+(png|jpg|jpeg|gif|svg)'])
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(config.dist + '/images'))
});

gulp.task("icons", function () {
  return gulp.src(['./src/assets/icons/**/*.+(ico|png|gif|svg)'])
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(config.dist + '/icons'))
});

gulp.task("medias", function () {
  return gulp.src(['./src/assets/medias/**/*'])
    .pipe(gulp.dest(config.dist + '/medias'))
});

gulp.task('assets', gulp.parallel(
  'fonts',
  'images',
  'icons',
  'medias'
));

// Task to run local server
gulp.task("server", function (cb) {
  browserSync.init({
    server: {
      baseDir: config.dist
    },
    notify: true
  }, cb);
});

// Task to clean dist
gulp.task('clean', function () {
  return del([config.dist]);
});

// speed dev build using parallel()
gulp.task('dev', gulp.parallel(
  'js',
  'js-dep',
  'css',
  'css-dep',
  'html',
  'assets'
));

// use series() for build prod
gulp.task('prod', gulp.series(
  'clean',
  'js-prod',
  'js-dep',
  'css-prod',
  'css-dep',
  'html-prod',
  'assets',
  'server'
));

gulp.task('watch', function () {
  gulp.watch('./src/app/**/*.js', {
    events: 'all'
  }, gulp.series('js'));
  gulp.watch('./src/**/*.html', {
    events: 'all'
  }, gulp.series('html'));
  gulp.watch('./src/**/*.css', {
    events: 'all'
  }, gulp.series('css'));
});

gulp.task('default',
  gulp.series(
    'clean',
    'dev',
    'server',
    'watch')
);

gulp.task('deploy:firebase', shell.task([
  'firebase deploy'
]))


gulp.task('deploy:nomades', function () {
  var host = process.env.FTP_NOMADES_HOST;
  var user = process.env.FTP_NOMADES_USER;
  var pwd = process.env.FTP_NOMADES_PWD;
  var conn = ftp.create({
    host: host,
    user: user,
    password: pwd,
    parallel: 10,
    log: gutil.log
  });
  var globs = [
    './dist/**/*'
  ];
  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance
  return gulp.src(globs, {
    base: './dist',
    buffer: false
  })
    .pipe(conn.newer('/public_html/voicescriber')) // only upload newer files
    .pipe(conn.dest('/public_html/voicescriber'));
});

gulp.task('deploy:cadze', function () {
  var host = process.env.FTP_CADZE_HOST;
  var user = process.env.FTP_CADZE_USER;
  var pwd = process.env.FTP_CADZE_PWD;
  var conn = ftp.create({
    host: host,
    user: user,
    password: pwd,
    parallel: 4,
    log: gutil.log
  });
  var globs = [
    './dist/**/*'
  ];
  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance
  return gulp.src(globs, {
    base: './dist',
    buffer: false
  })
    .pipe(conn.newer('/public_html/portfolio/files/voicescriber')) // only upload newer files
    .pipe(conn.dest('/public_html/portfolio/files/voicescriber'));
});


gulp.task('deploy:ghpages', function () {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});


gulp.task('deploy',
  gulp.series(
    'deploy:firebase',
    'deploy:nomades',
    'deploy:cadze')
);


/*     .pipe(rename({
      suffix: '.min'
    }))
*/