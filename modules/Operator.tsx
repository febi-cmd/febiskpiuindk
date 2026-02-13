
import React from 'react';

export const AntrianCetakView: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <p className="text-sm text-slate-500 mb-1">Total Antrian</p>
        <p className="text-4xl font-black text-slate-800">24</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <p className="text-sm text-slate-500 mb-1">Berhasil Hari Ini</p>
        <p className="text-4xl font-black text-emerald-600">12</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <p className="text-sm text-slate-500 mb-1">Masalah Kertas/Printer</p>
        <p className="text-4xl font-black text-red-500">0</p>
      </div>
    </div>

    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-bold text-slate-700">Berkas Siap Cetak</h3>
        <button className="bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-800">Cetak Semua (Bulk)</button>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="text-slate-500 border-b border-slate-100">
          <tr>
            <th className="px-6 py-4">NIM</th>
            <th className="px-6 py-4">Mahasiswa</th>
            <th className="px-6 py-4">Prodi</th>
            <th className="px-6 py-4">Status Verifikasi</th>
            <th className="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <tr key={i} className="hover:bg-slate-50">
              <td className="px-6 py-4 font-mono">1240217300{i}</td>
              <td className="px-6 py-4 font-medium text-slate-800">ALISA NUR AISYAH</td>
              <td className="px-6 py-4 text-slate-500">Akuntansi Syariah</td>
              <td className="px-6 py-4">
                <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded font-bold uppercase">Selesai Prodi</span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-emerald-700 hover:text-emerald-900 font-bold mr-4">Preview</button>
                <button className="bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm hover:shadow-md transition-shadow">Cetak SKPI</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
