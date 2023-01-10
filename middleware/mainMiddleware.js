const { mainAdmin } = require('../firebase/initializeApps');

function checkAuth(req, res, next) {
  if (req.headers.authtoken) {
    mainAdmin
      .auth()
      .verifyIdToken(req.headers.authtoken)
      .then((decodedToken) => {
        req.body.decodedToken = decodedToken;
        next();
      })
      .catch((error) => {
        console.log(error, 'error');
        res.status(403).send('Unauthorized');
      });
  } else {
    res.status(403).send('Unauthorized');
  }
}
module.exports = checkAuth;
