import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login'); // Retour à la connexion après déconnexion
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 text-center">
        <h1>Tableau de Bord</h1>
        <p className="lead">Bienvenue sur votre plateforme éducative !</p>
        <hr />
        <p>Vous êtes connecté avec l'email : <strong>{auth.currentUser?.email}</strong></p>
        <button className="btn btn-danger mt-3" onClick={handleLogout}>
          Se déconnecter
        </button>
      </div>
    </div>
  );
}

export default Dashboard;