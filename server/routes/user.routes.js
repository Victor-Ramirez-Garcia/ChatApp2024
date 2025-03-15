// Import the functions of the "User" model
const UserController = require("../controller/user.controller");

// Exports anonymous function with argument "app", which is going
// to be set to the Express application.
module.exports = app =>
{
    // Defines a new route in Express application that handles
    // HTTP POST requests to the "/api/users/register" endpoint,
    // and executes the "UserController.register" callback function
    // whenever a POST request is made to that endpoint.
    app.post("/api/users/register", UserController.register);
    app.post("/api/users/login", UserController.login);
    app.post("/api/users/update", UserController.updateUserById);
    app.get("/api/users/logout", UserController.logout);
    app.get("/api/users/:user", UserController.getUser);
}