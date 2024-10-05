const express = require("express");
const Bin = require("../models/bin");
const router = express.Router();

// POST route to create a new bin
router.post("/createBin", async (req, res) => {
  const { location, binStatus, binType } = req.body;

  try {
    const bin = await Bin.create({ location, binStatus, binType });

    res.status(201).json({
      _id: bin._id,
      locations: bin.location,
      binStatus: bin.binStatus,
      binType: bin.binType,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error, please try again later" });
  }
});

router.get("/allBins", async (req, res) => {
  try {
    const bins = await Bin.find();
    res.status(200).json(bins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error, please try again later" });
  }
});

module.exports = router;
