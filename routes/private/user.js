const express = require("express");
const { User } = require("../../models/user");

const router = express.Router();

router.post("/handleProfile", async (req, res, next) => {
  const { decodedToken } = req.body;
  console.log(decodedToken, "decodedToken");

  let targetUser = await User.findById(decodedToken.uid);

  if (targetUser) {
    return res.status(200).send(targetUser);
  }
  let userObj = createUserObjFromToken(decodedToken);
  let newUser = await User.create(userObj);
  if (!newUser) {
    return res.status(401).send("User Not Created Successfully");
  }
  res.status(200).send(newUser);
});

module.exports = router;
