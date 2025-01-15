const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./config/connectDB.js");

const  route  = require("./routes/userRoutes.js");
const cors = require("cors");
app.use(cors({
    credentials: true,
    origin:process.env.FRONTEND_URL
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(helmet({
    crossOriginResourcePolicy: false
}));


const PORT = 8080 || process.env.PORT;

app.get("/", (req, res, next) => {
    res.send("This is Home Page running on port : " + PORT).json({message: "This is Home Page"});
})

app.use("/api/user", route);


connectDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Server is running on Port : `,PORT);
})
});

