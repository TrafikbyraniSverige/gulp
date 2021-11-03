// loading the programs
var gulp        = require('gulp'); // the OG program
var browserSync = require('browser-sync').create(); // reloads 
var site 		= 'http://192.168.111.151/site/'; // site adress for browsersync (localhost adress works to!)
var sass        = require('gulp-sass'); // sass compile
var rename      = require( 'gulp-rename' ); // renaming files
var concat      = require( 'gulp-concat' ); // slams files togheter if there are multiple diffrent files being watched, eg a base style, fontawesome font css and a normalizer

/*
 -- Outputsyle options
outputStyle: 
		'nested'
		'expanded'
		'compact'
		'compressed'
*/

// sass compiler
gulp.task('sass',function(){
	return gulp
		.src('sass/style.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		// .pipe(concat('style.css')) 
		.pipe(rename({ suffix: '.min' })) // rename the file to .min
		.pipe(gulp.dest('css/'))
		.pipe(browserSync.stream());
});

//watch for changes
gulp.task('watch',function(){
	// start server
	browserSync.init({
		open: false,
		injectChanges: true,
		proxy: site
	});

	// run sass task
	gulp.watch('sass/**/*.scss',
		gulp.series('sass')
	);

	// update on php changes
	gulp.watch("**/*.php").on('change', browserSync.reload);
});

// makes so that the "gulp" command runs what we want, the watcher   
gulp.task('default', gulp.series('watch'));
