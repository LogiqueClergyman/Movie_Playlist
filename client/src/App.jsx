import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Signup from './pages/Signup';
import MovieList from './pages/MovieList';
import PublicLists from './pages/PublicList';
import AuthService from './services/authService';
import List from './pages/List';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Router>
      <div className="bg-gradient-to-tr from-violet-500 to-orange-300 min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/lists/:id"
            element={<PrivateRoute><MovieList /></PrivateRoute>}
          />
          <Route path="/public-lists" element={<PrivateRoute><PublicLists /></PrivateRoute>}/>
          <Route path = "/list/:id" element={<PrivateRoute><List /></PrivateRoute>}/>
          <Route path="/lists" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
};

const PrivateRoute = ({ children }) => {
  const isAuthenticated = AuthService.getCurrentUser() !== null;

  return isAuthenticated ? children : <Navigate to="/login" />;
};


export default App;
