
import React, { useState } from 'react';
import { UserRole } from '../types';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, color }) => (
  <div className={`bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-l-4 ${color}`}>
    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</h3>
    <p className="text-3xl font-bold mt-2 text-slate-800">{value}</p>
    <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
  </div>
);

const Dashboard: React.FC<{ role: UserRole }> = ({ role }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getStats = () => {
    switch (role) {
      case UserRole.MAHASISWA:
        return [
          { title: 'Ajuan Prestasi', value: 4, subtitle: 'Total entri SKPI', color: 'border-l-blue-500' },
          { title: 'Terverifikasi', value: 2, subtitle: 'Disetujui Prodi', color: 'border-l-emerald-500' },
          { title: 'Menunggu', value: 1, subtitle: 'Dalam proses review', color: 'border-l-amber-500' },
          { title: 'Ditolak', value: 1, subtitle: 'Perlu revisi', color: 'border-l-red-500' },
        ];
      case UserRole.PRODI:
        return [
          { 
            title: 'Antrian Verifikasi', 
            value: 12, 
            subtitle: 'Mahasiswa menekan tombol Ajukan', 
            color: 'border-l-amber-500' 
          },
          { 
            title: 'Selesai Verifikasi', 
            value: 85, 
            subtitle: 'Telah diverifikasi Prodi', 
            color: 'border-l-emerald-500' 
          },
          { 
            title: 'SKPI Terbit', 
            value: 310, 
            subtitle: 'Telah dicetak oleh Operator', 
            color: 'border-l-blue-500' 
          },
          { 
            title: 'Draft SKPI', 
            value: 45, 
            subtitle: 'Mahasiswa mendaftar belum mengajukan', 
            color: 'border-l-slate-400' 
          },
        ];
      case UserRole.OPERATOR:
        return [
          { title: 'Siap Cetak', value: 42, subtitle: 'Verifikasi prodi selesai', color: 'border-l-emerald-500' },
          { title: 'Tercetak', value: 310, subtitle: 'Total SKPI diterbitkan', color: 'border-l-blue-500' },
          { title: 'Masalah Cetak', value: 2, subtitle: 'Gagal sistem/printer', color: 'border-l-red-500' },
          { title: 'Permintaan Baru', value: 15, subtitle: 'Hari ini', color: 'border-l-amber-500' },
        ];
    }
  };

  const handleAjukan = () => {
    if (confirm("Apakah Anda yakin ingin mengajukan SKPI? Setelah diajukan, data akan dikunci untuk diverifikasi oleh Prodi.")) {
      setIsSubmitted(true);
      alert("SKPI Berhasil diajukan! Pantau menu Verifikasi Ajuan secara berkala.");
    }
  };

  return (
    <div className="space-y-8">
      {role === UserRole.MAHASISWA && (
        <div className={`p-6 rounded-2xl border-2 flex flex-col md:flex-row items-center justify-between gap-4 transition-all ${isSubmitted ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${isSubmitted ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-black text-slate-800">Status Pengajuan SKPI</h3>
              <p className="text-sm text-slate-600">
                {isSubmitted 
                  ? "SKPI telah diajukan ke Program Studi. Data sedang dalam antrian verifikasi." 
                  : "Lengkapi Biodata dan Aktivitas & Prestasi sebelum melakukan pengajuan."}
              </p>
            </div>
          </div>
          {!isSubmitted && (
            <button 
              onClick={handleAjukan}
              className="bg-emerald-700 text-white px-8 py-3 rounded-xl font-black shadow-lg shadow-emerald-700/20 hover:bg-emerald-800 transition-all scale-100 active:scale-95"
            >
              Ajukan SKPI Sekarang
            </button>
          )}
          {isSubmitted && (
            <span className="text-emerald-700 font-bold px-4 py-2 bg-white rounded-lg border border-emerald-200">
              TERKIRIM KE PRODI
            </span>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getStats().map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Pengumuman Terbaru</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 items-start pb-4 border-b border-slate-100 last:border-0">
                <div className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded font-bold mt-1">NEW</div>
                <div>
                  <h4 className="text-sm font-semibold">Batas Akhir Input SKPI Periode Wisuda Juni 2025</h4>
                  <p className="text-xs text-slate-500 mt-1">Diberitahukan kepada seluruh mahasiswa semester akhir bahwa batas akhir unggah berkas...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Butuh Bantuan?</h3>
          <p className="text-sm text-slate-600 mb-4">Panduan penggunaan sistem E-SKPI dapat diunduh melalui tautan di bawah ini atau hubungi helpdesk kami.</p>
          <button className="w-full bg-emerald-700 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-800">Unduh Panduan (PDF)</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
