const socketIO = require("socket.io");

// Socket.IO connection and event handling
const socketConnection = (server) => {
    const io = socketIO(8900, {
        cors: {
            origin: "http://localhost:8080"
        }
    });

    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        // Handle Socket.IO events specific to your requirements
        // For example:
        socket.on("notification", (data) => {
            console.log("Received notification:", data);
            // Process the notification and emit events as needed
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
            // Clean up any related data or connections
        });
    });
};

// Emit event to a specific user by socket ID
const emitToUser = (userId, event, data) => {
    // Find the socket associated with the userId
    const socket = io.sockets.sockets.find((s) => s.handshake.auth.userId === userId);

    if (socket) {
        socket.emit(event, data);
    }
};

module.exports = { socketConnection, emitToUser };
