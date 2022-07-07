const crypto = require("crypto");

exports.encryption = (message, key, iv) => {
  const encrypter = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encryptedMsg = encrypter.update(message, "utf8", "hex");
  encryptedMsg += encrypter.final("hex");
  return encryptedMsg;
};
