import { useState } from 'react';
import { auth, db } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Connexion avec Firebase
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Connexion réussie !');
      
      // Redirection vers le dashboard après 1 seconde
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setMessage('Erreur : Identifiants invalides ou ' + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h3>Connexion</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Mot de passe</label>
                  <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Se connecter</button>
              </form>
              {message && <div className="alert alert-info mt-3">{message}</div>}
              <p className="text-center mt-3">
                Pas de compte ? <a href="/register">S'inscrire</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;