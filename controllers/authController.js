const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const authCtrl = {
  authRegister: async (req, res) => {
    // simple validation 
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing username or password" });
    try {
        // check if the user
      const user = await User.findOne({ username: username });
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: "Username already exists" });
      }
      const hashedPassword = await argon2.hash(password);
      const newUser = new User({
        username: username,
        password: hashedPassword,
      });
      await newUser.save();
      // return the JWT
      const accessToken = await jwt.sign({userID: newUser._id},process.env.ACCESS_TOKEN_CERT_KEY)
       res.status(200).json({success: true, message: "Access token has been signed successfully.",accessToken})

    } catch (error) {
      console.log(error);
     res.status(500).json({success:false,message:"Internal server error"})
    }
  },
  authLogin: async (req, res) => {
    const {username,password} = req.body;
    if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password" });
      try {
        // check for user already
        const user = await User.findOne({ username: username });
        if(!user) return res.status(400).json({success:false, message:"Incorrect username or password"})
        // check password
        const passwordValid = await argon2.verify(user.password, password)
        if(!passwordValid) return res.status(400).json({success:false, message:"Incorrect Username or password"})
        const accessToken = await jwt.sign({userID: user._id},process.env.ACCESS_TOKEN_CERT_KEY)
        res.status(200).json({success: true, message: "Login in successfully.",accessToken})
      } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"Internal server error"})
      }
  }
};
module.exports = authCtrl;
