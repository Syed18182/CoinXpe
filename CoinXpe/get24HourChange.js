const rp = require("request-promise");
const settings = require("./settings");

const return24HourChange = (callback, currency) => {
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
      lastHourPrice =
        (await (response["Data"]["Data"][0]["high"] +
          response["Data"]["Data"][0]["low"])) / 2;
      prev24HourPrice =
        (await (response["Data"]["Data"][24]["high"] +
          response["Data"]["Data"][24]["low"])) / 2;
      resCurrency["currName"] = currency;
      resCurrency["lastHourAvgPrice"] = lastHourPrice;
      resCurrency["prev24HourAvgPrice"] = prev24HourPrice;
      resCurrency["percentChange"] =
        ((lastHourPrice - prev24HourPrice) / prev24HourPrice) * 100;
      responseCurrencies[0] = await resCurrency;
      resCurrency = {};
      callback(responseCurrencies);
    })
    .catch((err) => {
      callback("hi" + err.message);
    });
};
module.exports = {
  return24HourChange: return24HourChange,
};
