const dotenv = require("dotenv");
dotenv.config();
const express= require("express")
const mongoose=require("mongoose")
const helmet=require("helmet")
const cors=require("cors")
const hpp=require("hpp")
// const swaggerUi = require("swagger-ui-express");
// const swaggerFile = require("./config/swagger-output.json");

const app =express()
app.use(helmet())
app.use(hpp())
app.use(cors({
     origin: "http://localhost:5173"
}))
app.use(express.json())

mongoose.connect(process.env.DATABASE).then(
    console.log("DATA BASE CONNECT SUCCESSFULLY")
)
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const userroutes= require('./routes/user')
const authroutes= require('./routes/auth')
const courceroutes= require('./routes/cource')
const lessonroutes= require('./routes/lesson')
const assignmentroutes=require('./routes/assignment')
const dashboardsroutes=require('./routes/Dashboards')
const enrolleroutes =require('./routes/enroll')
const progressroutes=require('./routes/progress')
const Submissionroutes=require('./routes/Submissions')
const codesroutes=require('./routes/Enrollmentcode')



app.use('/api/cource',courceroutes) 
app.use('/api/users',userroutes)
app.use('/api/lesson',lessonroutes) 
app.use('/api/auth',authroutes) 
app.use('/api/assignment',assignmentroutes) 
app.use('/api/dashboard',dashboardsroutes) 
app.use('/api/enrollments',enrolleroutes) 
app.use('/api/progress',progressroutes) 
app.use('/api/submission',Submissionroutes) 
app.use('/api/codes',codesroutes) 
// app.use(
//     "/api/docs",
//     swaggerUi.serve,
//     swaggerUi.setup(swaggerFile)
// );


app.listen(process.env.PORT,()=>{
        console.log("PORT RUN SUCCESSFULLY")
})