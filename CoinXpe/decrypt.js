const crypto = require("crypto");

exports.decryption = (encryptedMsg, key, iv) => {
  const decrypter = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decryptedMsg = decrypter.update(encryptedMsg, "hex", "utf8");
  decryptedMsg += decrypter.final("utf8");
  return decryptedMsg;
};
