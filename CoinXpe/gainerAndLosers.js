const rp = require("request-promise");
const settings = require("./settings");

const returnGainersandLosers = (callback, coinLimit) => {
  const requestOptions = {
    method: "GET",
    uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/trending/gainers-losers",
    qs: {
      start: "1",
      limit: coinLimit,
      convert: "INR",
    },
    headers: {
      "X-CMC_PRO_API_KEY": settings.apiKeys.getLivePriceApi,
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
  returnGainersandLosers: returnGainersandLosers,
};
