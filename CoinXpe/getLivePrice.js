const rp = require("request-promise");
const settings = require("./settings");

const returnCurrencies = (callback, coinLimit, curr) => {
  var responseCurrencies = [];
  var resCurrency = {};

  const requestOptions = {
    method: "GET",
    uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    qs: {
      start: "1",
      limit: coinLimit,
      convert: curr,
    },
    headers: {
      "X-CMC_PRO_API_KEY": settings.apiKeys.getLivePriceApi,
    },
    json: true,
    gzip: true,
  };

  rp(requestOptions)
    .then(async (response) => {
      for (i = 0; i < response["data"].length; i++) {
        currName = await response["data"][i]["symbol"];
        resCurrency["currName"] = currName;
        resCurrency["price"] = await (response["data"][i]["quote"][curr][
          "price"
        ] + "");
        resCurrency["perInc"] = "0";
        responseCurrencies[i] = await resCurrency;
        resCurrency = {};
      }
      callback(responseCurrencies);
    })
    .catch((err) => {
      callback(err.message);
    });
};

module.exports = {
  returnCurrencies: returnCurrencies,
};
