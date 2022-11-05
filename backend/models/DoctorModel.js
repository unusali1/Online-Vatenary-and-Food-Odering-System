const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const doctorSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: [true, "Please Enter a name of a product"],
        trim: true,
        maxlength: [50, "product must be at least 20 characters"],
    },
    email:{
        type: 'string',
        required: [true, "Please Enter a email address"],
        validate: [validator.isEmail, "please enter a valid email"],
        unique: true,
    },
    password:{
        type: 'string',
        required: [true, "Please Enter a password"],
        minlength: [8, "Password must be at least 8 characters"],
        select: false,
    },
    degree: {
        type: 'string',
        required: [true, "Please Enter a description of a product"],
        maxlength: [50, "Description must be greater than 4000 characters"],
    },
    university: {
        type: 'string',
        required: [true, "Please Enter a price of a product"],
        maxlength: [10, "Price must be greater than 10 characters"],
    },
    registration: {
        type: 'string',
        maxlength: [250, "Discount must be greater than 7 characters"],

    },
    location: {
        type: 'string',
    },
    category: {
        type: 'string',
    },
    nationality:{
      type: "string",
      default: "Bangladeshi"
    },
    religion:{
        type: "string",
        default: "Islam"
    },

    avatar:{
        type: "string",
    },
    cloudinary_id :{
        type: "string",
    },
    role: {
        type: 'string',
        default: 'doctor',
    },
    price:{
        type: "number",
        default: "500"
    },
    stock: {
        type: "number",
        default: 3,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    resetPasswordToken: 'string',
    resetPasswordTime: Date,
    
});

//Hash password
doctorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

//jwt token
doctorSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_SECRET_EXPIRES
    });
};

//compare password
doctorSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//Forgot password
doctorSchema.methods.getResetToken = function () {
    // Generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //    hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordTime = Date.now() + 15 * 60 * 1000;

    return resetToken;
}; 

module.exports = mongoose.model("Doctor", doctorSchema);