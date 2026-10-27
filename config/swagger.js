const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "EduCore API",
    description: "EduCore Backend Documentation",
  },
  host: "localhost:8080",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";

const endpointsFiles = [
  "../routes/auth.js",
  "../routes/user.js",
  "../routes/progress.js",
  "../routes/cource.js",
  "../routes/lesson.js",
  "../routes/enroll.js",
  "../routes/assignment.js",
  "../routes/Submissions.js",
  "../routes/Enrollmentcode.js",
  "../routes/Dashboards.js"
];

swaggerAutogen(outputFile, endpointsFiles, doc);