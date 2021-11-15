
const IsSeller = async(req, res, next) => {
  // Always combine with AuthValidator to access req.user
  try {
    if (req.user.isVerified === false) {
      return res.status(401).json({ 
        status: "failed", 
        message: "unauthorized: verified users with sellers access only"
      });
    }

    if (!req.user.role || req.user.role !== 'seller') {
      return res.status(401).json({ 
        status: "failed", 
        message: "unauthorized: sellers access only"
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

export default IsSeller;