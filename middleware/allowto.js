const users= require("../models/user")
const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.json({ status: "fail", msg: "unauthorized" });
    }
    next();
  };
};
module.exports=allowRoles;