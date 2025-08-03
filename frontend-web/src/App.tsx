import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './admin/Dashboard';
import UserManagement from './admin/UserManagement';
import AdminLayout from './admin/layout/AdminLayout';
import Home from './admin/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAutoLogin } from '@/hooks/useAutoLogin';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const queryClient = new QueryClient();

// 보호된 라우트 컴포넌트
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setShowLoginModal(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (!isLoggedIn) {
    return (
      <>
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">접근 제한</h1>
          <p className="text-gray-600">로그인이 필요한 페이지입니다.</p>
        </div>
        
        <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-textColor">로그인이 필요합니다</DialogTitle>
              <DialogDescription>
                이 페이지에 접근하려면 먼저 로그인해주세요.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                className="bg-softBlue text-white hover:bg-deepNavy border-none"
                onClick={() => window.location.href = '/'}
              >
                로그인 페이지로 이동
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return <>{children}</>;
};

function App() {
  useAutoLogin();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <div>
            <Routes>
              <Route path="/" element={<AdminLayout><Home /></AdminLayout>} />
              <Route path="/oauth/kakao" element={<AdminLayout><Home /></AdminLayout>} />
              <Route path="/oauth/google" element={<AdminLayout><Home /></AdminLayout>} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout><Dashboard /></AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute>
                  <AdminLayout><UserManagement /></AdminLayout>
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App; 