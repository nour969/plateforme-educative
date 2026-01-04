const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Inscription
router.post('/register', async (req, res) => {
  console.log('Requête inscription reçue :', req.body); // Log pour voir les données

  try {
    const { nom, prenom, email, password, role } = req.body;

    if (!nom || !prenom || !email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    const user = await User.create({
      nom,
      prenom,
      email,
      password,
      role: role || 'etudiant'
    });

    const token = jwt.sign({ id: user._id, role: user.role }, 'secretjwtkey123', { expiresIn: '30d' });

    res.status(201).json({
      message: 'Inscription réussie !',
      token,
      user: { id: user._id, nom: user.nom, prenom: user.prenom, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Erreur inscription :', err.message);
    res.status(500).json({ message: 'Erreur serveur : ' + err.message });
  }
});

// Connexion (simplifiée)
router.post('/login', async (req, res) => {
  console.log('Requête connexion reçue :', req.body);

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, 'secretjwtkey123', { expiresIn: '30d' });

    res.json({
      message: 'Connexion réussie !',
      token,
      user: { id: user._id, nom: user.nom, prenom: user.prenom, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Erreur connexion :', err.message);
    res.status(500).json({ message: 'Erreur serveur : ' + err.message });
  }
});

module.exports = router;