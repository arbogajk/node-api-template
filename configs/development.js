module.exports = {
    logging: true,
    useHttps:  process.env.USE_HTTPS === "true" ? true: false, 
    host: process.env.HOST_NAME,
    tmpMediaDir: './uploads/tmp',
    logPath: process.env.LOG_PATH,
    db: {
        host: process.env.DB_CONNECTION,
        options: {
            user: process.env.DB_USER,
            pass: process.env.DB_PASS,
            auth:{authdb:"admin"}
        }
    }
}