const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: err.errors ? err.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ') : err.message,
      },
    });
  }
};

module.exports = validate;
