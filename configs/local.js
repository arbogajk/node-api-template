module.exports = {
    // enabled logging for development
    logging: true,
    useHttps:  process.env.USE_HTTPS === "true" ? true: false, 
    host: process.env.HOST_NAME,
    tmpMediaDir: './uploads/tmp',
    logPath: process.env.LOG_PATH,
    db: {
      host: process.env.DB_CONNECTION,
      options: {
        // useNewUrlParser: true 
      }
    }
  };
  