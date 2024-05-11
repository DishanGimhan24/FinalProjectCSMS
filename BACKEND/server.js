// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {

    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
    //useFindAndModify: false
});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB Connection Success!");
});

const inventoryRouter = require("./routes/inventory.js");
const checkoutRouter = require("./routes/checkoutItem.js"); // Import checkout router

// Use inventoryRouter and checkoutRouter
app.use('/inventory', inventoryRouter);
app.use('/checkout', checkoutRouter); // Use checkoutRouter here

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});

const systemuserRouter = require("./routes/systemusers.js");
const inquiryRouter = require("./routes/inquiries.js");

http://localhost:8070/inquiry

app.use("/inquiry",inquiryRouter);
const paymentdetailsRouter = require("./routes/paymentdetails");
app.use("/paymentdetails",paymentdetailsRouter);

app.use("/systemusers",systemuserRouter);

const salaryRouter = require("./routes/salary.js");

app.use("/salary",salaryRouter);



app.listen(PORT, () => {

    console.log(`Server is up and running on port number : ${PORT}`)
})




