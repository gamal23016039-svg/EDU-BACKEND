const EnrollmentCode = require("../models/EnrollmentCode");
const Enrollments = require("../models/enrolle");

function generateCode(length = 8) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}
const generateEnrollmentCodes = async (req, res) => {
    // try {
        const { teacherId, courceId, numberOfCodes, price } = req.body;
        const codes = [];
if (!teacherId || !courceId || !numberOfCodes) {
    return res.status(400).json({
        status: "fail",
        msg: "All fields are required"
    });}
        for (let i = 0; i < numberOfCodes; i++) {
            let code = generateCode();
            while (await EnrollmentCode.findOne({ code })) {
                code = generateCode();
            }
            codes.push({
                code,
                teacherId,
                courceId,
                price
            });
        }

        await EnrollmentCode.insertMany(codes);

        res.status(201).json({
            status: "success",
            msg: `${numberOfCodes} codes generated successfully`,
            data: codes
        });

    // }} catch (error) {

    //     res.status(500).json({
    //         status: "error",
    //         msg: error.message
    //     });

    // }
}
const redeemCode=async(req,res)=>{
      const studentId=req.user.id
    const{code}=req.body
    if (!code) {
    return res.status(400).json({
        status: "fail",
        msg: "Code is required"
    });
}
    const enrollmentcode=await EnrollmentCode.findOne({code})
    if(!enrollmentcode){
         return res.status(400).json({
        status: "fail",
        msg: "this code not found "
    });  
    }
      if(enrollmentcode.isUsed){
         return res.status(400).json({
        status: "fail",
        msg: "this code used before  "
    });  
    }
const enrolle=await Enrollments.findOne({studentId,courceId:enrollmentcode.courceId})
if(enrolle){
      return res.status(400).json({
        status: "fail",
        msg: "You are already enrolled in this course"
    });
}
const newenrolle= new Enrollments({
    studentId,courceId:enrollmentcode.courceId,paymentStatus:"paid"
})
await newenrolle.save()
enrollmentcode.isUsed=true
enrollmentcode.usedBy=studentId
await enrollmentcode.save();
    return res.status(200).json({
        status: "success",
       msg: "Course activated successfully"
    });

}
module.exports={generateEnrollmentCodes,redeemCode}