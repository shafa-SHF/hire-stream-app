const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// This function pulls the 2 jobs you just seeded
router.get('/', async (req, res) => {
  try {
    const { title, location } = req.query; // Get search terms from the URL
    
    const jobs = await prisma.job.findMany({
      where: {
        AND: [
          { title: { contains: title || '', mode: 'insensitive' } },
          { location: { contains: location || '', mode: 'insensitive' } }
        ]
      }
    });
    
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;