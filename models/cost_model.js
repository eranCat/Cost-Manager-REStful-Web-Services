const mongoose = require('mongoose');

const costSchema = new mongoose.Schema({
    description: { type: String, required: true },
    category: { type: String, required: true },
    userid: { type: String, required: true, ref: 'User' },
    sum: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cost', costSchema);
