export const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    if (parsed.body !== undefined) {
      req.body = parsed.body;
    }
    next();
  } catch (err) {
    next(err); // Handled by errorHandler.js
  }
};
