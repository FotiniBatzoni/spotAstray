const winston = require("winston");
require("express-async-errors");

module.exports = function () {
  const today = new Date();
  const current_date = `${today.getFullYear()}_${(
    "0" +
    (today.getMonth() + 1)
  ).slice(-2)}_${("0" + today.getDate()).slice(-2)}`;

  winston.exceptions.handle(
    new winston.transports.File({
      filename: `logs/exceptions/uncaughtExceptions_${current_date}.log`,
      format: winston.format.combine(
        winston.format.timestamp({
          format: "YYYY-MM-DD hh:mm:ss A ZZ",
        }),
        winston.format.json()
      ),
      handleExceptions: true,
    })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(
    new winston.transports.File({
      filename: `logs/logfiles/logfile_${current_date}.log`,
      format: winston.format.combine(
        winston.format.timestamp({
          format: "YYYY-MM-DD hh:mm:ss A ZZ",
        }),
        winston.format.json()
      ),
      handleExceptions: true,
    })
  );
  /*
  winston.add(new winston.transports.MongoDB({
    db: 'mongodb://localhost/caretaker2',
    level: 'info',
    options: {
		useUnifiedTopology: true
	}
  }));
  */
};
