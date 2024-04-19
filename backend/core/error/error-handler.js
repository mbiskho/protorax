const ApiError = require('./api-error');

function apiErrorHandler(err, req, res, next) {
  // in prod, don't use console.error
  // because it is not async
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.code).json(err.message);
  }
  return res.status(500).json(ApiError.internal('something went wrong'));
}

const wrap = fn => (req, res, next) => {
  try {
    const result = fn(req, res, next);
    return result.catch(next);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  apiErrorHandler, 
  wrap
};