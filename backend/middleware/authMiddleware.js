const authMiddleware = (roles = []) => {
    return (req, res, next) => {
      if (req.session.userId) {
        req.user = {
          id: req.session.userId,
          role: req.session.role // save the role to session
        };
  
        //Ignore if user has no role yet
        if (roles.length && !roles.includes(req.user.role)) {
          return res.status(403).json({ success: false, message: 'Forbidden' });
        }
  
        next(); //Authenticate the user to login
      } else {
        res.status(401).json({ success: false, message: 'Unauthorized' });
      }
    };
  };
  
  module.exports = authMiddleware;