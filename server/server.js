"use strict";
process.title = "lorem-store";
const cookieSession = require("cookie-session");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose").set("debug", true);
const Schema = mongoose.Schema;
const ObjectId = require("mongodb").ObjectID;

const goodsScheme = new Schema(
  {
    brand: String,
    model: String,
    display_res: String,
    display_size: String,
    display_type: String,
    ram: String,
    rom: String,
    battery: String,
    rear_camera: String,
    front_camera: String,
    cpu: String,
    price: String,
    img: String
  },
  { versionKey: false }
);

const userScheme = new Schema(
  {
    login: String,
    password: String,
    is_admin: Boolean,
    cart: { type: Array, default: [] }
  },
  { versionKey: false }
);

mongoose.set("useFindAndModify", false);

const Goods = mongoose.model("goods", goodsScheme);
const User = mongoose.model("users", userScheme);

app.set("trust proxy", 1);

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"]
  })
);

app.use(function(req, res, next) {
  let allowedOrigins = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://192.168.0.106:3000"
  ];
  let origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/img", express.static(__dirname + "/images"));

mongoose.connect(
  "mongodb://localhost:27017/usersdb",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(err) {
    if (err) return console.log(err);
    app.listen(1338, function() {
      console.log("Listening at Port 1338");
    });
  }
);

let resp = {
  payload: [],
  log: "",
  id: "",
  user_cart: []
};

app.get("/top", function(req, res, next) {
  let data = [];
  let top;

  if (req.session.user_login) {
    resp.log = req.session.user_login;
    resp.id = req.session.user_id;
    resp.user_cart = req.session.user_cart;
    User.find(
      {
        _id: req.session.user_id
      },
      function(err, user) {
        data = user[0].cart;
        const getData = async () => {
          return Promise.all(
            data.map(item =>
              Goods.find({ _id: item.product_id }, function(err, goods) {
                item.description = goods[0];
              })
            )
          );
        };

        getData().then(item => {
          resp.user_cart = data;
          Goods.find({}, function(err, goods) {
            if (err) return console.log(err);
            resp.payload = goods;
            res.send(resp);
          });
        });
      }
    );
  } else {
    console.log("Username not logged!");

    Goods.find({}, function(err, goods) {
      if (err) return console.log(err);
      resp = {
        payload: [],
        log: "",
        id: "",
        user_cart: []
      };
      resp.payload = goods;
      res.send(resp);
    });
  }
});

app.get("/phone/:name", function(req, res) {
  if (req.session) {
    resp.log = req.session.user_login;
    resp.id = req.session.user_id;
    resp.user_cart = req.session.user_cart;
  } else {
    console.log("Username not logged!");
  }

  let name = req.params.name;
  Goods.find({ brand: name }, function(err, goods) {
    if (err) return console.log(err);
    resp.payload = goods;
    res.send(JSON.stringify(resp));
  });
});

app.post("/search", function(req, res, next) {
  if (req.session.user_login) {
    resp.log = req.session.user_login;
    resp.id = req.session.user_id;
    resp.user_cart = req.session.user_cart;
  }

  const regexp = /^[a-z0-9_\s]+$/i;

  let data = req.body.data;

  if (regexp.test(data)) {
    Goods.find(
      {
        $or: [
          { model: new RegExp(data, "i") },
          { brand: new RegExp(data, "i") }
        ]
      },
      function(err, goods) {
        if (err) return console.log(err);
        resp.payload = goods;
        res.send(JSON.stringify(resp));
      }
    );
  } else {
    console.log("Wrong search request!");
  }
});

function isEmpty(str) {
  if (str.trim() == "") return true;
  return false;
}

app.post("/reg", function(req, res) {
  if (isEmpty(req.body.login) || isEmpty(req.body.password)) {
    res.status(422).send("Please enter login and password!");
  } else {
    let usr_login = req.body.login.trim();
    let usr_password = req.body.password.trim();
    let usr_is_admin = false;

    User.findOne({ login: usr_login }, function(err, user) {
      if (!user) {
        let user = new User({
          login: usr_login,
          password: usr_password,
          is_admin: usr_is_admin
        });
        user.save(function(err) {
          if (err) return console.log(err);
          res.send(user);
        });
      } else {
        res.status(422).send("user already exists!");
      }

      if (err) console.log(err);
    });
  }
});

app.post("/log", function(req, res, next) {
  if (isEmpty(req.body.login) || isEmpty(req.body.password)) {
    res.status(422).send("Please enter a correct login and password!");
  } else {
    let usr_login = req.body.login.trim();
    let usr_password = req.body.password.trim();

    User.find(
      {
        login: new RegExp("^" + usr_login + "$", "i"),
        password: new RegExp("^" + usr_password + "$", "i")
      },
      function(err, user) {
        if (!user.length) {
          res.status(422).send("user not found!");
        } else {
          req.session.user_login = user[0].login;
          req.session.user_id = user[0]._id;
          req.session.islog = true;
          res.send(user[0]);
        }
        if (err) console.log(err);
      }
    );
  }
});

app.post("/add-to-cart", function(req, res, next) {
  let data = [];

  User.find(
    {
      _id: req.session.user_id
    },
    function(err, user) {
      if (user[0].cart.find(item => item.product_id === req.body.id)) {
        User.findOneAndUpdate(
          { _id: ObjectId(req.session.user_id) },
          { $inc: { "cart.$[elem].amount": 1 } },
          {
            arrayFilters: [{ "elem.product_id": req.body.id }],
            multi: false,
            returnOriginal: false
          },
          function(err, goods) {
            res.send(goods.cart);
          }
        );
      } else {
        Goods.findOne({ _id: req.body.id }, function(err, goods) {
          User.updateOne(
            { _id: req.session.user_id },
            {
              $push: {
                cart: { product_id: req.body.id, amount: 1, description: goods }
              }
            },
            function(err, raw) {
              if (err) return console.log(err);
              User.find(
                {
                  _id: req.session.user_id
                },
                function(err, user) {
                  res.send(user[0].cart);
                }
              );
            }
          );
        });
      }
    }
  );
});

app.post("/remove-from-cart", function(req, res, next) {
  Goods.findOne({ _id: req.body.id }, function(err, goods) {
    User.updateOne(
      { _id: req.session.user_id },
      { $pull: { cart: { product_id: req.body.product } } },
      function(err, raw) {
        if (err) return console.log(err);
        User.find(
          {
            _id: req.session.user_id
          },
          function(err, user) {
            res.send(user[0].cart);
          }
        );
      }
    );
  });
});

app.post("/increment-in-cart", function(req, res, next) {
  User.findOneAndUpdate(
    { _id: ObjectId(req.session.user_id) },
    { $inc: { "cart.$[elem].amount": 1 } },
    {
      arrayFilters: [{ "elem.product_id": req.body.product }],
      multi: false,
      returnOriginal: false
    },
    function(err, raw) {
      if (err) return console.log(err);
      User.find(
        {
          _id: req.session.user_id
        },
        function(err, user) {
          res.send(user[0].cart);
        }
      );
    }
  );
});

app.post("/decrement-in-cart", function(req, res, next) {
  User.findOne({ _id: req.session.user_id }, function(err, goods) {
    goods.cart.find(item => item.product_id === req.body.product).amount > 1
      ? User.findOneAndUpdate(
          { _id: ObjectId(req.session.user_id) },
          { $inc: { "cart.$[elem].amount": -1 } },
          {
            arrayFilters: [{ "elem.product_id": req.body.product }],
            multi: false,
            returnOriginal: false
          },
          function(err, raw) {
            if (err) return console.log(err);
            User.find(
              {
                _id: req.session.user_id
              },
              function(err, user) {
                res.send(user[0].cart);
              }
            );
          }
        )
      : User.updateOne(
          { _id: req.session.user_id },
          { $pull: { cart: { product_id: req.body.product } } },
          function(err, raw) {
            if (err) return console.log(err);
            User.find(
              {
                _id: req.session.user_id
              },
              function(err, user) {
                res.send(user[0].cart);
              }
            );
          }
        );
  });
});

app.post("/purchase", function(req, res, next) {
  User.updateOne(
    { _id: req.session.user_id },
    { $pull: { cart: { product_id: req.body.product } } },
    function(err, raw) {
      if (err) return console.log(err);
      User.find(
        {
          _id: req.session.user_id
        },
        function(err, user) {
          res.send(user[0].cart);
        }
      );
    }
  );
});

app.get("/logout", function(req, res, next) {
  if (req.session) {
    req.session = null;
  } else {
    console.log("Session does not exist!");
  }
  res.send("User has been logged out");
});
