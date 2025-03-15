// Import "jsonwebtoke" module from node_modules
const jwt = require("jsonwebtoken");

// Export "authenticate" function, using the "req" argument
// for processing the data, "res" argument for responding
// to the process of the data, and the next set of data.
module.exports.authenticate = (req, res, next) =>
{
    // Verifies JWT that is stored in the "userCookie" cookie
    // from the HTTP request by using the secret key. Afterwards,
    // executes an anonymous callback function that responds with
    // a 401 status and a JSON object indicating that verification
    // failed if there was an error, or goes to the next HTTP
    // request if no error has occured.
    jwt.verify(req.cookies.userCookie,
                process.env.SECRET_KEY,
                (err, payload) =>
                {
                    if (err)
                    {
                        res.status(401).json({verified: false});
                    } else
                    {
                        next();
                    }
                })
}