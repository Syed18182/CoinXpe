const rp = require("request-promise");
const settings = require("./settings");
const today = new Date();

var dateToday =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

const returnCryptoNews = (callback, currency) => {
  const requestOptions = {
    method: "GET",
    uri:
      "https://newsapi.org/v2/everything?q=" +
      currency +
      "&from=" +
      dateToday +
      "&sortBy=popularity&apiKey=" +
      settings.apiKeys.getNewsApi,
    json: true,
    gzip: true,
  };

  rp(requestOptions)
    .then(async (response) => {
      callback(response["articles"]);
    })
    .catch((err) => {
      callback(err.message);
    });
};

module.exports = {
  returnCryptoNews: returnCryptoNews,
};
