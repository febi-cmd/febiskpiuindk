
import React from 'react';
import { UserRole } from '../types';
import { Icons, COLORS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeRole: UserRole;
  currentMenu: string;
  setMenu: (menu: string) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeRole, currentMenu, setMenu, onLogout }) => {
  const menus = {
    [UserRole.MAHASISWA]: [
      { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
      { id: 'biodata', label: 'Biodata', icon: Icons.User },
      { id: 'prestasi', label: 'Aktivitas & Prestasi', icon: Icons.Achievement },
    ],
    [UserRole.PRODI]: [
      { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
      { id: 'verifikasi', label: 'Verifikasi Ajuan', icon: Icons.Verify },
      { id: 'isian', label: 'Isian SKPI', icon: Icons.Achievement },
      { id: 'akun', label: 'Manajemen Akun', icon: Icons.Settings },
    ],
    [UserRole.OPERATOR]: [
      { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
      { id: 'antrian', label: 'Antrian Cetak', icon: Icons.Print },
      { id: 'akun', label: 'Manajemen Akun', icon: Icons.Settings },
    ],
  };

  const currentRoleMenus = menus[activeRole];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-900 text-white flex flex-col transition-all duration-300">
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-tight">E-SKPI <span className="text-amber-400">FEBI</span></h1>
          <p className="text-xs text-emerald-200 uppercase mt-1">Universitas Islam Negeri Datokarama Palu</p>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {currentRoleMenus.map((item) => (
            <button
              key={item.id}
              onClick={() => setMenu(item.id)}
              className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                currentMenu === item.id 
                ? 'bg-emerald-800 text-amber-400' 
                : 'text-emerald-100 hover:bg-emerald-800/50'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-emerald-800">
          <div className="flex items-center p-2">
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center font-bold text-emerald-900">
              {activeRole[0]}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium truncate">Pengguna {activeRole.toLowerCase()}</p>
              <p className="text-xs text-emerald-300 truncate">{activeRole}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="mt-4 w-full px-4 py-2 text-xs font-semibold text-center text-emerald-100 bg-emerald-800 hover:bg-red-900 rounded-lg transition-colors"
          >
            Keluar Sistem
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-slate-800">
            {currentRoleMenus.find(m => m.id === currentMenu)?.label || 'Halaman Utama'}
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-slate-500">Tahun Akademik: 2024/2025</span>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
