const db = require("./postgres");
const sendmail = require("./mailing");
const livePrice = require("./getLivePrice");
const onecoinliveprice = require("./oneCoinLivePrice");
const historyPrice = require("./getHistoricalPrice");
const gainandlose = require("./gainerAndLosers.js");
const change24 = require("./get24HourChange");
const redis = require("redis");
const encryption = require("./encrypt");
const decryption = require("./decrypt");
const iv = require("./ivgenerator");
const key = require("./keyCreater");
const news = require("./news");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const RazorPay = require("razorpay");
const shortid = require("shortid");
const req = require("express/lib/request");
app.use(cors());

app.use(express.static("public"));

app.use(express.json());

var savedotp = 0000;

const razorpay = new RazorPay({
  key_id: "YourApiKey",
  key_secret: "YourSecretKey",
});

app.get("/logo.svg", function (req, res) {
  res.sendFile(path.join(__dirname, "logo.png"));
});

app.post("/razorPay", async function (req, res) {
  const options = {
    amount: "50000",
    currency: "INR",
    receipt: "rcp1",
  };
  try {
    razorpay.orders.create(options, (err, order) => {
      res.send({ OrderId: order["id"] });
    });
  } catch (err) {}
});

app.get("/getTopLivePrice/:limit/:curr", function (req, res) {
  livePrice.returnCurrencies(
    function (data, err) {
      if (err) {
        return res.status(500).json({ ErrMessage: err });
      } else {
        return res.status(200).json(data);
      }
    },
    req.params.limit,
    req.params.curr
  );
});

app.get("/getLivePrice/:coin", function (req, res) {
  onecoinliveprice.returnCurrencies(function (data, err) {
    if (err) {
      return res.status(500).json({ ErrMessage: err });
    } else {
      return res.status(200).json(data);
    }
  }, req.params.coin);
});

app.get("/getHistoryPrice/:coin", function (req, res) {
  historyPrice.returnHistoryCurrencies(function (data, err) {
    if (err) {
      return res.status(500).json({ ErrMessage: err });
    } else {
      return res.status(200).json(data);
    }
  }, req.params.coin);
});

app.get("/get24HourChange/:coin", function (req, res) {
  change24.return24HourChange(function (data, err) {
    if (err) {
      return res.status(500).json({ ErrMessage: err });
    } else {
      return res.status(200).json(data);
    }
  }, req.params.coin);
});

app.get("/getGainersandLosers", function (req, res) {
  gainandlose.returnGainersandLosers(function (data, err) {
    if (err) {
      return res.status(500).json({ ErrMessage: err });
    } else {
      return res.status(200).json(data);
    }
  });
});

app.get("/getCryptoNews", function (req, res) {
  news.returnCryptoNews(function (data, err) {
    if (err) {
      return res.status(500).json({ ErrMessage: err });
    } else {
      return res.status(200).json(data);
    }
  }, "crypto");
});

app.get("/getCoinNews/:coin", function (req, res) {
  news.returnCryptoNews(function (data, err) {
    if (err) {
      return res.status(500).json({ ErrMessage: err });
    } else {
      return res.status(200).json(data);
    }
  }, req.params.coin);
});

app.get("/getUser/:email/:password", function (req, res) {
  db.executeSql(
    "SELECT * FROM accounts WHERE email='" + req.params.email + "';",
    async function (data, err) {
      const newKey = key.key(req.params.email, req.params.password);
      try {
        if (err) {
          return res.status(500).json({ ErrMessage: "Invalid Email" });
        } else if (
          decryption.decryption(
            await data[0]["password"],
            newKey,
            await data[0]["iv"]
          ) === req.params.password
        ) {
          var userdetails = {
            user_id: await data[0]["user_id"],
            username: decryption.decryption(
              await data[0]["username"],
              newKey,
              await data[0]["iv"]
            ),
            email: await data[0]["email"],
            aadhar: decryption.decryption(
              await data[0]["aadhar_no"],
              newKey,
              await data[0]["iv"]
            ),
            pan: decryption.decryption(
              await data[0]["pan_no"],
              newKey,
              await data[0]["iv"]
            ),
            curr: await data[0]["currency"],
          };
          return res.status(200).json(userdetails);
        } else {
          return res.status(500).json({ ErrMessage: "Wrong Password" });
        }
      } catch (e) {
        return res
          .status(500)
          .json({ ErrMessage: "Invalid Email or Password" });
      }
    }
  );
});

app.get("/getAllUsers", function (req, res) {
  db.executeSql("SELECT * FROM accounts;", async function (data, err) {
    try {
      if (err) {
        return res.status(500).json({ ErrMessage: "Invalid Email" });
      } else {
        return res.status(200).json(data);
      }
    } catch (e) {
      return res.status(500).json({ ErrMessage: "Invalid Email or Password" });
    }
  });
});

app.get("/getAllDelUsers", function (req, res) {
  db.executeSql("SELECT * FROM deletedaccounts;", async function (data, err) {
    try {
      if (err) {
        return res.status(500).json({ ErrMessage: "Invalid Email" });
      } else {
        return res.status(200).json(data);
      }
    } catch (e) {
      return res.status(500).json({ ErrMessage: "Invalid Email or Password" });
    }
  });
});

app.get("/generateOtpRegister/:email", function (req, res) {
  db.executeSql(
    "SELECT * FROM accounts WHERE email = '" + req.params.email + "';",
    async function (data, err) {
      if (err) {
        return res.status(500).json({ ErrMessage: err });
      } else if (data.length === 0) {
        const client = redis.createClient();
        client.on("error", (err) => {
          return res.status(500).json({ ErrMessage: err });
        });

        await client.connect();
        await client.set(
          req.params.email,
          Math.floor(1000 + Math.random() * 9000)
        );
        savedotp = await client.get(req.params.email);
        sendmail.sendthisMail(req.params.email, savedotp);

        setTimeout(function () {
          client.del(req.params.email);
        }, 60000);
        res.status(200).json({ otp: savedotp });
      } else {
        return res.status(500).json({ ErrMessage: "Email Already Registered" });
      }
    }
  );
});

app.post("/registerNewUser", async function (req, res) {
  const client = redis.createClient();
  client.on("error", (err) => {
    return res.status(500).json({ ErrMessage: err });
  });

  await client.connect();
  var savedotp = await client.get(req.body["email"]);
  if (savedotp === req.body["otp"]) {
    const ivector = iv.iv;
    const newKey = key.key(req.body["email"], req.body["password"]);
    db.executeSql(
      "INSERT INTO accounts(username, password, email, aadhar_no, pan_no, iv) VALUES('" +
        encryption.encryption(req.body["username"], newKey, ivector) +
        "', '" +
        encryption.encryption(req.body["password"], newKey, ivector) +
        "', '" +
        req.body["email"] +
        "', '" +
        encryption.encryption(req.body["aadhar"], newKey, ivector) +
        "', '" +
        encryption.encryption(req.body["pan"], newKey, ivector) +
        "', '" +
        ivector +
        "');",
      function (_data, err) {
        if (err) {
          return res.status(500).json({ ErrMessage: err });
        } else {
          db.executeSql(
            "INSERT INTO bankaccounts(user_id) VALUES((SELECT user_id FROM accounts WHERE email='" +
              req.body["email"] +
              "'));",
            function (_data, err) {
              if (err) {
                return res.status(500).json({ ErrMessage: err });
              } else {
                return res.status(200).json({ ...req.body, ..._data });
              }
            }
          );
        }
      }
    );
  } else {
    return res.status(500).json({ ErrMessage: "Wrong OTP" });
  }
});

app.get("/generateOtpUpdateandDelete", function (req, res) {
  db.executeSql(
    "SELECT * FROM accounts WHERE email = '" + req.body["email"] + "';",
    async function (data, err) {
      if (err) {
        return res.status(500).json({ ErrMessage: err });
      } else if (data["recordset"].length !== 0) {
        const newKey = key.key(req.body["email"], req.body["password"]);
        db.executeSql(
          "SELECT * FROM accounts WHERE email = '" +
            req.body["email"] +
            "' pass_word ='" +
            encryption.encryption(
              req.body["password"],
              newKey,
              data["recordset"][0]["iv"]
            ) +
            "';",
          async function (_data, err) {
            if (err) {
              return res.status(500).json({ ErrMessage: err });
            } else if (_data["recordset"].length !== 0) {
              const client = redis.createClient();
              client.on("error", (err) => {
                return res.status(500).json({ ErrMessage: err });
              });

              await client.connect();
              await client.set(
                req.body["email"],
                Math.floor(1000 + Math.random() * 9000)
              );
              savedotp = await client.get(req.body["email"]);
              sendmail.sendthisMail(req.body["email"], savedotp);

              setTimeout(function () {
                client.del(req.body["email"]);
              }, 60000);
              res.status(200).json({ otp: savedotp });
            } else {
              return res.status(500).json({ ErrMessage: "Incorrect Password" });
            }
          }
        );
      } else {
        return res.status(500).json({ ErrMessage: "Email Not Registered" });
      }
    }
  );
});

app.post("/updateUsername", async function (req, res) {
  const client = redis.createClient();
  client.on("error", (err) => {
    return res.status(500).json({ ErrMessage: err });
  });

  await client.connect();
  var savedotp = await client.get(req.body["email"]);
  if (savedotp === req.body["otp"]) {
    var ivector;
    const newKey = key.key(req.body["email"], req.body["password"]);
    db.executeSql(
      "SELECT * FROM accounts WHERE email='" + req.body["email"] + "';",
      async function (data, err) {
        if (err) {
          return res.status(500).json({ ErrMessage: "Invalid Email" });
        } else if (
          decryption.decryption(
            data["recordset"][0]["pass_word"],
            newKey,
            data["recordset"][0]["iv"]
          ) == req.body["password"]
        ) {
          ivector = await data["recorset"][0]["iv"];
          db.executeSql(
            "UPDATE accounts SET username ='" +
              encryption.encryption(req.body["username"], newKey, ivector) +
              "' Where email = '" +
              req.body["email"] +
              "';",
            function (_data, err) {
              if (err) {
                return res.status(500).json({ ErrMessage: err });
              } else {
                return res.status(200).json({ ...req.body, ..._data });
              }
            }
          );
        } else {
          return res.status(500).json({ ErrMessage: "Wrong Password" });
        }
      }
    );
  } else {
    return res.status(500).json({ ErrMessage: "Wrong OTP" });
  }
});

app.post("/updateUserPassword", async function (req, res) {
  const client = redis.createClient();
  client.on("error", (err) => {
    return res.status(500).json({ ErrMessage: err });
  });

  await client.connect();
  var savedotp = await client.get(req.body["email"]);
  if (savedotp === req.body["otp"]) {
    var ivector;
    const oldKey = key.key(req.body["email"], req.body["password"]);
    const newKey = key.key(req.body["email"], req.body["newpassword"]);
    db.executeSql(
      "SELECT * FROM accounts WHERE email='" + req.body["email"] + "';",
      async function (data, err) {
        if (err) {
          return res.status(500).json({ ErrMessage: "Invalid Email" });
        } else if (
          decryption.decryption(
            data["recordset"][0]["pass_word"],
            oldKey,
            data["recordset"][0]["iv"]
          ) == req.body["password"]
        ) {
          ivector = await data["recorset"][0]["iv"];
          db.executeSql(
            "UPDATE accounts SET password ='" +
              encryption.encryption(req.body["newpassword"], newKey, ivector) +
              "' username = '" +
              encryption.encryption(
                decryption.decryption(
                  data["recordset"][0]["username"],
                  oldKey,
                  ivector
                ),
                newKey,
                ivector
              ) +
              "' Where email = '" +
              req.body["email"] +
              "';",
            function (_data, err) {
              if (err) {
                return res.status(500).json({ ErrMessage: err });
              } else {
                return res.status(200).json({ ...req.body, ..._data });
              }
            }
          );
        } else {
          return res.status(500).json({ ErrMessage: "Wrong Password" });
        }
      }
    );
  } else {
    return res.status(500).json({ ErrMessage: "Wrong OTP" });
  }
});

app.post("/deleteUser", async function (req, res) {
  const client = redis.createClient();
  client.on("error", (err) => {
    return res.status(500).json({ ErrMessage: err });
  });

  await client.connect();
  var savedotp = await client.get(req.body["email"]);
  if (savedotp === req.body["otp"]) {
    var ivector;
    const newKey = key.key(req.body["email"], req.body["password"]);
    db.executeSql(
      "SELECT * FROM accounts WHERE email='" + req.body["email"] + "';",
      async function (data, err) {
        if (err) {
          return res.status(500).json({ ErrMessage: "Invalid Email" });
        } else if (
          decryption.decryption(
            data["recordset"][0]["pass_word"],
            newKey,
            data["recordset"][0]["iv"]
          ) == req.body["password"]
        ) {
          ivector = await data["recorset"][0]["iv"];
          db.executeSql(
            "DELETE FROM accounts Where email = '" + req.body["email"] + "';",
            function (_data, err) {
              if (err) {
                return res.status(500).json({ ErrMessage: err });
              } else {
                return res.status(200).json({ ...req.body, ..._data });
              }
            }
          );
        } else {
          return res.status(500).json({ ErrMessage: "Wrong Password" });
        }
      }
    );
  } else {
    return res.status(500).json({ ErrMessage: "Wrong OTP" });
  }
});

app.post("/deleteUserbyAdmin", async function (req, res) {
  db.executeSql(
    "DELETE FROM accounts Where email = '" + req.body["email"] + "';",
    async function (_data, err) {
      if (err) {
        return res.status(500).json({ ErrMessage: err });
      } else {
        db.executeSql(
          "INSERT INTO deletedaccounts (username, iv, email, aadhar_no, pan_no, password) VALUES('" +
            (await req.body["username"]) +
            "', '" +
            (await req.body["iv"]) +
            "', '" +
            (await req.body["email"]) +
            "', '" +
            (await req.body["aadhar_no"]) +
            "', '" +
            (await req.body["pan_no"]) +
            "', '" +
            (await req.body["password"]) +
            "') ;",
          function (__data, err) {
            if (err) {
              return res.status(500).json({ ErrMessage: err });
            } else {
              return res.status(200).json({ ...req.body, ...__data });
            }
          }
        );
      }
    }
  );
});

app.post("/restoreUserbyAdmin", async function (req, res) {
  db.executeSql(
    "DELETE FROM deletedaccounts Where email = '" + req.body["email"] + "';",
    async function (_data, err) {
      if (err) {
        return res.status(500).json({ ErrMessage: err });
      } else {
        db.executeSql(
          "INSERT INTO accounts (username, iv, email, aadhar_no, pan_no, password) VALUES('" +
            (await req.body["username"]) +
            "', '" +
            (await req.body["iv"]) +
            "', '" +
            (await req.body["email"]) +
            "', '" +
            (await req.body["aadhar_no"]) +
            "', '" +
            (await req.body["pan_no"]) +
            "', '" +
            (await req.body["password"]) +
            "') ;",
          function (__data, err) {
            if (err) {
              return res.status(500).json({ ErrMessage: err });
            } else {
              return res.status(200).json({ ...req.body, ...__data });
            }
          }
        );
      }
    }
  );
});

app.post("/decryptforAdmin", async function (req, res) {
  try {
    const decKey = key.key(req.body["email"], req.body["password"]);
    const data = {
      user_id: 0,
      currency: null,
      password: null,
      username: await decryption.decryption(
        await req.body["username"],
        decKey,
        await req.body["iv"]
      ),
      aadhar_no: await decryption.decryption(
        await req.body["aadhar"],
        decKey,
        await req.body["iv"]
      ),
      pan_no: await decryption.decryption(
        await req.body["pan"],
        decKey,
        await req.body["iv"]
      ),
      iv: await req.body["iv"],
      email: await req.body["email"],
    };

    return res.status(200).json(await data);
  } catch (err) {
    return res.status(500).json({ ErrMessage: err });
  }
});

app.post("/updateUserbyAdmin", async function (req, res) {
  const userKey = key.key(req.body["email"], req.body["password"]);
  db.executeSql(
    "SELECT * FROM accounts WHERE email='" + req.body["email"] + "';",
    async function (data, err) {
      if (err) {
        return res.status(500).json({ ErrMessage: "Invalid Email" });
      } else {
        ivector = await req.body["iv"];
        db.executeSql(
          "UPDATE accounts SET username = '" +
            encryption.encryption(req.body["username"], userKey, ivector) +
            "', aadhar_no = '" +
            encryption.encryption(req.body["aadhar_no"], userKey, ivector) +
            "', pan_no = '" +
            encryption.encryption(req.body["pan_no"], userKey, ivector) +
            "' Where email = '" +
            req.body["email"] +
            "';",
          function (_data, err) {
            if (err) {
              return res.status(500).json({ ErrMessage: err });
            } else {
              return res.status(200).json({ ...req.body, ..._data });
            }
          }
        );
      }
    }
  );
});

app.post("/buyCoin", async function (req, res) {
  db.executeSql(
    "SELECT currency FROM accounts WHERE email='" +
      (await req.body[0]["email"]) +
      "';",
    async function (data, err) {
      if (err) {
        return res.status(200).json({ ErrMessage: "Invalid Email" });
      } else {
        if (
          data[0]["currency"] !== null &&
          parseFloat(data[0]["currency"][0]["INR"]) >=
            parseFloat(req.body[0]["amount"])
        ) {
          var ifData;
          for (let x in data[0]["currency"]) {
            if (
              Object.keys(data[0]["currency"][x])[0] === req.body[0]["currency"]
            ) {
              ifData = x;
            }
          }
          var updatedData = [...data[0]["currency"]];
          var requestedAmount = {};
          updatedData[0]["INR"] = (
            parseFloat(updatedData[0]["INR"]) -
            parseFloat(req.body[0]["amount"])
          ).toString();
          if (ifData !== undefined) {
            updatedData[ifData][req.body[0]["currency"]] = (
              parseFloat(updatedData[ifData][req.body[0]["currency"]]) +
              parseFloat(req.body[0]["coinamount"])
            ).toString();
          } else {
            requestedAmount[await req.body[0]["currency"]] = await req.body[0][
              "coinamount"
            ];
            updatedData = [...data[0]["currency"], requestedAmount];
          }
          var updateddatastring = "[";
          for (let i = 0; i < updatedData.length; i++) {
            Object.keys(updatedData[i]).map((value) => {
              updateddatastring +=
                '{"' + value + '":"' + updatedData[i][value] + '"}';
            });
            if (i !== updatedData.length - 1) {
              updateddatastring += ",";
            }
          }
          updateddatastring += "]";
          db.executeSql(
            "UPDATE accounts SET currency = '" +
              updateddatastring +
              "' Where email = '" +
              req.body[0]["email"] +
              "';",
            function (_data, err) {
              if (err) {
                return res.status(500).json({ ErrMessage: err });
              } else {
                return res.status(200).json({ ...req.body, ..._data });
              }
            }
          );
        } else {
          return res.status(200).json({ ErrMessage: "Insufficient Balance" });
        }
      }
    }
  );
});

app.post("/sellCoin", async function (req, res) {
  db.executeSql(
    "SELECT currency FROM accounts WHERE email='" +
      (await req.body[0]["email"]) +
      "';",
    async function (data, err) {
      if (err) {
        return res.status(200).json({ ErrMessage: "Invalid Email" });
      } else {
        var ifData;
        for (let x in data[0]["currency"]) {
          if (
            Object.keys(data[0]["currency"][x])[0] === req.body[0]["currency"]
          ) {
            ifData = x;
          }
        }

        if (
          ifData != undefined &&
          data[0]["currency"] !== null &&
          parseFloat(data[0]["currency"][ifData][req.body[0]["currency"]]) >=
            parseFloat(req.body[0]["coinamount"])
        ) {
          var updatedData = [...data[0]["currency"]];
          var requestedAmount = {};
          updatedData[0]["INR"] = (
            parseFloat(updatedData[0]["INR"]) +
            parseFloat(req.body[0]["amount"])
          ).toString();
          if (ifData !== undefined) {
            updatedData[ifData][req.body[0]["currency"]] = (
              parseFloat(updatedData[ifData][req.body[0]["currency"]]) -
              parseFloat(req.body[0]["coinamount"])
            ).toString();
          } else {
            requestedAmount[await req.body[0]["currency"]] = await req.body[0][
              "coinamount"
            ];
            updatedData = [...data[0]["currency"], requestedAmount];
          }
          var updateddatastring = "[";
          for (let i = 0; i < updatedData.length; i++) {
            Object.keys(updatedData[i]).map((value) => {
              updateddatastring +=
                '{"' + value + '":"' + updatedData[i][value] + '"}';
            });
            if (i !== updatedData.length - 1) {
              updateddatastring += ",";
            }
          }
          updateddatastring += "]";
          db.executeSql(
            "UPDATE accounts SET currency = '" +
              updateddatastring +
              "' Where email = '" +
              req.body[0]["email"] +
              "';",
            function (_data, err) {
              if (err) {
                return res.status(500).json({ ErrMessage: err });
              } else {
                return res.status(200).json({ ...req.body, ..._data });
              }
            }
          );
        } else {
          return res.status(200).json({ ErrMessage: "Insufficient Balance" });
        }
      }
    }
  );
});

app.get("/getCurr/:email", async function (req, res) {
  db.executeSql(
    "SELECT currency FROM accounts WHERE email='" +
      (await req.params.email) +
      "';",
    async function (data, err) {
      if (err) {
        return res.status(200).json({ ErrMessage: "Invalid Email" });
      } else {
        return res.status(200).json(data);
      }
    }
  );
});

app.post("/registerBankDetails", async function (req, res) {
  db.executeSql(
    "UPDATE bankaccounts SET accountno ='" +
      req.body["accountno"] +
      "', accountholdername ='" +
      req.body["accountholdername"] +
      "', ifsc='" +
      req.body["ifsc"] +
      "' WHERE user_id ='" +
      req.body["user_id"] +
      "';",
    function (_data, err) {
      if (err) {
        return res.status(500).json({ ErrMessage: err });
      } else {
        return res.status(200).json({ ...req.body, ..._data });
      }
    }
  );
});

app.get("/getBankDetails/:user_id", async function (req, res) {
  db.executeSql(
    "SELECT * FROM bankaccounts WHERE user_id ='" + req.params.user_id + "';",
    function (_data, err) {
      if (err) {
        return res.status(500).json({ ErrMessage: err });
      } else {
        return res.status(200).json({ ...req.body, ..._data });
      }
    }
  );
});

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("CoinXpe server listening at http://%s:%s", host, port);
});
