// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LmsLayout from "./layouts/LmsLayout";

// Pages
import DashboardGuruPage from "./pages/DashboardGuruPage";
import KurikulumCpKdPage from "./pages/KurikulumCpKdPage";
import RppModulAjarPage from "./pages/RppModulAjarPage";
import ProtaPromesPage from "./pages/ProtaPromesPage";
import SkemaPenilaianKkmPage from "./pages/SkemaPenilaianKkmPage";
// tambahkan import lain sesuai halaman yang kamu buat
import BankSoalTemplatePage from "./pages/BankSoalPage";
import KelasVirtualPage from "./pages/KelasVirtualPage";
import MateriTugasPage from "./pages/MateriTugasPage";
import ForumPengumumanPage from "./pages/ForumPengumumanPage";
import PengumumanDetailPage from "./pages/PengumumanDetailPage";
import PresensiJurnalPage from "./pages/PresensiJurnalPage";
import BukuNilaiAnalisisKdPage from "./pages/BukuNilaiAnalisisPage";
import RemedialPengayaanPage from "./pages/RemedialPengayaanPage";
import PortofolioRefleksiPage from "./pages/PortofolioRefleksiPage";
import ArtefakDetailPage from "./pages/ArtefakDetailPage";
import KalenderAkademikPage from "./pages/KalenderAkademikPage";
import PengaturanAkunPage from "./pages/PengaturanAkunPage";
import BankSoalDetailPage from "./pages/BankSoalDetailPage";

export default function App() {
  return (
    <Routes>
      {/* Semua halaman LMS guru dibungkus layout yang sama */}
      <Route path="/" element={<LmsLayout />}>
        {/* Dashboard default */}
        <Route index element={<DashboardGuruPage />} />

        {/* Perencanaan */}
        <Route path="kurikulum-cp-kd" element={<KurikulumCpKdPage />} />
        <Route path="rpp-modul-ajar" element={<RppModulAjarPage />} />
        <Route path="skema-penilaian" element={<SkemaPenilaianKkmPage />} />
        <Route path="prota-promes" element={<ProtaPromesPage />} />
        <Route path="bank-soal-template" element={<BankSoalTemplatePage />} />
        <Route path="bank-soal-template/detail" element={<BankSoalDetailPage />} />

        {/* Proses Pembelajaran */}
        <Route path="kelas-virtual" element={<KelasVirtualPage />} />
        <Route path="materi-tugas" element={<MateriTugasPage />} />
        <Route path="forum-pengumuman" element={<ForumPengumumanPage />} />
        <Route
          path="forum-pengumuman/detail"
          element={<PengumumanDetailPage />}
        />
        <Route path="presensi-jurnal" element={<PresensiJurnalPage />} />

        {/* Evaluasi & Analitik */}
        <Route
          path="buku-nilai-analisis-kd"
          element={<BukuNilaiAnalisisKdPage />}
        />
        <Route path="remedial-pengayaan" element={<RemedialPengayaanPage />} />
        <Route
          path="portofolio-refleksi"
          element={<PortofolioRefleksiPage />}
        />
        <Route path="portofolio-refleksi/artefak" element={<ArtefakDetailPage />} />

        {/* Lainnya */}
        <Route path="kalender-akademik" element={<KalenderAkademikPage />} />
        <Route path="pengaturan-akun" element={<PengaturanAkunPage />} />
      </Route>

      {/* Fallback: kalau path nggak dikenal, redirect ke dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
