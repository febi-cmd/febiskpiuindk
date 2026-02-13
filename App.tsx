
import React, { useState } from 'react';
import { UserRole } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import { BiodataView, PrestasiView } from './modules/Mahasiswa';
import { VerifikasiView, IsianSkpiView } from './modules/Prodi';
import { AntrianCetakView } from './modules/Operator';

type AuthView = 'login' | 'forgot' | 'register';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<UserRole>(UserRole.MAHASISWA);
  const [currentMenu, setCurrentMenu] = useState('dashboard');
  const [authView, setAuthView] = useState<AuthView>('login');
  
  // Login fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSuccess = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setIsLoggedIn(true);
    setCurrentMenu('dashboard');
  };

  const handleOfficialLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Permanent accounts as requested: 123 / 123
    if (username === '123' && password === '123') {
      handleLoginSuccess(role);
    } else {
      alert("Username atau Password salah. Gunakan akun demo (123/123).");
    }
  };

  const renderContent = () => {
    switch (role) {
      case UserRole.MAHASISWA:
        if (currentMenu === 'dashboard') return <Dashboard role={role} />;
        if (currentMenu === 'biodata') return <BiodataView />;
        if (currentMenu === 'prestasi') return <PrestasiView />;
        break;
      case UserRole.PRODI:
        if (currentMenu === 'dashboard') return <Dashboard role={role} />;
        if (currentMenu === 'verifikasi') return <VerifikasiView />;
        if (currentMenu === 'isian') return <IsianSkpiView />;
        if (currentMenu === 'akun') return <div className="bg-white p-6 rounded-xl border">Halaman Manajemen Akun Prodi (Under Construction)</div>;
        break;
      case UserRole.OPERATOR:
        if (currentMenu === 'dashboard') return <Dashboard role={role} />;
        if (currentMenu === 'antrian') return <AntrianCetakView />;
        if (currentMenu === 'akun') return <div className="bg-white p-6 rounded-xl border">Halaman Manajemen Akun Operator (Under Construction)</div>;
        break;
    }
    return <Dashboard role={role} />;
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-5xl min-h-[640px] flex rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in duration-700">
          
          {/* Left Panel - Green Info Panel */}
          <div className="hidden lg:flex w-[48%] bg-[#00875A] p-12 text-white flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="mb-10">
                <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6.00019C10.2 6.00019 8.2 6.50019 7 7.50019C5.8 8.50019 5 10.0002 5 11.5002V18.5002C5 19.1002 5.4 19.5002 6 19.5002C6.3 19.5002 6.5 19.4002 6.8 19.2002C7.8 18.5002 9.2 18.0002 10.5 18.0002C11.8 18.0002 13.2 18.5002 14.2 19.2002C14.5 19.4002 14.7 19.5002 15 19.5002C15.6 19.5002 16 19.1002 16 18.5002V11.5002C16 10.0002 15.2 8.50019 14 7.50019C12.8 6.50019 10.8 6.00019 12 6.00019ZM12 6.00019C13.8 6.00019 15.8 6.50019 17 7.50019C18.2 8.50019 19 10.0002 19 11.5002V18.5002C19 19.1002 18.6 19.5002 18 19.5002C17.7 19.5002 17.5 19.4002 17.2 19.2002C16.2 18.5002 14.8 18.0002 13.5 18.0002C12.2 18.0002 10.8 18.5002 9.8 19.2002C9.5 19.4002 9.3 19.5002 9 19.5002C8.4 19.5002 8 19.1002 8 18.5002V11.5002C8 10.0002 8.8 8.50019 10 7.50019C11.2 6.50019 13.2 6.00019 12 6.00019Z" fill="white" fillOpacity="0.2"/>
                  <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="text-4xl font-bold mb-4 tracking-tight leading-tight">Sistem SKPI FEBI</h1>
              <p className="text-lg font-medium mb-1 opacity-90">Fakultas Ekonomi dan Bisnis Islam</p>
              <p className="text-sm opacity-80 mb-16 font-medium">Universitas Islam Negeri Datokarama Palu</p>

              <div className="space-y-6">
                {[
                  "Dapat diajukan kapan saja",
                  "Verifikasi Berkas Digital Secara Real-time",
                  "Proses cepat, mudah, dan transparan"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="bg-white/10 p-1 rounded-full border border-white/20">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-lg font-medium opacity-90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-400/10 rounded-full blur-[100px]"></div>
          </div>

          {/* Right Panel - Authentication Forms */}
          <div className="flex-1 p-8 md:p-14 flex flex-col justify-center">
            
            {/* Form Headers */}
            <div className="mb-8">
              <h2 className="text-[32px] font-bold text-slate-900 mb-2">
                {authView === 'forgot' ? 'Lupa Kata Sandi?' : 'Selamat Datang'}
              </h2>
              <p className="text-slate-500 font-medium text-lg">
                {authView === 'forgot' 
                  ? 'Masukkan NIM dan Email Anda untuk reset kata sandi.' 
                  : 'Silakan masuk untuk mengakses modul SKPI'}
              </p>
            </div>

            {/* View - Login */}
            {authView === 'login' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">MODUL AKSES</label>
                    <div className="flex bg-[#F1F5F9] p-1.5 rounded-xl">
                      {[
                        { id: UserRole.MAHASISWA, label: 'Mahasiswa' },
                        { id: UserRole.PRODI, label: 'Prodi' },
                        { id: UserRole.OPERATOR, label: 'Operator' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setRole(tab.id)}
                          className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                            role === tab.id 
                              ? 'bg-[#00875A] text-white shadow-md' 
                              : 'text-slate-500 hover:text-slate-700'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleOfficialLogin} className="space-y-5">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#00875A] transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      </div>
                      <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-12 pr-4 py-4 focus:border-[#00875A] focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
                        placeholder="Masukkan Username"
                      />
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#00875A] transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      </div>
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-12 pr-4 py-4 focus:border-[#00875A] focus:bg-white outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
                        placeholder="Password"
                      />
                    </div>

                    <div className="flex items-center justify-between px-1">
                      <label className="flex items-center gap-2 cursor-pointer select-none group">
                        <input type="checkbox" className="w-4 h-4 accent-[#00875A] rounded border-slate-300" />
                        <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">Ingat Saya</span>
                      </label>
                      <button type="button" onClick={() => setAuthView('forgot')} className="text-sm font-bold text-[#00875A] hover:underline decoration-2 underline-offset-4">Lupa Password?</button>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#00875A] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 hover:bg-[#00704A] transition-all active:scale-[0.98] mt-6 text-lg"
                    >
                      Masuk Sistem
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                  </form>
                </div>

                <div className="pt-8 text-center space-y-4">
                  <button onClick={() => setAuthView('register')} className="text-[15px] font-bold text-[#00875A] hover:underline decoration-2 underline-offset-4">
                    Belum punya akun? Buat akun
                  </button>
                  <p className="text-sm text-slate-500 font-medium">
                    Butuh bantuan? <a href="#" className="text-[#00875A] font-bold hover:underline decoration-2">Hubungi Call Centre FEBI</a>
                  </p>
                </div>
              </div>
            )}

            {/* View - Forgot Password */}
            {authView === 'forgot' && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="space-y-4">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#00875A] transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <input type="text" className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-12 pr-4 py-4 focus:border-[#00875A] focus:bg-white outline-none font-medium" placeholder="Nomor Induk Mahasiswa (NIM)" />
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#00875A] transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <input type="email" className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-12 pr-4 py-4 focus:border-[#00875A] focus:bg-white outline-none font-medium" placeholder="Email Aktif" />
                  </div>
                </div>

                <button 
                  onClick={() => { alert("Tautan pemulihan telah dikirim ke email Anda."); setAuthView('login'); }}
                  className="w-full bg-[#00875A] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 hover:bg-[#00704A] transition-all text-lg"
                >
                  Reset Kata Sandi
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>

                <div className="text-center pt-4">
                  <button onClick={() => setAuthView('login')} className="text-base font-bold text-[#00875A] hover:underline decoration-2">
                    Kembali ke Login
                  </button>
                </div>
              </div>
            )}

            {/* View - Register */}
            {authView === 'register' && (
              <div className="space-y-4 animate-in slide-in-from-right duration-300">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">MODUL AKSES</label>
                  <div className="flex bg-[#F1F5F9] p-1.5 rounded-xl">
                    <button className="flex-1 py-2 text-sm font-bold rounded-lg bg-[#00875A] text-white shadow-md">Mahasiswa</button>
                    <button className="flex-1 py-2 text-sm font-bold rounded-lg text-slate-500 hover:text-slate-700 transition-colors">Prodi</button>
                    <button className="flex-1 py-2 text-sm font-bold rounded-lg text-slate-500 hover:text-slate-700 transition-colors">Operator</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3.5">
                  {[
                    { placeholder: 'Nama Lengkap', icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    )},
                    { placeholder: 'NIM', icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    )},
                    { placeholder: 'Email Aktif', icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    )},
                    { placeholder: 'Nomor WhatsApp Aktif (+62...)', icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    )},
                    { placeholder: 'Masukkan Username', icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    )},
                    { placeholder: 'Password', type: 'password', icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    )}
                  ].map((field, i) => (
                    <div key={i} className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#00875A] transition-colors">
                        {field.icon}
                      </div>
                      <input 
                        type={field.type || 'text'}
                        className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 focus:border-[#00875A] focus:bg-white outline-none font-medium transition-all" 
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => { alert("Registrasi berhasil diajukan! Tunggu verifikasi admin."); setAuthView('login'); }}
                  className="w-full bg-[#00875A] text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-700/20 hover:bg-[#00704A] transition-all text-lg mt-4"
                >
                  Daftar Sekarang
                </button>

                <div className="text-center pt-2">
                  <button onClick={() => setAuthView('login')} className="text-base font-bold text-[#00875A] hover:underline decoration-2 underline-offset-4">
                    Sudah punya akun? Login
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout 
      activeRole={role} 
      currentMenu={currentMenu} 
      setMenu={setCurrentMenu}
      onLogout={() => setIsLoggedIn(false)}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
