const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT

const prisma = new PrismaClient();

// --- REGISTER (Sign Up) ---
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create the user in Neon/Postgres
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({ 
      message: "User created successfully!", 
      userId: user.id 
    });
  } catch (error) {
    res.status(400).json({ error: "Email already exists or data is invalid" });
  }
};

// --- LOGIN ---
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1. Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });

    // 2. Check if user exists and password is correct
    if (user && (await bcrypt.compare(password, user.password))) {
      
      // 3. Generate a JWT Token
      const token = jwt.sign(
        { userId: user.id }, 
        'my_super_secret_key', 
        { expiresIn: '24h' }
      );

      res.json({
        message: "Login successful!",
        token: token, // This is the "key" the frontend will store
        user: { id: user.id, name: user.name, email: user.email }
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong during login" });
  }
};