const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all applications for the Dashboard
router.get('/', async (req, res) => {
  try {
    const apps = await prisma.application.findMany();
    res.json(apps);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch applications" });
  }
});

// POST a new application when 'Apply Now' is clicked
router.post('/', async (req, res) => {
  try {
    const { jobId, jobTitle, company } = req.body;
    const newApp = await prisma.application.create({
      data: { jobId, jobTitle, company }
    });
    res.status(201).json(newApp);
  } catch (error) {
    res.status(500).json({ error: "Could not save application" });
  }
});

module.exports = router;