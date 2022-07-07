const rp = require("request-promise");
const settings = require("./settings");

const returnCurrencies = (callback, currency) => {
  const requestOptions = {
    method: "GET",
    uri: "https://min-api.cryptocompare.com/data/v2/histohour",
    qs: {
      fsym: currency,
      tsym: "INR",
      limit: "100",
    },
    headers: {
      Apikey: settings.apiKeys.getHistoricalPriceApi,
    },
    json: true,
    gzip: true,
  };

  rp(requestOptions)
    .then((response) => {
      callback(response["Data"]["Data"][0]["high"]);
    })
    .catch((err) => {
      callback(err.message);
    });
};
module.exports = {
  returnCurrencies: returnCurrencies,
};
