
import React, { useState } from 'react';
import { Achievement, AchievementCategory, SkpiStatus, StudentBiodata } from '../types';
import { professionalizeAchievement } from '../services/geminiService';

export const BiodataView: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<StudentBiodata>({
    fullName: "MUHAMMAD IHSAN KAMIL",
    fullNameEng: "MUHAMMAD IHSAN KAMIL",
    birthPlaceDate: "Palu, 12 Mei 1999",
    birthPlaceDateEng: "Palu, May 12th 1999",
    nim: "12402173001",
    yearEntry: "2017",
    yearGraduation: "2024",
    diplomaNumber: "UIN-DKP-2024-001",
    qualification: "Sarjana Ekonomi (S.E)",
    qualificationEng: "Bachelor of Economics",
    programStudi: "Ekonomi Syariah",
    email: "ihsan.kamil@mhs.uindatokarama.ac.id",
    whatsapp: "081234567890"
  });

  const handleSave = () => {
    setIsEditing(false);
    alert("Data biodata berhasil diperbarui secara lokal.");
  };

  const Field = ({ label, labelEng, name, type = "text", options }: { label: string, labelEng: string, name: keyof StudentBiodata, type?: string, options?: string[] }) => (
    <div className="py-4 border-b border-slate-50 last:border-0">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="w-full md:w-1/3 mb-1 md:mb-0">
          <p className="text-sm font-semibold text-slate-700">{label}</p>
          <p className="text-xs text-slate-400 italic">{labelEng}</p>
        </div>
        <div className="w-full md:w-2/3">
          {isEditing ? (
            options ? (
              <select 
                value={data[name]} 
                onChange={e => setData({...data, [name]: e.target.value})}
                className="w-full border-2 border-slate-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
              >
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ) : (
              <input 
                type={type} 
                value={data[name]} 
                onChange={e => setData({...data, [name]: e.target.value})}
                className="w-full border-2 border-slate-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500" 
              />
            )
          ) : (
            <p className="text-slate-800 font-medium">{data[name] || '-'}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 bg-emerald-50 border-b border-emerald-100 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-emerald-900">Informasi Identitas Diri</h3>
            <p className="text-xs text-emerald-700 italic">Information on Personal Identity</p>
          </div>
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`${isEditing ? 'bg-emerald-700 text-white' : 'bg-white text-emerald-700'} px-5 py-2 rounded-xl text-sm font-bold border border-emerald-200 hover:shadow-md transition-all flex items-center gap-2`}
          >
            {isEditing ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Simpan Data
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                Edit Biodata
              </>
            )}
          </button>
        </div>
        
        <div className="p-6 md:p-8">
          <Field label="Nama Lengkap" labelEng="Full Name" name="fullName" />
          <Field label="Tempat dan Tanggal Lahir" labelEng="Date and Place of Birth" name="birthPlaceDate" />
          <Field label="Nomor Induk Mahasiswa" labelEng="Student Identification Number" name="nim" />
          <Field 
            label="Program Studi" 
            labelEng="Department" 
            name="programStudi" 
            options={["Ekonomi Syariah", "Perbankan Syariah", "Akuntansi Syari'ah"]} 
          />
          <Field label="Tahun Masuk" labelEng="Year of Admission" name="yearEntry" />
          <Field label="Tahun Lulus" labelEng="Year of Completion" name="yearGraduation" />
          <Field label="Nomor Ijazah" labelEng="Diploma Number" name="diplomaNumber" />
          <Field label="Gelar" labelEng="Name of Qualification" name="qualification" />
          <Field label="Gelar (English)" labelEng="English Qualification" name="qualificationEng" />
          <Field label="Nomor WhatsApp" labelEng="WhatsApp Number" name="whatsapp" type="tel" />
          <Field label="Email" labelEng="Academic Email" name="email" type="email" />
        </div>
      </div>
    </div>
  );
};

export const PrestasiView: React.FC = () => {
  const categories: AchievementCategory[] = [
    'Prestasi dan Penghargaan',
    'Keikutsertaan dalam Organisasi',
    'Kompetensi Keagamaan',
    'Sertifikat Keahlian',
    'Kerja Praktek/Magang',
    'Pendidikan Karakter'
  ];

  const [activeCategory, setActiveCategory] = useState<AchievementCategory>(categories[0]);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { 
      id: '1', 
      studentId: '1', 
      category: 'Prestasi dan Penghargaan', 
      title: 'Juara 1 Lomba Karya Tulis Ilmiah Ekonomi Islam', 
      organizer: 'Universitas Indonesia', 
      date: '2022-05-12', 
      evidenceUrl: 'https://drive.google.com/file/d/example',
      status: 'Approved' 
    },
    { 
      id: '2', 
      studentId: '1', 
      category: 'Keikutsertaan dalam Organisasi', 
      title: 'Ketua Umum Senat Mahasiswa FEBI', 
      organizer: 'Universitas Islam Negeri Datokarama Palu', 
      date: '2021-01-01', 
      evidenceUrl: 'https://drive.google.com/file/d/example2',
      status: 'Pending' 
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    title: '', 
    organizer: '', 
    date: '', 
    evidenceUrl: '' 
  });

  const handleOpenModal = (item?: Achievement) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        title: item.title,
        organizer: item.organizer,
        date: item.date,
        evidenceUrl: item.evidenceUrl
      });
    } else {
      setEditingId(null);
      setFormData({ title: '', organizer: '', date: '', evidenceUrl: '' });
    }
    setIsModalOpen(true);
  };

  const handleSaveAchievement = () => {
    if (editingId) {
      setAchievements(achievements.map(a => a.id === editingId ? {
        ...a,
        ...formData,
        status: 'Pending' // Reset status when edited
      } : a));
    } else {
      const newEntry: Achievement = {
        id: Date.now().toString(),
        studentId: '1',
        category: activeCategory,
        title: formData.title,
        organizer: formData.organizer,
        date: formData.date,
        evidenceUrl: formData.evidenceUrl,
        status: 'Pending'
      };
      setAchievements([...achievements, newEntry]);
    }
    setIsModalOpen(false);
  };

  const filteredAchievements = achievements.filter(a => a.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeCategory === cat 
              ? 'bg-emerald-700 text-white shadow-md' 
              : 'text-slate-500 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-slate-800">{activeCategory}</h3>
          <p className="text-sm text-slate-500">Kelola riwayat aktivitas Anda pada kategori ini.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-800 shadow-lg shadow-emerald-700/20 transition-all flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Tambah Data
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Nama Kegiatan</th>
              <th className="px-6 py-4">Penyelenggara</th>
              <th className="px-6 py-4">Tanggal</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredAchievements.length > 0 ? filteredAchievements.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-800">{item.title}</td>
                <td className="px-6 py-4 text-slate-600">{item.organizer}</td>
                <td className="px-6 py-4 text-slate-500">{new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    item.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 
                    item.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end items-center gap-3">
                    <button 
                      onClick={() => handleOpenModal(item)}
                      className="text-amber-600 hover:text-amber-800 font-bold text-xs flex items-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                      Edit
                    </button>
                    <a 
                      href={item.evidenceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-emerald-600 hover:text-emerald-800 font-bold text-xs"
                    >
                      Buka Drive
                    </a>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                  Belum ada data pada kategori ini. Klik "Tambah Data" untuk memulai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 bg-emerald-50 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black text-emerald-900">{editingId ? 'Edit' : 'Tambah'} {activeCategory}</h3>
                <p className="text-xs text-emerald-700">Pastikan data yang Anda masukkan benar sesuai sertifikat.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-8 space-y-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Nama Kegiatan</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 focus:border-emerald-500 focus:ring-0 outline-none transition-all placeholder:text-slate-300" 
                  placeholder="Contoh: Juara 1 Business Plan 2023"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Penyelenggara</label>
                  <input 
                    type="text" 
                    value={formData.organizer}
                    onChange={e => setFormData({...formData, organizer: e.target.value})}
                    className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all" 
                    placeholder="Nama Instansi/Lembaga"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Tanggal Kegiatan</label>
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all" 
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Bukti Link Google Drive</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                  </div>
                  <input 
                    type="url" 
                    value={formData.evidenceUrl}
                    onChange={e => setFormData({...formData, evidenceUrl: e.target.value})}
                    className="w-full border-2 border-slate-100 rounded-xl pl-10 pr-4 py-3 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300" 
                    placeholder="https://drive.google.com/..."
                  />
                </div>
                <p className="text-[10px] text-slate-400">Pastikan link dapat diakses oleh pihak kampus (Public/Anyone with link).</p>
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-sm text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-colors">Batal</button>
              <button 
                onClick={handleSaveAchievement}
                disabled={!formData.title || !formData.organizer || !formData.date || !formData.evidenceUrl}
                className="bg-emerald-700 text-white px-8 py-2.5 rounded-xl text-sm font-black hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-700/20 transition-all"
              >
                {editingId ? 'Update Data' : 'Ajukan Capaian'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
