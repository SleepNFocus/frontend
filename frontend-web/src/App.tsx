import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './admin/Dashboard';
import UserManagement from './admin/UserManagement';
import TestManagement from './admin/TestManagement';
import Analytics from './admin/Analytics';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex items-center px-4 text-gray-800 hover:text-gray-600">
                  홈
                </Link>
                <Link to="/admin" className="flex items-center px-4 text-gray-800 hover:text-gray-600">
                  관리자
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <div>
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                  React + Tailwind CSS
                </h1>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <p className="text-gray-600">
                    이 프로젝트는 React와 Tailwind CSS를 사용하여 만들어졌습니다.
                  </p>
                </div>
              </div>
            } />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/tests" element={<TestManagement />} />
            <Route path="/admin/analytics" element={<Analytics />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 