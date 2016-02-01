module.exports = {
  extensions: {
    javascript: '.js'
  },

  folders: {
    dist: './dist',
    src: './src'
  },

  globs: {
    any: '/**/*'
  },

  server: {
    development: {
      port: 9000, // Set the server port. Defaults to 8080. 
      root: "./src" // Set root directory that's being server. Defaults to cwd.
    },
    production: {
      port: 9090, // Set the server port. Defaults to 8080. 
      root: "./dist", // Set root directory that's being server. Defaults to cwd.  
      wait: 3000 // Waits for all changes, before reloading. Defaults to 0 sec. 
    },
  }
};