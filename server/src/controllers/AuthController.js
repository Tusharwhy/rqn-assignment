const AuthService = require("../services/AuthService");

//Controller function for handling signup

async function SignupController(req, res) {
  try {
    const { email, name, role } = req.body;

    const result = AuthService.SignupService(email, name, role);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

// Login Controller
async function LoginController(req, res) {
  try {
    const { email } = req.body;

    // Call the service
    const result = AuthService.LoginService(email);
    console.log(result);
    // Send response based on service result
    if (result.token) {
      res.setHeader("Authorization", `Bearer ${result.token}`);
    }
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    // Handle unexpected errors
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

// list user controller
async function UserListController(req, res) {
  try {
    const result = AuthService.UserListService();

    res.status(result.status).json({ users: result.users });
  } catch (error) {
    // Handle unexpected errors
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

module.exports = {
  SignupController,
  LoginController,
  UserListController,
};
