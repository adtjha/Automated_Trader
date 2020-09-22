var express = require("express");
var router = express.Router();

/* POST trades. */
router.post("/trades", function (req, res, next) {
  res.json({ message: "Trades executed successfully." });
});

module.exports = router;
