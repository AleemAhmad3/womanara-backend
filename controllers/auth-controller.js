

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // FIXED LOGIN CREDENTIALS
    const FIXED_EMAIL = "admin@gmail.com";
    const FIXED_PASSWORD = "qwerty";

    // Check credentials
    if (email !== FIXED_EMAIL || password !== FIXED_PASSWORD) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // DUMMY TOKEN (you can make any random string)
    const dummyToken = "dummy_token_1234567890";

    return res.status(200).json({
      message: "Login successful",
      token: dummyToken
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login };