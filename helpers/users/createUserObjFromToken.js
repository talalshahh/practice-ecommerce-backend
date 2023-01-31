function destructName(fullName) {
  let firstName = fullName.substring(0, fullName.indexOf(" "));
  let lastName = fullName.substring(fullName.indexOf(" ") + 1);
  return { firstName, lastName };
}

function createUserObjFromToken(decodedToken) {
  let userObj = {};
  userObj._id = decodedToken.uid;
  userObj.email = decodedToken.email;
  userObj.verified = decodedToken.email_verified;
  userObj.signInProvider = decodedToken.firebase.sign_in_provider;

  if (decodedToken.name) {
    userObj.fullName = decodedToken.name;
    let fullNameObj = destructName(decodedToken.name);
    userObj.firstName = fullNameObj.firstName;
    userObj.lastName = fullNameObj.lastName;
  }
  if (decodedToken.picture) {
    userObj.photoURL = decodedToken.picture;
  }
  return userObj;
}
module.exports.createUserObjFromToken = createUserObjFromToken;
