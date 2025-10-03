const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const UserModel = require("../models/userModel");
const config = require("../config/config");
const { passwordResetEmail } = require("../utils/emailTemplates");

const JWT_SECRET = config.jwtSecret;
const DASHBOARD_URL = config.dashboardUrl;

// SIGN UP
const signup = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      password,
      role 
    } = req.body;

    // Check required fields
    if ( !email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    // Check if user already exists
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) return res.status(400).json({ error: "Email already in use" });


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Default avatar URL
    const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

    // Create user with pending status
    const [newUser] = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role: role || "contributor",
      avatar_url: defaultAvatar,
      status: "pending"
    });

    res.status(201).json({ 
      message: "Registration request submitted successfully", 
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
        avatar_url: newUser.avatar_url
      }
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Failed to sign up" });
  }
};


// LOGIN
// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  }
});

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Forgot password request for email:", email, config.dashboardUrl);

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Find user by email
    const user = await UserModel.findByEmail(email);
    if (!user) {
      // For security reasons, still return success even if email doesn't exist
      return res.status(200).json({ message: "If an account exists with this email, you will receive password reset instructions." });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiryTime = new Date(Date.now() + 3600000); // Token expires in 1 hour

    // Save reset token and expiry to database
    await UserModel.setResetToken(email, resetToken, expiryTime);

    // Create reset URL
    const resetUrl = `${DASHBOARD_URL}/auth/reset-password/${resetToken}`;

    // Send email with the template
    const mailOptions = {
      from: `"Africa Access Water" <${config.email.user}>`,
      to: email,
      subject: 'Reset Your AfAW Password',
      html: passwordResetEmail(user.name, resetUrl)
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      message: "If an account exists with this email, you will receive password reset instructions." 
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ 
      error: "An error occurred while processing your request" 
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: "Token and password are required" });
    }

    // Password validation on server side as well
    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }

    if (password.length > 50) {
      return res.status(400).json({ error: "Password cannot be longer than 50 characters" });
    }

    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({ error: "Password must contain at least one uppercase letter" });
    }

    if (!/[a-z]/.test(password)) {
      return res.status(400).json({ error: "Password must contain at least one lowercase letter" });
    }

    if (!/[0-9]/.test(password)) {
      return res.status(400).json({ error: "Password must contain at least one number" });
    }

    if (!/[!@#$%^&*]/.test(password)) {
      return res.status(400).json({ error: "Password must contain at least one special character (!@#$%^&*)" });
    }

    // Find user by reset token and check if token is expired
    const user = await UserModel.findByResetToken(token);
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password and clear reset token
    try {
      const [updatedUser] = await UserModel.update(user.id, {
        password: hashedPassword,
        reset_token: null,
        reset_token_expires: null
      });

      if (!updatedUser) {
        throw new Error("Failed to update user");
      }

      res.status(200).json({ message: "Password has been reset successfully" });
    } catch (updateError) {
      console.error('Password update error:', updateError);
      return res.status(500).json({ error: "Failed to update password" });
    }
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: "An error occurred while resetting your password" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findByEmail(email);
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: "Invalid email or password" });

    // Check if user's registration request is still pending
    if (user.status === "pending") {
      return res.status(403).json({ error: "Your registration request is still pending approval" });
    }

    // Check if user's registration request was rejected
    if (user.status === "rejected") {
      return res.status(403).json({ error: "Your registration request has been rejected" });
    }

    // generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Login successful", token , 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar_url: user.avatar_url
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Failed to log in" });
  }
};

// GET PROFILE (protected route)
const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// GET PENDING USERS (admin only)
const getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await UserModel.findPendingUsers();
    res.json({ 
      message: "Pending users fetched successfully",
      users: pendingUsers 
    });
  } catch (err) {
    console.error("Get pending users error:", err);
    res.status(500).json({ error: "Failed to fetch pending users" });
  }
};

// APPROVE USER (admin only)
const approveUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Check if user exists and is pending
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    if (user.status !== "pending") {
      return res.status(400).json({ error: "User is not in pending status" });
    }

    // Update user status to accepted
    const [updatedUser] = await UserModel.updateUserStatus(userId, "accepted");
    
    res.json({ 
      message: "User approved successfully",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        status: updatedUser.status
      }
    });
  } catch (err) {
    console.error("Approve user error:", err);
    res.status(500).json({ error: "Failed to approve user" });
  }
};

// REJECT USER (admin only)
const rejectUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Check if user exists and is pending
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    if (user.status !== "pending") {
      return res.status(400).json({ error: "User is not in pending status" });
    }

    // Update user status to rejected
    const [updatedUser] = await UserModel.updateUserStatus(userId, "rejected");
    
    res.json({ 
      message: "User rejected successfully",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        status: updatedUser.status
      }
    });
  } catch (err) {
    console.error("Reject user error:", err);
    res.status(500).json({ error: "Failed to reject user" });
  }
};

module.exports = { 
  signup, 
  login, 
  getProfile, 
  getPendingUsers, 
  approveUser, 
  rejectUser,
  forgotPassword,
  resetPassword 
};
