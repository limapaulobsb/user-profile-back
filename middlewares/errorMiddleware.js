module.exports = ({ statusCode, message }, _req, res, _next) => {
  console.log(message);
  if (statusCode) return res.status(statusCode).json({ message });
  return res.status(500).json({ message: 'Internal error' });
};
