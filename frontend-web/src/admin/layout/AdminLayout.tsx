import AdminNavigator from '../navigation/AdminNavigator';
import { ReactNode } from 'react';
import focuzLogoSB from '../../assets/focuz-logo-SB.png';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 헤더 영역 */}
      <header className="bg-white shadow-md border-b border-mediumLightGray">
        <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
          <AdminNavigator />
        </div>
      </header>

      {/* 메인 컨텐츠 영역 */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {children}
      </main>

      {/* 푸터 영역 */}
      <footer className="bg-white border-t border-mediumLightGray mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <img src={focuzLogoSB} alt="Focuz Logo" className="h-8 mb-2" />
            <p className="text-center text-softBlue text-sm">
              © 2025 관리자 대시보드. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 