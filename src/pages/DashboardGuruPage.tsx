// src/pages/DashboardGuruPage.tsx
import React from "react";
import {
  PlusCircle,
  ClipboardList,
  FileText,
  BarChart3,
  CalendarDays,
} from "lucide-react";

const today = new Date();
const dateStr = today.toLocaleDateString("id-ID", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const jadwalHariIni = [
  {
    id: 1,
    mapel: "Pemeliharaan Mesin Kendaraan Ringan",
    jurusan: "TKR",
    kelas: "XI TKR 1",
    jam: "07.15 – 08.45",
    ruang: "Bengkel TKR 1",
  },
  {
    id: 2,
    mapel: "Sistem Hidrolik & Pneumatik",
    jurusan: "TMK",
    kelas: "XI TMK 1",
    jam: "09.00 – 10.30",
    ruang: "Lab Hidrolik TMK",
  },
  {
    id: 3,
    mapel: "Teknik Pemesinan Bubut",
    jurusan: "TP",
    kelas: "XII TP 1",
    jam: "10.45 – 12.15",
    ruang: "Bengkel TP 1",
  },
];

const kelasAktif = [
  {
    id: 1,
    mapel: "Pemeliharaan Mesin Kendaraan Ringan",
    jurusan: "TKR",
    kelas: "XI TKR 1",
    siswa: 34,
    tugasAktif: 2,
  },
  {
    id: 2,
    mapel: "Sistem Hidrolik & Pneumatik",
    jurusan: "TMK",
    kelas: "XI TMK 1",
    siswa: 33,
    tugasAktif: 1,
  },
  {
    id: 3,
    mapel: "Teknik Pemesinan Bubut",
    jurusan: "TP",
    kelas: "XII TP 1",
    siswa: 32,
    tugasAktif: 0,
  },
];

const aktivitasTerbaru = [
  {
    id: 1,
    jenis: "Tugas dikumpulkan",
    detail: "Laporan servis berkala · XI TKR 1",
    waktu: "5 menit lalu",
  },
  {
    id: 2,
    jenis: "Nilai dipublikasikan",
    detail: "Nilai praktik bubut · XII TP 1",
    waktu: "30 menit lalu",
  },
  {
    id: 3,
    jenis: "Materi baru diunggah",
    detail: "Modul sistem hidrolik · XI TMK 1",
    waktu: "1 jam lalu",
  },
  {
    id: 4,
    jenis: "Diskusi baru",
    detail: "Forum safety bengkel · XI TKR 1",
    waktu: "2 jam lalu",
  },
];

const DashboardGuruPage: React.FC = () => {
  return (
    <div className="h-full w-full bg-zinc-50 dark:bg-slate-950">
      {/* Topbar mini */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-950/80 backdrop-blur border-b border-zinc-200 dark:border-slate-800">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Beranda Guru
            </h2>
            <p className="text-xs text-zinc-500 dark:text-slate-400">
              {dateStr}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition">
              <PlusCircle size={16} />
              Buat Materi
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition">
              <ClipboardList size={16} />
              Buat Tugas/Kuis
            </button>
          </div>
        </div>
      </div>

      {/* Isi utama */}
      <div className="px-6 pt-4 pb-8 space-y-6">
        {/* Ringkasan atas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <SummaryCard
            title="Kelas Aktif"
            value="3"
            subtitle="Semester Ganjil 2025"
            icon={<UsersIcon />}
          />
          <SummaryCard
            title="Tugas Perlu Dinilai"
            value="5"
            subtitle="Dari 3 kelas"
            icon={<ClipboardList size={18} />}
          />
          <SummaryCard
            title="Terlambat Kumpul"
            value="7"
            subtitle="24 jam terakhir"
            variant="warning"
          />
          <SummaryCard
            title="Selesai Dinilai"
            value="18"
            subtitle="Minggu ini"
            icon={<FileText size={18} />}
          />
        </div>

        {/* Grid tengah */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Jadwal Mengajar Hari Ini */}
          <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-slate-900/60 border border-zinc-200 dark:border-slate-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold">
                  Jadwal Mengajar Hari Ini
                </h3>
                <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                  Pantau slot mengajar & ruang praktik.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-zinc-100 text-zinc-600 dark:bg-slate-800 dark:text-slate-200">
                <CalendarDays size={14} />
                {jadwalHariIni.length} sesi
              </span>
            </div>
            <div className="space-y-2">
              {jadwalHariIni.map((j) => (
                <div
                  key={j.id}
                  className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-slate-700 bg-zinc-50/80 dark:bg-slate-900/60 px-3 py-2.5"
                >
                  <div>
                    <p className="text-[13px] font-semibold">
                      {j.mapel} — {j.kelas}
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                      {j.jurusan} · {j.jam} · {j.ruang}
                    </p>
                  </div>
                  <button className="text-[11px] px-3 py-1.5 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500">
                    Buka Kelas
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Statistik Pengajaran sederhana */}
          <div className="rounded-2xl bg-white dark:bg-slate-900/60 border border-zinc-200 dark:border-slate-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold">Statistik Pengajaran</h3>
                <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                  7 hari terakhir
                </p>
              </div>
              <BarChart3 size={18} className="text-cyan-600" />
            </div>
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              <StatPill title="Materi" value="6" desc="diunggah" />
              <StatPill title="Tugas" value="4" desc="aktif" />
              <StatPill title="Kuis" value="3" desc="diberikan" />
            </div>
            <div className="mt-3 h-24 rounded-xl bg-gradient-to-t from-cyan-100/60 to-white dark:from-slate-800 dark:to-slate-900 flex items-end justify-between px-3 pb-2 text-[10px] text-zinc-500 dark:text-slate-400">
              {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map(
                (hari, i) => (
                  <div key={hari} className="flex flex-col items-center gap-1">
                    <div
                      className="w-5 rounded-full bg-cyan-500/80 dark:bg-cyan-400/90"
                      style={{ height: `${30 + i * 5}px` }}
                    />
                    <span>{hari}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Kelas aktif + aktivitas terbaru */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Kelas Aktif */}
          <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-slate-900/60 border border-zinc-200 dark:border-slate-800 p-4">
            <h3 className="text-sm font-semibold mb-2">Kelas Aktif</h3>
            <p className="text-[11px] text-zinc-500 dark:text-slate-400 mb-3">
              Ringkasan cepat kelas kejuruan yang Anda ampu.
            </p>
            <div className="space-y-2">
              {kelasAktif.map((k) => (
                <div
                  key={k.id}
                  className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-slate-700 bg-zinc-50/80 dark:bg-slate-900/60 px-3 py-2.5 text-[11px]"
                >
                  <div>
                    <p className="text-[13px] font-semibold">
                      {k.mapel} — {k.kelas}
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                      {k.jurusan} · {k.siswa} siswa · {k.tugasAktif} tugas aktif
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    <button className="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-slate-700 text-[11px] hover:bg-zinc-100 dark:hover:bg-slate-800">
                      Materi
                    </button>
                    <button className="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-slate-700 text-[11px] hover:bg-zinc-100 dark:hover:bg-slate-800">
                      Tugas
                    </button>
                    <button className="px-2.5 py-1 rounded-lg bg-cyan-600 text-white text-[11px] hover:bg-cyan-500">
                      Masuk
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Aktivitas Terbaru */}
          <div className="rounded-2xl bg-white dark:bg-slate-900/60 border border-zinc-200 dark:border-slate-800 p-4">
            <h3 className="text-sm font-semibold mb-2">Aktivitas Terbaru</h3>
            <p className="text-[11px] text-zinc-500 dark:text-slate-400 mb-3">
              Log singkat dari kelas Anda.
            </p>
            <div className="space-y-2 text-[11px]">
              {aktivitasTerbaru.map((a) => (
                <div
                  key={a.id}
                  className="flex items-start justify-between border-b border-zinc-100 dark:border-slate-800 pb-1.5 last:border-0"
                >
                  <div className="pr-2">
                    <p className="font-semibold">{a.jenis}</p>
                    <p className="text-zinc-500 dark:text-slate-400">
                      {a.detail}
                    </p>
                  </div>
                  <span className="text-[10px] text-zinc-400 dark:text-slate-500 whitespace-nowrap">
                    {a.waktu}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function SummaryCard({
  title,
  value,
  subtitle,
  icon,
  variant,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon?: React.ReactNode;
  variant?: "warning";
}) {
  const base =
    "rounded-2xl border px-4 py-3 bg-white/90 dark:bg-slate-900/60 border-zinc-200 dark:border-slate-800 flex items-center justify-between";
  const warningBadge =
    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] dark:bg-amber-500/10 dark:text-amber-300";

  return (
    <div className={base}>
      <div>
        <p className="text-[11px] text-zinc-500 dark:text-slate-400">{title}</p>
        <p className="text-lg font-semibold leading-tight">{value}</p>
        <p className="text-[11px] text-zinc-500 dark:text-slate-400">
          {subtitle}
        </p>
        {variant === "warning" && (
          <span className={warningBadge}>
            <BarChart3 size={12} />
            Perlu perhatian
          </span>
        )}
      </div>
      <div className="text-zinc-300 dark:text-slate-600">{icon}</div>
    </div>
  );
}

function StatPill({
  title,
  value,
  desc,
}: {
  title: string;
  value: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-slate-700 bg-zinc-50/80 dark:bg-slate-900/60 px-3 py-2">
      <p className="text-[10px] text-zinc-500 dark:text-slate-400">{title}</p>
      <p className="text-base font-semibold leading-tight">{value}</p>
      <p className="text-[10px] text-zinc-500 dark:text-slate-400">{desc}</p>
    </div>
  );
}

function UsersIcon() {
  return (
    <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center dark:bg-cyan-500/10 dark:text-cyan-300">
      <UsersIconSvg />
    </div>
  );
}

// Icon simple (biar tidak perlu import lagi)
function UsersIconSvg() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default DashboardGuruPage;
