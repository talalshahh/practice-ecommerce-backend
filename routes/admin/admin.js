const express = require("express");
const {
  createUserObjFromToken,
} = require("../../helpers/users/createUserObjFromToken");
const { Admin } = require("../../models/admin");

const router = express.Router();

router.post("/adminHandleProfile", async (req, res, next) => {
  const { decodedToken } = req.body;

  let targetUser = await Admin.findById(decodedToken.uid);

  if (targetUser) {
    return res.status(200).send(targetUser);
  }
  let userObj = createUserObjFromToken(decodedToken);
  let newUser = await Admin.create(userObj);
  if (!newUser) {
    return res.status(401).send("Admin Not Created Successfully");
  }
  res.status(200).send(newUser);
});

module.exports = router;
