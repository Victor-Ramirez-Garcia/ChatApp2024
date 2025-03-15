// Import 'User' model module from user.model
const User = require("../model/user.model");
// Import 'jsonwebtoken' module from node_modules
const jwt = require('jsonwebtoken');

// Export "register" function that creates a
// new User document and stores it in "users"
module.exports.register = (req, res) =>
{
    // Creates new instance of "User" model for the new user object
    // and saves it to the database. Then, creates a new cookie called
    // "userCookie", containing a JWT with the user's unique identifier
    // as the payload (claims/data) and the JWT signed (verification that
    // data has not been tampered with) using a secret key stored in .env.
    // Afterwards, sends a JSON response back to the client containing
    // a message and the user object. If an error occurs, send the server
    // a status 400 with JSON error response.
    try {
        User.create(req.body) 
        .then((user) =>
        {
            res.cookie("userCookie",
                        jwt.sign({_id: user._id},
                                process.env.SECRET_KEY))
            .status(201) // Created
            .json({msg: "User Registered", user: user});
        })
        .catch(err =>
        {
            if (err.code === 11000)
                res.status(409).json(err); // Conflict
            else
                res.status(400).json(err); // Bad Request
        })
    } catch (err) {
        res.status(500).json(err); // Internal Server Error
    }
}

module.exports.login = async(req, res) =>
{
    try {
        // Error object
        const err = {
            emailEmpty: false,
            passwordEmpty: false,
            passwordMatches: true,
        }

        // Return error if email or password are empty
        if ((req.body.email === "") || (req.body.password === ""))
        {
            if (req.body.email === "")
                err.emailEmpty = true;
            if (req.body.password === "")
                err.passwordEmpty = true;

            err.passwordMatches = false;

            return res.status(400).json(err); // Bad Request
        }

        // Find user in database
        const user = await User.findOne({ email: req.body.email });

        // Return error if user does not exist
        if (user === null) {
            err.passwordMatches = false;
            return res.status(404).json(err); // Not Found
        }

        // Return error if password does not match
        if (user.password !== req.body.password)
        {
            err.passwordMatches = false;
            return res.status(400).json(err); // Bad Request
        }

        // Send user object to client
        res.cookie("userCookie", jwt.sign({_id: user._id}, process.env.SECRET_KEY)).json({ user: user });
    } catch(err) {
        res.status(500).json(err); // Internal Server Error
    }
}

module.exports.logout = (req, res) => {
    try {
        res.clearCookie("userCookie");
        res.sendStatus(200); // OK
    } catch(err) {
        res.status(500).json(err); // Internal Server Error
    }
}

// Retrieved the user specified in req.params.user
module.exports.getUser = (req, res) =>
{
    try {
        User.find({_id: req.params.user})
        .then((user) => {
            res.status(200).json({msg: "User Retrieved", user: user}); // OK
        })
    } catch(err) {
        res.status(500).json(err); // Internal Server Error
    }
}

// Update the user by id
module.exports.updateUserById = (req, res) =>
{
    try {
        const toUpdate = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        };

        const errors = {
            firstNameEmpty: false,
            lastNameEmpty: false,
        }

        if (req.body.firstName === "")
            errors.firstNameEmpty = true;

        if (req.body.lastName === "")
            errors.lastNameEmpty = true;

        if (errors.firstNameEmpty || errors.lastNameEmpty)
            return res.status(400).json(errors);

        User.findByIdAndUpdate(req.body.user, toUpdate, { new: true, })
        .then((user) =>
        {
            res.status(200).json({msg: "User Registered", user: user}); // OK
        })
    } catch(err) {
        res.status(500).json(err); // Internal Server Error
    }
}