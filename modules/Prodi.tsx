
import React, { useState } from 'react';
import { StudentBiodata, Achievement } from '../types';

export const VerifikasiView: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  const pendingSubmissions = [
    { id: '1', date: '22 Okt 2024', name: 'Andi Pratama', nim: '12402173001', prodi: 'Ekonomi Syariah', status: 'Submitted' },
    { id: '2', date: '23 Okt 2024', name: 'Siti Aminah', nim: '12402173002', prodi: 'Akuntansi Syari\'ah', status: 'Submitted' },
    { id: '3', date: '23 Okt 2024', name: 'Faisal Akbar', nim: '12402173003', prodi: 'Perbankan Syariah', status: 'Submitted' },
  ];

  // Mock data for student being verified
  const mockStudentData = {
    biodata: {
      fullName: "ANDI PRATAMA",
      nim: "12402173001",
      birthPlaceDate: "Palu, 1 Januari 2000",
      programStudi: "Ekonomi Syariah",
      yearEntry: "2017",
      yearGraduation: "2024",
      diplomaNumber: "UIN-DKP-2024-088",
      qualification: "Sarjana Ekonomi (S.E)",
      whatsapp: "081244556677",
      email: "andi.pratama@mhs.uindatokarama.ac.id"
    },
    achievements: [
      { id: 'a1', category: 'Prestasi dan Penghargaan', title: 'Juara 1 Debat Ekonomi Nasional', organizer: 'Kemenristekdikti', date: '2023-08-15', evidenceUrl: '#' },
      { id: 'a2', category: 'Keikutsertaan dalam Organisasi', title: 'Ketua HMPS Ekonomi Syariah', organizer: 'FEBI UIN Datokarama', date: '2021-01-01', evidenceUrl: '#' },
    ]
  };

  const handleVerify = (student: any) => {
    setSelectedStudent(student);
  };

  const handleFinalizeVerification = (status: 'Approved' | 'Rejected') => {
    alert(`Status Verifikasi untuk ${selectedStudent.name} : ${status}`);
    setSelectedStudent(null);
  };

  if (selectedStudent) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => setSelectedStudent(null)}
          className="flex items-center text-sm font-bold text-slate-500 hover:text-emerald-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Kembali ke Daftar
        </button>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-emerald-50">
            <h3 className="text-2xl font-black text-emerald-900">Verifikasi Berkas Mahasiswa</h3>
            <p className="text-slate-600">Periksa kesesuaian biodata dan bukti prestasi mahasiswa berikut.</p>
          </div>

          <div className="p-8 space-y-10">
            {/* Section Biodata */}
            <section>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center">
                <span className="w-8 h-[2px] bg-slate-200 mr-3"></span>
                Informasi Biodata
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {[
                  { label: 'Nama Lengkap', value: mockStudentData.biodata.fullName },
                  { label: 'NIM', value: mockStudentData.biodata.nim },
                  { label: 'TTL', value: mockStudentData.biodata.birthPlaceDate },
                  { label: 'Program Studi', value: mockStudentData.biodata.programStudi },
                  { label: 'Tahun Masuk/Lulus', value: `${mockStudentData.biodata.yearEntry} / ${mockStudentData.biodata.yearGraduation}` },
                  { label: 'No. Ijazah', value: mockStudentData.biodata.diplomaNumber },
                  { label: 'Gelar', value: mockStudentData.biodata.qualification },
                  { label: 'Kontak', value: `${mockStudentData.biodata.whatsapp} | ${mockStudentData.biodata.email}` },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{item.label}</span>
                    <span className="text-slate-800 font-semibold border-b border-slate-50 pb-2">{item.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section Achievements */}
            <section>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center">
                <span className="w-8 h-[2px] bg-slate-200 mr-3"></span>
                Daftar Aktivitas & Prestasi
              </h4>
              <div className="space-y-4">
                {mockStudentData.achievements.map((ach) => (
                  <div key={ach.id} className="p-5 rounded-2xl border-2 border-slate-100 hover:border-emerald-100 bg-slate-50/50 transition-all flex items-center justify-between">
                    <div className="flex-1">
                      <span className="text-[10px] font-black uppercase text-emerald-700 px-2 py-0.5 bg-emerald-50 rounded-md mb-2 inline-block tracking-widest">
                        {ach.category}
                      </span>
                      <h5 className="font-bold text-slate-800 text-lg">{ach.title}</h5>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-1 font-medium">
                        <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                          </svg>
                          {ach.organizer}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                          </svg>
                          {ach.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <a href={ach.evidenceUrl} className="text-xs font-bold px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                        Lihat Bukti
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
            <button 
              onClick={() => handleFinalizeVerification('Rejected')}
              className="px-8 py-3 text-sm font-black text-red-600 hover:bg-red-50 rounded-2xl border-2 border-transparent transition-all"
            >
              Tolak & Revisi
            </button>
            <button 
              onClick={() => handleFinalizeVerification('Approved')}
              className="px-10 py-3 text-sm font-black text-white bg-emerald-700 rounded-2xl shadow-xl shadow-emerald-700/20 hover:bg-emerald-800 transition-all"
            >
              Setujui Seluruh Berkas
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-800">Antrian Verifikasi Berkas</h3>
          <p className="text-sm text-slate-500">Daftar mahasiswa yang telah mengajukan penerbitan SKPI.</p>
        </div>
        <div className="flex gap-2">
          <select className="border-2 border-slate-100 rounded-xl px-4 py-2 text-sm bg-slate-50 font-bold text-slate-600 outline-none focus:border-emerald-500">
            <option>Semua Prodi</option>
            <option>Ekonomi Syariah</option>
            <option>Perbankan Syariah</option>
            <option>Akuntansi Syari'ah</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-black uppercase tracking-widest text-[10px]">
            <tr>
              <th className="px-6 py-5">Tgl Ajuan</th>
              <th className="px-6 py-5">Mahasiswa</th>
              <th className="px-6 py-5">Prodi</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pendingSubmissions.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-5 text-slate-500 font-medium">{student.date}</td>
                <td className="px-6 py-5">
                  <p className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{student.name}</p>
                  <p className="text-xs text-slate-400">{student.nim}</p>
                </td>
                <td className="px-6 py-5 font-medium text-slate-600">{student.prodi}</td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-100 text-amber-700">
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button 
                    onClick={() => handleVerify(student)}
                    className="bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-emerald-700/10 hover:bg-emerald-800 hover:shadow-emerald-700/30 transition-all active:scale-95"
                  >
                    Verifikasi Berkas
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const IsianSkpiView: React.FC = () => (
  <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-4xl mx-auto">
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-slate-800">Finalisasi Draft SKPI</h2>
      <p className="text-slate-500">Formulir pemeriksaan akhir sebelum diserahkan ke Operator Cetak</p>
    </div>
    
    <div className="space-y-8">
      <section className="border-l-4 border-emerald-500 pl-4 py-1">
        <h4 className="text-sm font-bold uppercase text-slate