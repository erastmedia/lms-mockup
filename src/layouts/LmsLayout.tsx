import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  Home,
  BookOpen,
  ClipboardList,
  Users,
  FileText,
  MessageSquare,
  BarChart3,
  Calendar,
  Settings,
} from "lucide-react";

export default function LmsLayout() {
  return (
    <div className="h-screen w-full flex bg-zinc-50 text-zinc-900 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-zinc-200 dark:border-slate-800 flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 border-b border-zinc-200 dark:border-slate-800">
        <h1 className="text-xl font-bold tracking-tight">LMS SMK KARTEK</h1>
        <p className="text-xs text-zinc-500 dark:text-slate-400">
          Guru Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto mt-3 px-2 space-y-1 text-sm">
        <SidebarItem icon={<Home size={18} />} label="Beranda" to="/" />

        <SidebarSection title="Perencanaan Pembelajaran" />
        <SidebarItem
          icon={<BookOpen size={18} />}
          label="Kurikulum & CP/KD"
          to="/kurikulum-cp-kd"
        />
        <SidebarItem
          icon={<FileText size={18} />}
          label="RPP / Modul Ajar"
          to="/rpp-modul-ajar"
        />
        <SidebarItem
          icon={<Calendar size={18} />}
          label="Prota & Promes"
          to="/prota-promes"
        />
        <SidebarItem
          icon={<ClipboardList size={18} />}
          label="Skema Penilaian & KKM"
          to="/skema-penilaian"
        />
        <SidebarItem
          icon={<ClipboardList size={18} />}
          label="Bank Soal & Template"
          to="/bank-soal-template"
        />

        <SidebarSection title="Proses Pembelajaran" />
        <SidebarItem
          icon={<Users size={18} />}
          label="Kelas Virtual"
          to="/kelas-virtual"
        />
        <SidebarItem
          icon={<FileText size={18} />}
          label="Materi & Tugas"
          to="/materi-tugas"
        />
        <SidebarItem
          icon={<MessageSquare size={18} />}
          label="Forum & Pengumuman"
          to="/forum-pengumuman"
        />
        <SidebarItem
          icon={<ClipboardList size={18} />}
          label="Presensi & Jurnal Mengajar"
          to="/presensi-jurnal"
        />

        <SidebarSection title="Evaluasi & Analitik" />
        <SidebarItem
          icon={<BarChart3 size={18} />}
          label="Buku Nilai & Analisis KD"
          to="/buku-nilai-analisis-kd"
        />
        <SidebarItem
          icon={<ClipboardList size={18} />}
          label="Remedial & Pengayaan"
          to="/remedial-pengayaan"
        />
        <SidebarItem
          icon={<FileText size={18} />}
          label="Portofolio & Refleksi"
          to="/portofolio-refleksi"
        />

        <SidebarSection title="Lainnya" />
        <SidebarItem
          icon={<Calendar size={18} />}
          label="Kalender Akademik"
          to="/kalender-akademik"
        />
        <SidebarItem
          icon={<Settings size={18} />}
          label="Pengaturan Akun"
          to="/pengaturan-akun"
        />
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-200 dark:border-slate-800 text-xs text-zinc-500 dark:text-slate-500">
        © 2025 SMK KARTEK LMS
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200 ${
          isActive
            ? "bg-zinc-100 text-cyan-700 dark:bg-slate-800 dark:text-cyan-400"
            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}

function SidebarSection({ title }) {
  return (
    <p className="text-[11px] uppercase tracking-wider text-zinc-500 dark:text-slate-500 mt-4 mb-1 px-3">
      {title}
    </p>
  );
}
