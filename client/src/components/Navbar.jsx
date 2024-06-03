import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    AuthService.getCurrentUser() ? (
    <nav className="bg-violet-950 z-50 relative top-0 text-white p-4 flex justify-between items-center shadow-lg">
      <div className="flex text-xl items-center space-x-4">
        <Link to="/home" className="hover:text-gray-400">Home</Link>
        <Link to="/public-lists" className="hover:text-gray-400">Global</Link>
        <Link to="/profile" className="hover:text-gray-400">Profile</Link>
      </div>
      <div>
        {AuthService.getCurrentUser() ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-200"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-200"
          >
            Login
          </Link>
        )}
      </div>
    </nav>) : (<nav className="bg-violet-950 text-white p-4 flex justify-between items-center shadow-lg"></nav>)
  );
};

export default Navbar;
