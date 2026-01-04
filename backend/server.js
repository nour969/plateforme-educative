const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connecté à MongoDB Atlas 🚀'))
  .catch((err) => console.log('Erreur connexion MongoDB :', err));
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Autorise TOUT pour le développement local
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
// Route de test
app.get('/', (req, res) => {
  res.send('<h1>Backend de la plateforme éducative OK ! 🚀</h1>');
});

// Socket.io pour le chat temps réel
io.on('connection', (socket) => {
  console.log('Un utilisateur connecté au chat:', socket.id);

  socket.on('join_cours', (coursId) => {
    socket.join(coursId);
    console.log(`Utilisateur ${socket.id} a rejoint le cours ${coursId}`);
  });

  socket.on('send_message', (data) => {
    io.to(data.coursId).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('Utilisateur déconnecté');
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Serveur backend lancé sur http://localhost:${PORT}`);
});
