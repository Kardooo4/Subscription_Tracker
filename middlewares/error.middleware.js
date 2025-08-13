const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;
    console.error(err);

    // & mongoose bad object id
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;

      error = new Error(message);
      error.statusCode = 404;
    }

    // & mongoose duplicate key
    if (err.code === 11000) {
      // eslint-disable-next-line no-unused-vars
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error.statusCode = 400;
    }
    // & mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
    });
  } catch (error) {
    next(error);
  }
};
// ^ create a middleware to handle errors

export default errorMiddleware;
