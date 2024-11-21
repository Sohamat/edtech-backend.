const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Import the Message model
const Message = require('./message'); // Adjust the path as needed

// Define the PersonalChat schema
const personalChatSchema = new Schema({
  roomName: { type: String, required: true },
  users :  [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
});

// Create the PersonalChat model
const PersonalChat = mongoose.model('PersonalChat', personalChatSchema);

module.exports = PersonalChat;
