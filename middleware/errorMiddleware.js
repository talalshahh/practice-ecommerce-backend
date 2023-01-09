module.exports = function (err, req, res, next) {
  const { code, message } = err;
  const displayCode = code ? code : 500;
  const errMessage = message ? message : "Server Internal Error";
  return res.status(displayCode).send(errMessage);
};
