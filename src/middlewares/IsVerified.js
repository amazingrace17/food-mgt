
const IsVerified = async(req, res, next) => {
  // Always combine with AuthValidator to access req.user
  try {
    if (!req.user.isVerified) {
        return res.status(401).json({ 
            status: "failed", 
            message: "unauthorized: verified users access only"
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

export default IsVerified;