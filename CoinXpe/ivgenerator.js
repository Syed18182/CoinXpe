const crypto = require("crypto");
exports.iv = crypto.randomBytes(16).toString("hex").slice(0, 16);
