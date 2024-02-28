const { constants } = require('../constants');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.status(constants.VALIDATION_ERROR).json({ title: "Validation failed", message: err.message, stackTrace: err.stack });
            break;
        case constants.NOT_FOUND:
            res.status(constants.NOT_FOUND).json({ title: "Not found", message: err.message, stackTrace: err.stack });
            break;
        case constants.FORBIDDEN:
            res.status(constants.FORBIDDEN).json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
            break;
        case constants.SERVER_ERROR:
            res.status(constants.SERVER_ERROR).json({ title: "Server error", message: err.message, stackTrace: err.stack });
            break;
        default:
            console.log('No error');
            break;
    }

    return;
}

module.exports = errorHandler;
