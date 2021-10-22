const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try { 
    const token = req.headers.authorization.split(' ')[1]; //extract token, split it bc it also contains bearer keyword
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET_WHICH_IS_LONG_BECAUSE_IT_IS_MORE_SECURE'); //verify function to decode token
    const userId = decodedToken.userId; //extract user id from token
    if (req.body.userId && req.body.userId !== userId) { //if request contains token, compare it to one extracted from token (if diff, throw error)
      throw 'Invalid user ID';
    } else {
      next(); //pass execution using next(), if all is well
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
      message: 'Invalid request!'
    });
  }
};