const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new job
exports.createJob = async (req, res) => {
  const { title, description, company, location, salary, category } = req.body;
  
  // This 'userId' comes from your authMiddleware!
  const userId = req.user.userId; 

  try {
    const newJob = await prisma.job.create({
      data: { 
        title, 
        description, 
        company, 
        location, 
        salary, 
        category,
        postedBy: userId // Connects the job to the logged-in user
      },
    });
    res.status(201).json({ message: "Job posted successfully!", job: newJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create job. Make sure you are logged in." });
  }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        user: {
          select: { name: true, email: true } // Only show name and email, hide password!
        }
      }
    });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch jobs" });
  }
};
// Delete a job
exports.deleteJob = async (req, res) => {
  const { id } = req.params; // Get the ID from the URL
  try {
    await prisma.job.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "Job deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete job. It might not exist." });
  }
};

// Update an existing job
exports.updateJob = async (req, res) => {
  const { id } = req.params; // The ID of the job from the URL
  const { title, description, company, location, salary } = req.body;

  try {
    const updatedJob = await prisma.job.update({
      where: { id: parseInt(id) },
      data: { title, description, company, location, salary },
    });
    res.json({ message: "Job updated successfully!", updatedJob });
  } catch (error) {
    res.status(500).json({ error: "Failed to update job. Make sure the ID is correct." });
  }
};

// Get jobs posted only by the logged-in user
exports.getMyJobs = async (req, res) => {
  const userId = req.user.userId; // Grab the ID from the token

  try {
    const myJobs = await prisma.job.findMany({
      where: {
        postedBy: userId,
      },
      orderBy: {
        createdAt: 'desc', // Show the newest ones first
      },
    });
    res.json(myJobs);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch your jobs." });
  }
};
// Get all applicants for jobs posted by the recruiter
exports.getJobApplicants = async (req, res) => {
  const userId = req.user.userId;

  try {
    const jobsWithApplicants = await prisma.job.findMany({
      where: { postedBy: userId },
      include: {
        applications: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                profile: true // This shows their bio and skills!
              }
            }
          }
        }
      }
    });
    res.json(jobsWithApplicants);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch applicants." });
  }
};