module.exports = {
    logging: true,
    useHttps:  process.env.USE_HTTPS === "true" ? true: false, 
    host: process.env.HOST_NAME,
    tmpMediaDir: './uploads/tmp',
    logPath: process.env.LOG_PATH,
}