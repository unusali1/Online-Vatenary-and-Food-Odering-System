const express = require('express');
const app = express();
const ErrorHandler = require("./middleware/error.js");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(express.json());
app.use(cookieParser());

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "backend/config/.env"
    })
}

//route import
const product = require("./routes/ProductRoute");
const medicine = require("./routes/MedicineRoute");
const user = require("./routes/UserRoute");
const doctor = require("./routes/DoctorRoute");
const order = require("./routes/OrderRoute");
const medicineorder = require("./routes/MedicineOrderRoute");
const payment = require("./routes/PaymentRoute");
const cart = require("./routes/CartRoute");
const appointment = require("./routes/GetAppointmentRoute");

app.use("/api/v2", product);
app.use("/api/v2", medicine);
app.use("/api/v2", user);
app.use("/api/v2", doctor)
app.use("/api/v2", cart);
app.use("/api/v2", order);
app.use("/api/v2", appointment);
app.use("/api/v2", payment);
app.use("/api/v2", medicineorder);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
})


app.use(ErrorHandler);


module.exports = app;