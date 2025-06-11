import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './admin/Dashboard';
import UserManagement from './admin/UserManagement';
import TestManagement from './admin/TestManagement';
import Analytics from './admin/Analytics';
import AdminLayout from './admin/layout/AdminLayout';
import Home from './admin/Home';

function App() {
  return (
    <Router>
      <div>
        <div>
          <Routes>
            <Route path="/" element={<AdminLayout><Home /></AdminLayout>} />
            <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
            <Route path="/admin/users" element={<AdminLayout><UserManagement /></AdminLayout>} />
            <Route path="/admin/tests" element={<AdminLayout><TestManagement /></AdminLayout>} />
            <Route path="/admin/analytics" element={<AdminLayout><Analytics /></AdminLayout>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 