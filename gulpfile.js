var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var Q = require('q');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');


var config = {
    allSCSSFiles: 'develop/scss/**/*.scss',
    allJSFiles: 'develop/js/**/*.js',
    FileJSX: './src/main.jsx',
    jsxFile: 'src/main.jsx',
    production: !!plugins.util.env.production,
    sourceMaps: !plugins.util.env.production
};

var app = {};

//Generate CSS files
app.addStyle = function (paths, filename) {
    return gulp.src(paths)
        .pipe(plugins.plumber())
        .pipe(plugins.if(config.sourceMaps, plugins.sourcemaps.init()))
        .pipe(plugins.sass())
        .pipe(plugins.concat('public/css/' + filename))
        //util noop does nothing absolutely nothing
        .pipe(config.production ? plugins.cleanCss({
            compatibility: 'ie8',
            keepSpecialComments: 0,
            rebase: false
        }) : plugins.util.noop())
        .pipe(plugins.if(config.sourceMaps, plugins.sourcemaps.write('.')))
        .pipe(gulp.dest('.'))
};


//Generate JS files
app.addScript = function (paths, filename) {

    return gulp.src(paths)
        .pipe(plugins.plumber())
        .pipe(plugins.if(config.sourceMaps, plugins.sourcemaps.init()))
        .pipe(plugins.concat('public/js/' + filename))
        .pipe(config.production ? plugins.uglify() : plugins.util.noop())
        .pipe(plugins.if(config.sourceMaps, plugins.sourcemaps.write('.')))
        .pipe(gulp.dest('.'));
};

//Copy files from bundles to web
app.copy = function (srcFiles, outputDir) {
    return gulp.src(srcFiles)
        .pipe(gulp.dest(outputDir));
};


//Call CSS files
gulp.task('styles', function () {
    var pipeline = new Pipeline();

    pipeline.add([
        config.allSCSSFiles
    ], 'style.css');

    return pipeline.run(app.addStyle);
});


//Call JSX files
gulp.task('browserify', ['styles'], function () {
    return browserify({entries: config.FileJSX, extensions: ['.jsx'], debug: true})
        .transform(babelify, {
            presets: ['es2015', 'react']
        })
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('public/js'));
});


//Call JS files
gulp.task('scripts', ['browserify'], function () {
    var pipeline = new Pipeline();

    pipeline.add([
        config.allJSFiles
    ], 'script.js');

    return pipeline.run(app.addScript);

});


//Call Fonts files
gulp.task('fonts', ['scripts'], function () {
    var pipeline = new Pipeline();
    //pipeline.add(
    //
    //    'fonts'
    //);
    return pipeline.run(app.copy);
});


//Set watchers for all needed directories and files
gulp.task('watch', ['fonts'], function () {
    gulp.watch(config.allSCSSFiles, ['styles']);
    gulp.watch(config.allJSFiles, ['scripts']);
    gulp.watch(config.FileJSX, ['browserify']);
});


//Default task. Other tasks are attached to it
if (config.production) {
    gulp.task('default', ['styles', 'browserify', 'scripts', 'fonts']);
} else {
    gulp.task('default', ['styles', 'browserify', 'scripts', 'fonts', 'watch']);
}

var Pipeline = function () {
    this.entries = [];
};
Pipeline.prototype.add = function () {
    this.entries.push(arguments);
};

Pipeline.prototype.run = function (callable) {
    var deferred = Q.defer();
    var i = 0;
    var entries = this.entries;

    var runNextEntry = function () {
        // see if we're all done looping
        if (typeof entries[i] === 'undefined') {
            deferred.resolve();
            return;
        }
        callable.apply(app, entries[i]).on('end', function () {
            i++;
            runNextEntry();
        });
    };
    runNextEntry();

    return deferred.promise;
};