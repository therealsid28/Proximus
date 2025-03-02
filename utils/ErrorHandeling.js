class ErrorHandeling {
  constructor() {}

  sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });

    return this;
  };

  globalErrorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error';
    this.sendErrorDev(err, res);
  };

  asyncErrorHandler = (func) => {
    return (req, res, next) => {
      func(req, res, next).catch((err) => next(err));
    };
  };
}

const { globalErrorMiddleware, asyncErrorHandler } = new ErrorHandeling();

export { globalErrorMiddleware, asyncErrorHandler };
