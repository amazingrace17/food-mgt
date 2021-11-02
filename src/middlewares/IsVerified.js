
const IsVerified = async(req, res, next) => {
  if(!req.headers.authorization) {
    return res.status(401).json({ 
        status: "failed", 
        message: "unauthorized"
    });
  }

  // Must always be combined with AuthValidator middleware to access 'req.user'
  try {
    console.log(req.user);
    
    if (!req.user || req.user.isVerified === false) {
        return res.status(401).json({ 
            status: "failed", 
            message: "unauthorized access, verified users only"
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