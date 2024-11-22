const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Message schema
const messageSchema = new Schema({
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  text: { type: String, required: true }
});

// Create the Message model
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
