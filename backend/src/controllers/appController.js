const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.applyToJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.user.userId;

  try {
    const application = await prisma.application.create({
      data: {
        jobId: parseInt(jobId),
        userId: userId
      }
    });
    res.status(201).json({ message: "Application sent!", application });
  } catch (error) {
    res.status(400).json({ error: "You have already applied for this job." });
  }
};