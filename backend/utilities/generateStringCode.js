const { ConsoleTransportOptions } = require("winston/lib/winston/transports");

function generateStringCode(
  length = 30,
  chars = "abcdefghijklmnopqrstuvwxyz1234567890"
) {
  let result = "";
  const charactersLength = chars.length;

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charactersLength));
  }

  return `${result}`;
}

module.exports = generateStringCode;
