const mongoose = require('mongoose');
require('dotenv').config();
const Rank = require('../models/Rank');

async function fixRanks() {
  await mongoose.connect(process.env.MONGODB_URI);
  const ranks = await Rank.find({
    $or: [
      { minRank: { $lt: 0 } },
      { maxRank: { $lt: 0 } },
      { avgRank: { $lt: 0 } }
    ]
  });
  console.log('Found negative ranks:', ranks.length);
  for (const r of ranks) {
    r.minRank = Math.abs(r.minRank);
    r.maxRank = Math.abs(r.maxRank);
    r.avgRank = Math.abs(r.avgRank);
    await r.save();
  }
  console.log('Fixed negative ranks.');
  process.exit(0);
}

fixRanks().catch(err => {
  console.error(err);
  process.exit(1);
});
