import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
// import Header from './components/Header';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';



function App() {
  const isAuthenticated = !!localStorage.getItem('adminAuth');
  return (
    <Router>
        <div className="min-h-screen flex flex-col">
          {/* <Header /> */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="admin-login" />} />
             

            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
  )
}

export default App
