
const IsAdmin = async(req, res, next) => {
  // Always combine with AuthValidator to access req.user
  try {
    if (req.user.isVerified === false) {
      return res.status(401).json({ 
        status: "failed", 
        message: "unauthorized: verified admins access only"
      });
    }
    
    if (!req.user.role || req.user.role !== 'admin') {
      return res.status(401).json({ 
        status: "failed", 
        message: "unauthorized: admins access only"
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ 
      status: "failed", 
      message: error.message 
    });
  }
};

export default IsAdmin;