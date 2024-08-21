const jwt = require("jsonwebtoken");
const MY_SECRET = require("../config");
// instead of database i'll store user in object
const Users = {};

// Service Function for adding user

function SignupService(email, name, role) {
  if (Users[email]) {
    return { status: 400, message: "User with this mail already exists!" };
  }
  Users[email] = { name, role };
  return { status: 200, message: "User Signup Success!!" };
}

function LoginService(email) {
  if (Users[email]) {
    const user = Users[email];
    // Create a payload for the JWT
    const payload = {
      email: email,
      name: user.name,
      role: user.role,
    };

    // Generating a JWT token which will help us in further authentication of user on the client side.
    // With expiry of 1 hour
    const token = jwt.sign(payload, MY_SECRET, { expiresIn: "1h" });

    return {
      status: 200,
      message: `Welcome back, ${user.name}`,
      token: token,
    };
  }

  return "User not found";
}

// Function for getting all the user list
function UserListService() {
  // Convert Users object to an array of user data
  const userList = Object.keys(Users).map((email) => ({
    email: email,
    name: Users[email].name,
    role: Users[email].role,
  }));

  return { status: 200, users: userList };
}

module.exports = {
  SignupService,
  LoginService,
  UserListService,
};
