module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    switch (true) {
        case typeof err === 'string':

            const code404 = err.toLowerCase().endsWith('not found');
            const sCode = code404 ? 404 : 400;
            return res.status(sCode).json({
                message: err
            });

        case err.name === 'UnAuthorized Error':

            return res.status(401).json({
                message: 'UnAuthorized'
            });

        default:
            return res.status(500).json({
                message: err.message
            });

    }
}