
export enum UserRole {
  MAHASISWA = 'MAHASISWA',
  PRODI = 'PRODI',
  OPERATOR = 'OPERATOR'
}

export type SkpiStatus = 'Draft' | 'Pending' | 'Approved' | 'Rejected' | 'Verified' | 'Printed' | 'Submitted';

export type AchievementCategory = 
  | 'Prestasi dan Penghargaan'
  | 'Keikutsertaan dalam Organisasi'
  | 'Kompetensi Keagamaan'
  | 'Sertifikat Keahlian'
  | 'Kerja Praktek/Magang'
  | 'Pendidikan Karakter';

export interface Achievement {
  id: string;
  studentId: string;
  category: AchievementCategory;
  title: string;
  organizer: string;
  date: string;
  evidenceUrl: string;
  description?: string;
  status: SkpiStatus;
}

export interface StudentBiodata {
  fullName: string;
  fullNameEng: string;
  birthPlaceDate: string;
  birthPlaceDateEng: string;
  nim: string;
  yearEntry: string;
  yearGraduation: string;
  diplomaNumber: string;
  qualification: string;
  qualificationEng: string;
  programStudi: string;
  email: string;
  whatsapp: string;
}

export interface AppState {
  role: UserRole;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
