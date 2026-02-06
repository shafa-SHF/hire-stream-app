const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.updateProfile = async (req, res) => {
  const { bio, skills } = req.body;
  const userId = req.user.userId; // Taken from the Token

  try {
    const profile = await prisma.profile.upsert({
      where: { userId: userId },
      update: { bio, skills },
      create: { bio, skills, userId },
    });
    res.json({ message: "Profile updated!", profile });
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};