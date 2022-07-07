const rp = require("request-promise");
const settings = require("./settings");

const returnHistoryCurrencies = (callback, currency) => {
  var responseCurrencies = [];
  var resCurrency = {};

  const requestOptions = {
    method: "GET",
    uri: "https://min-api.cryptocompare.com/data/v2/histohour",
    qs: {
      fsym: currency,
      tsym: "INR",
      limit: "24",
    },
    headers: {
      Apikey: settings.apiKeys.getHistoricalPriceApi,
    },
    json: true,
    gzip: true,
  };

  rp(requestOptions)
    .then(async (response) => {
      callback(response);
    })
    .catch((err) => {
      callback(err.message);
    });
};
module.exports = {
  returnHistoryCurrencies: returnHistoryCurrencies,
};
