var bs = require("browser-sync").create();

// .init starts the server
bs.init({
    server: "./build",
    watchOptions: {
        ignoreInitial: false,
        ignored: '*.txt'
    },
    files: ['./build'],
});

// Now call methods on bs instead of the
// main browserSync module export
bs.reload("*.html");
bs.reload("*.css");
bs.reload("*.js");
bs.reload("*.md");