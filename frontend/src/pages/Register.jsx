import { useState } from 'react';
// On remplace axios par les outils Firebase
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function Register() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('etudiant');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // 1. Inscription du compte dans Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Enregistrement du profil (nom, rôle) dans la base de données Firestore
      await setDoc(doc(db, "users", user.uid), {
        nom,
        prenom,
        email,
        role,
        createdAt: new Date()
      });

      setMessage(`Inscription réussie ! Bienvenue ${prenom} (${role})`);
      
    } catch (err) {
      // Firebase donne des erreurs précises (ex: mot de passe trop court)
      setMessage('Erreur : ' + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Inscription à la Plateforme Éducative</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              <h3 className="text-center">Inscription (Firebase)</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label className="form-label">Nom</label>
                  <input type="text" className="form-control" value={nom} onChange={(e) => setNom(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Prénom</label>
                  <input type="text" className="form-control" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Mot de passe</label>
                  <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Rôle</label>
                  <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="etudiant">Étudiant</option>
                    <option value="enseignant">Enseignant</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-success w-100">S'inscrire</button>
              </form>
              {message && <div className="alert alert-info mt-3">{message}</div>}
              <p className="text-center mt-3">
                Déjà un compte ? <a href="/login">Se connecter</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;