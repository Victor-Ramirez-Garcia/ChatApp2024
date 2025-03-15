// Import 'mongoose' module from node_modules
const mongoose = require("mongoose");

// Creates a new schema
const UserSchema = new mongoose.Schema(
    {
        firstName:
        {
            type: String,
            required: [true, "This field is required"]
        },
        lastName:
        {
            type: String,
            required: [true, "This field is required"]
        },
        email:
        {
            type: String,
            required: [true, "This field is required"],
            validate:
            {
                validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email"
            },
            unique: true,
        },
        password:
        {
            type: String,
            required: [true, "This field is required"]
        }
    }
)

// Create "confirmPassword" property with a getter and setter function
UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

// Validates "password" and "confirmPassword" match
// Sets pre-validation hook such that it validates
// "password" and "confirmPassword" before the document is validated.
// Then, continue with the next pre-validation hook.
UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', '"Confirm Password" must match "Password"');
    }
    next();
});

// Compile and Export new model called "User" for schema "UserSchema"
// (Structure like this is required)
const User = mongoose.model('User', UserSchema);
module.exports = User; // Export User model