var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "AutoTrader", user: "sowlyehg_test_user" });
});

module.exports = router;
