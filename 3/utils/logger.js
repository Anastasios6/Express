const fs = require("fs");
const path = require("path");
const { object } = require("webidl-conversions");


const createLog = (req, res, next) => {
    const time = new Date().toLocaleString();
    const method = req.method;
    const url = req.originalUrl;
    const user = req.user ? req.user.name : "guest";
    const body = { ...req.body };

    const bodyData = Object.keys(body).length > 0
        ? `| Data: ${JSON.stringify(body)}`
        : "";

    const logEntry = `[${time}] [${method}] [${url}] User:[${user}\n]${bodyData}\n`;


    const logPath = path.join(__dirname, "app.log");

    fs.appendFile(logPath, logEntry, (err) => {
        if (err) { console.log("Logging error", err.message); }
    });
    next();
};

module.exports = createLog;