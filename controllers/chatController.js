// Import the necessary models
const PersonalChat = require('../models/personalChat');
const Message = require('../models/message');

// Function to save message to the database
exports.saveMessageToDataBase = async (messageText, userId , roomName) => {
    try {
        
console.log("saving message");
console.log("fields are " , messageText , userId , roomName);

        
        // Find the chat room between the two users
        let chatRoom = await PersonalChat.findOne({roomName});

        if (!chatRoom) {
            // If the chat room doesn't exist, create a new one
            return false
        }


        if (!chatRoom.users.includes(userId)) {
            // If the user is not already in the chatRoom, add the userId
            chatRoom.users.push(userId);
        }
        // Create a new message
        const message = new Message({ user: userId, text: messageText });
        await message.save();

        // Add the message to the chat room's messages array
        chatRoom.messages.push(message._id);

        // Implement FIFO: if there are more than 20 messages, remove the oldest one
        if (chatRoom.messages.length > 20) {
            chatRoom.messages.shift(); // Removes the first message (oldest)
        }

        // Save the updated chat room
        await chatRoom.save();

        console.log("Message saved successfully");
        return true;
    } catch (error) {
        console.error("Error saving message to the database:", error);
    }
};



// Function to get messages by room
exports.getMessagesByRoom = async (req, res) => {
    try {
        const { roomName } = req.params;

        // Find the chat room by roomName and populate the messages with userId, firstName, and lastName
        const chatRoom = await PersonalChat.findOne({ roomName })
            .populate({
                path: 'messages',
                populate: {
                    path: 'user',  // assuming 'user' is a reference to the User model
                    select: 'name'  // Select the fields you want to populate
                }
            });

        if (!chatRoom) {
            return res.status(404).json({ success: false, message: "Chat room not found" });
        }

        console.log("messages ", chatRoom.messages);

        // Return the populated messages
        return res.status(200).json({ success: true, messages: chatRoom.messages });
    } catch (error) {
        console.error("Error retrieving messages:", error);
        return res.status(500).json({ success: false, message: "An error occurred while retrieving messages" });
    }
};


exports.createRoom = async (req, res) => {
    try {

        const { roomName, userId} = req.body;

        // Create a new PersonalChat instance
        const newRoom = new PersonalChat({
            roomName,
            users : [userId],
            messages: [] // Initialize messages as an empty array
        });

        // Save the new room to the database
        const savedRoom = await newRoom.save();

        // Respond with success
        res.status(201).json({ success: true, room: savedRoom });
    } catch (error) {
        console.error("Error creating room:", error);
        res.status(500).json({ success: false, message: "An error occurred while creating the room" });
    }
};
exports.NotifyUser = async (userId , value , roomName)=>{
    const chatRoom = await PersonalChat.findOne({roomName})
    if(chatRoom){
        if(chatRoom.user1.toString() === userId){
            chatRoom.notify1 = value
        }
        else if (chatRoom.user2.toString() === userId ){
            chatRoom.notify2 = value
        }
        await chatRoom.save()
    }
}


exports.getRoomNames = async (req, res) => {
    const { userId } = req.body;

    console.log("Received request to get room names and other users for userId:", userId);

    try {
        // Find all PersonalChats involving the given user
        const chats= await PersonalChat.find().select('roomName');

        console.log("Found chats:", chats);

        res.status(201).json({
            message: "Successfully retrieved data",
            chats
        });
    } catch (error) {
        console.error('Error retrieving room names and other users:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getRoomNames = async (req, res) => {
    const { userId } = req.body;

    console.log("Received request to get room names and other users for userId:", userId);

    try {
        // Find all PersonalChats involving the given user
        const chats= await PersonalChat.find().select('roomName');
        console.log("Found chats:", chats);
        res.status(201).json({
            message: "Successfully retrieved data",
            chats
        });
    } catch (error) {
        console.error('Error retrieving room names and other users:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};