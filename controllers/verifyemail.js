const user = require("../models/user")
const bcrypt=require("bcrypt")
const sendEmail=require("../email")
const nodemailer=require("nodemailer")
const verifyemail=async(req,res)=>{
// try{
  const{email,otp}=req.body
const emailcheck= await user.findOne({email:email})
   if(!emailcheck){
    return res.status(400).json({status:"fail",msg:"this email wrong "})
    }
const otpcheck= await bcrypt.compare(otp,emailcheck.otp)
   if(!otpcheck || Date.now() > emailcheck.expiredAt){
    return res.status(400).json({status:"fail",msg:" this otp wrong or expired "})
    }
emailcheck.isVerified=true
emailcheck.expiredAt=null
emailcheck.otp=null
await emailcheck.save() 
await sendEmail({
to: email,
subject: "Verify Your Account",
html: `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h2>Welcome, ${emailcheck.userName} 👋</h2>
    <p> YOUR ACCOUNT IS VERIFIED SUCCESSFULLY</p>
    <p>Thank you for choosing EDUSITE.</p>
  </div>
`
}); 

res.status(200).json({status:"succcess",msg:" your account is verified successfully"}) 

 }
// catch(error){
// res.status(500).json({status:"error",msg:"error 404"}) 
// }
// }
const resetpassword=async(req,res)=>{
try{
  const{email,otp,newpassword}=req.body
const emailcheck= await user.findOne({email:email})
   if(!emailcheck){
    return res.status(400).json({status:"fail",msg:"this email wrong "})
    }
const otpcheck=  await bcrypt.compare(otp,emailcheck.resetpasswordotp)
   if(!otpcheck || Date.now() > emailcheck.expiredAt2){
    return res.status(400).json({status:"fail",msg:" this otp wrong or expired "})
    }
const hashpassword=await bcrypt.hash(newpassword,10)
emailcheck.password=hashpassword
emailcheck.resetpasswordotp=null
emailcheck.expiredAt2=null
await emailcheck.save()
await sendEmail({
to: email,
subject: "reset your password",
html: `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h2>Welcome, ${emailcheck.userName} 👋</h2>
    <p> YOUR PASSWORD IS CHANGED SUCCESSFULLY</p>
    <p>Thank you for choosing EDUSITE.</p>
  </div>
`
});  
res.status(200).json({status:"succcess",msg:" YOUR PASSWORD IS CHANGED SUCCESSFULLY"})  }
catch(error){
res.status(500).json({status:"error",msg:"error 404"}) }
}


module.exports={verifyemail,resetpassword}


// const resendVerificationCode = async (req, res) => {
// try {

//     const { email } = req.body;

//     const emailcheck = await user.findOne({ email });

//     if (!emailcheck) {
//         return res.status(400).json({
//             status: "fail",
//             msg: "This email does not exist"
//         });
//     }

//     if (emailcheck.isVerified) {
//         return res.status(400).json({
//             status: "fail",
//             msg: "This account is already verified"
//         });
//     }

//     const otp = crypto.randomInt(100000, 999999).toString();

//     const hashOtp = await bcrypt.hash(otp, 10);

//     emailcheck.otp = hashOtp;
//     emailcheck.expiredAt = Date.now() + 5 * 60 * 1000;

//     await emailcheck.save();

//     await sendEmail({
//         to: emailcheck.email,
//         subject: "Verify Your Account",
//         html: `
//         <div style="font-family: Arial, sans-serif; padding:20px;">
//             <h2>Hello ${emailcheck.userName} 👋</h2>

//             <p>Your new verification code is:</p>

//             <h1>${otp}</h1>

//             <p>This code will expire in 5 minutes.</p>

//             <p>Thank you for choosing EDUSITE.</p>
//         </div>
//         `
//     });

//     return res.status(200).json({
//         status: "success",
//         msg: "A new verification code has been sent."
//     });

// } catch (error) {
//     return res.status(500).json({
//         status: "error",
//         msg: "Internal Server Error"
//     });
// }
// }