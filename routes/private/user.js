const express = require("express");
const {
  createUserObjFromToken,
} = require("../../helpers/users/createUserObjFromToken");
const { User } = require("../../models/user");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { decodedToken } = req.body;

  let userObj = createUserObjFromToken(decodedToken);
  let newUser = await User.create(userObj);
  if (!newUser) {
    return res.status(401).send("User Not Created Successfully");
  }
  return res.status(200).send(newUser);
});
router.get("/login", async (req, res, next) => {
  const { decodedToken } = req.body;
  console.log(decodedToken, "v");
  let targetUser = await User.findById(decodedToken.uid);
  console.log(targetUser, "targetUser");
  if (targetUser) {
    return res.status(200).send(targetUser);
  }
});
module.exports = router;
