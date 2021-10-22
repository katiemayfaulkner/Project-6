// Secret or private key (token) generator for verification purpose
const jwt = require('jsonwebtoken');

// Secret or private key (token) verification middleware
module.exports = (req, res, next) => {
  try { 
    // Extract token & split it because it also contains bearer keyword
    const token = req.headers.authorization.split(' ')[1];
    // Verify function to decode token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET_WHICH_IS_LONG_BECAUSE_IT_IS_MORE_SECURE');
    // Extract user id from token
    const userId = decodedToken.userId; 

    //if request contains token, compare it to the one we extracted (if different, throw error)
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
      message: 'Invalid request!'
    });
  }
};