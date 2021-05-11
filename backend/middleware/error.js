const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.error(err.message, err, { metadata: { prop: err } });
  if (err.statusCode === 413)
    return res.send({
      message: "Το συνολικό μέγεθος των εικόνων δεν πρέπει να ξερπερνά τα 20MB",
    });
  return res.status(500).send({ message: "Υπήρξε πρόβλημα στο σύστημα." });
};
