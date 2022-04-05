const { createLogger, format, transports, level } = require('winston');

function createServiceLogger(serviceName, logFiles) {
    const trans = logFiles.map(fileInfo => {
        return new transports.File({ 
            filename: serviceName + '_' + fileInfo.filename,
            level: fileInfo.level
        })
    })
    return createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.errors({ stack: true }),
            format.splat(),
            format.json()
        ),
        defaultMeta: { service: serviceName },
        transports: trans
    })
}

const SSOServiceLogger = createServiceLogger('SSO', [
    { filename: 'error.log', level: 'error' }
])

try {
    const a = fileInfo;
    console.log(a)
}
catch(e) {
    console.error(e)
    SSOServiceLogger.log('error', e.stack)
}
