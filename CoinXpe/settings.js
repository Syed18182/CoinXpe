exports.dbConfig = {
  server: "LAPTOP-HNP465U9",
  database: "CoinXpe",
  trustServerCertificate: true,
  options: {
    trustedConnection: true,
  },
  port: 1433,
};
exports.dbConfigpg = {
  host: "localhost",
  user: "postgres",
  port: 54323,
  password: "root",
  database: "CoinXpe",
};
exports.webPort = 9000;
exports.apiKeys = {
  getLivePriceApi: "YourApiKey",
  getHistoricalPriceApi:
    "YourApiKey",
  getNewsApi: "YourApiKey",
};
