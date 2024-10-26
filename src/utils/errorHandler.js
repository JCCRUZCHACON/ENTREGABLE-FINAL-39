const errorHandler = (error, _req, res, _next) => {
    const errObj = {};
    if(error.name === 'SequelizeValidationError') {
        error.errors.map(er => {
            errObj[er.path] = er.message;
        })
        return res.status(400).json(errObj);
    }
    if(error.name === 'SequelizeForeignKeyConstraintError'){
        return res.status(400).json({ 
            message: error.message,
            error: error.parent.detail
        });
    }
    return res.status(500).json({
        message: error.message,
        error: error
    });
}

module.exports = errorHandler;