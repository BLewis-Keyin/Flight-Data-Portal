const fs = require('fs');
const path = require('path');


const DEBUG = true;

// Function to log search queries
function logSearchQuery(req, query) {
    const logDirectory = './services/logs/search_logs';
    const user = req.session && req.session.user ? req.session.user.username : 'Guest';
    const timestamp = new Date().toISOString();
    const userSearchLogFilePath = path.join(__dirname, '/logs/search_logs', `${user}_search_log.txt`);
    const logEntry = `${timestamp}: USER: ${user} QUERY - "${query}"\n`;
    if (global.DEBUG || global.LOG_DEBUG || DEBUG) {
        console.log(logEntry);
        return;
    }

    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
    }
    fs.appendFile(userSearchLogFilePath, logEntry, (err) => {
        if (err) {
            console.error('Error writing to search log file:', err);
        }
    });

}

// Function to log activity
function logActivity(req, message) {
    const logDirectory = './services/logs/activity_logs';
    const user = req.session && req.session.user ? req.session.user.username : 'Guest';
    const currentDate = new Date().toISOString().slice(0, 10);
    const activityLogFilePath = path.join(__dirname, '/logs/activity_logs', `${currentDate}_activity_log.txt`);
    const timestamp = new Date().toUTCString();
    const logMessage = `[${timestamp}] USER: ${user} - ${message}`;


    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
    }


    if (global.DEBUG || global.LOG_DEBUG || DEBUG) {
        console.log(logMessage);
        return;
    }
    const fileStream = fs.createWriteStream(activityLogFilePath, { flags: 'a' });
    fileStream.write(logMessage + '\n');
    fileStream.end();

}

module.exports = {
    logSearchQuery,
    logActivity
};