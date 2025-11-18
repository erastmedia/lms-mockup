// src/pages/KelasVirtualPage.tsx
import React, { useState } from "react";
import {
  Search,
  Filter,
  Video,
  Pencil,
  Users,
  CalendarClock,
  Link2,
  FileText,
  MessageCircle,
  PlayCircle,
  CheckCircle2,
  Clock,
  Download,
  UploadCloud,
  PlusCircle,
  Monitor,
  Bell,
  Sun
} from "lucide-react";

type VirtualClass = {
  id: number;
  namaKelas: string;
  mapel: string;
  jurusan: "TKR" | "TMK" | "TP";
  rombel: string;
  platform: "Zoom" | "Google Meet" | "Lainnya";
  kodeRuang: string;
  tautan: string;
  jadwalHari: string;
  jadwalJam: string;
  jumlahSiswa: number;
  status: "Berjalan" | "Terjadwal" | "Selesai";
};

type Session = {
  id: number;
  tanggal: string;
  jam: string;
  topik: string;
  ke: number;
  hadir: number;
  total: number;
  rekaman?: string;
  materi?: string;
};

const VIRTUAL_CLASSES: VirtualClass[] = [
  {
    id: 1,
    namaKelas: "Kelas Virtual XI TKR 1",
    mapel: "Pemeliharaan Mesin Kendaraan Ringan",
    jurusan: "TKR",
    rombel: "XI TKR 1",
    platform: "Zoom",
    kodeRuang: "TKR-PMKR-XI1",
    tautan: "https://zoom.us/j/123456789",
    jadwalHari: "Senin & Rabu",
    jadwalJam: "07.30 – 09.10",
    jumlahSiswa: 32,
    status: "Berjalan",
  },
  {
    id: 2,
    namaKelas: "Kelas Virtual XI TMK 1",
    mapel: "Sistem Hidrolik & Pneumatik",
    jurusan: "TMK",
    rombel: "XI TMK 1",
    platform: "Google Meet",
    kodeRuang: "TMK-HID-XI1",
    tautan: "https://meet.google.com/abcd-efgh-xyz",
    jadwalHari: "Selasa",
    jadwalJam: "09.30 – 11.10",
    jumlahSiswa: 28,
    status: "Terjadwal",
  },
  {
    id: 3,
    namaKelas: "Kelas Virtual XII TP 1",
    mapel: "Teknik Pemesinan Bubut",
    jurusan: "TP",
    rombel: "XII TP 1",
    platform: "Zoom",
    kodeRuang: "TP-BUBUT-XII1",
    tautan: "https://zoom.us/j/987654321",
    jadwalHari: "Kamis",
    jadwalJam: "10.00 – 11.40",
    jumlahSiswa: 26,
    status: "Selesai",
  },
];

const SESSIONS_MAP: Record<number, Session[]> = {
  1: [
    {
      id: 101,
      tanggal: "Sen, 17 Nov 2025",
      jam: "07.30 – 09.10",
      topik: "Servis Berkala – Pengenalan & K3 Bengkel",
      ke: 5,
      hadir: 30,
      total: 32,
      rekaman: "Rekaman Pertemuan 5.mp4",
      materi: "Slide K3 Bengkel.pdf",
    },
    {
      id: 102,
      tanggal: "Rab, 12 Nov 2025",
      jam: "07.30 – 09.10",
      topik: "Review Komponen Servis Berkala",
      ke: 4,
      hadir: 31,
      total: 32,
      rekaman: "Rekaman Pertemuan 4.mp4",
      materi: "Handout Servis Berkala.pdf",
    },
  ],
  2: [
    {
      id: 201,
      tanggal: "Sel, 11 Nov 2025",
      jam: "09.30 – 11.10",
      topik: "Prinsip Dasar Tekanan & Fluida",
      ke: 3,
      hadir: 27,
      total: 28,
      rekaman: "Rekaman Pertemuan 3.mp4",
      materi: "Slide Tekanan & Fluida.pdf",
    },
  ],
  3: [
    {
      id: 301,
      tanggal: "Kam, 13 Nov 2025",
      jam: "10.00 – 11.40",
      topik: "Pembubutan Poros – Pengaturan Parameter",
      ke: 6,
      hadir: 25,
      total: 26,
      rekaman: "Rekaman Pertemuan 6.mp4",
      materi: "Gambar Kerja Poros.pdf",
    },
  ],
};

const KelasVirtualPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(VIRTUAL_CLASSES[0].id);
  const selected =
    VIRTUAL_CLASSES.find((k) => k.id === selectedId) ?? VIRTUAL_CLASSES[0];

  const sessions = SESSIONS_MAP[selected.id] ?? [];

  const today = new Date();
  const dateStr = today.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="h-full w-full bg-zinc-50 dark:bg-slate-950">
      {/* Topbar */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 dark:bg-slate-950/80 border-b border-zinc-200 dark:border-slate-800">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Kelas Virtual
            </h2>
            <p className="text-xs text-zinc-500 dark:text-slate-400">
              {dateStr} · Ruang belajar daring terintegrasi dengan materi, tugas,
              dan presensi
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition">
              <PlusCircle size={16} />
              Buat Kelas Virtual
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
              <UploadCloud size={16} />
              Import Jadwal
            </button>
            <button className="relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-slate-800 transition">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-rose-500 rounded-full"/>
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition" aria-label="Toggle theme">
              <Sun size={16}/>
              <span className="text-xs hidden md:inline">Light Mode</span>
            </button>
          </div>
        </div>
      </header>

      {/* Filter bar */}
      <section className="px-6 pt-5 pb-3 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-xs">
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 rounded-full bg-slate-900 text-slate-100">
            Tahun Ajar 2025/2026
          </span>
          <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
            Mode: Sinkron (Live) &amp; Asinkron
          </span>
          <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
            Jurusan: Semua (TKR, TMK, TP)
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              size={16}
            />
            <input
              placeholder="Cari kelas, mapel, atau rombel..."
              className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-zinc-300 bg-white/80 dark:bg-slate-900/60 dark:border-slate-700 outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800">
            <Filter size={14} /> Filter Lanjut
          </button>
        </div>
      </section>

      {/* Grid utama */}
      <main className="px-6 pb-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Kolom kiri: daftar kelas virtual */}
        <aside className="xl:col-span-1 rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 flex flex-col text-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold">Daftar Kelas Virtual</h3>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                {VIRTUAL_CLASSES.length} kelas aktif / terjadwal
              </p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 mt-1">
            {VIRTUAL_CLASSES.map((k) => (
              <button
                key={k.id}
                onClick={() => setSelectedId(k.id)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition ${
                  k.id === selected.id
                    ? "border-cyan-500/70 bg-cyan-500/10"
                    : "border-zinc-200 bg-white/60 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:bg-slate-800"
                }`}
              >
                <p className="text-[13px] font-semibold mb-0.5">
                  {k.namaKelas}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                  {k.mapel}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                  {k.jurusan} · {k.rombel}
                </p>
                <p className="mt-1 text-[11px] text-zinc-500 dark:text-slate-400">
                  {k.jadwalHari} • {k.jadwalJam}
                </p>
                <p className="mt-1 text-[11px] text-zinc-500 dark:text-slate-400">
                  {k.platform} • {k.jumlahSiswa} siswa
                </p>
                <span
                  className={`inline-flex mt-2 items-center gap-1 px-2 py-0.5 rounded-full text-[10px] ${
                    k.status === "Berjalan"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/40"
                      : k.status === "Terjadwal"
                      ? "bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/40"
                      : "bg-zinc-100 text-zinc-600 border border-zinc-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                  }`}
                >
                  <Video size={11} />
                  {k.status}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* Kolom kanan: detail kelas & sesi */}
        <section className="xl:col-span-2 space-y-4 text-xs">
          {/* Ringkasan kelas & tombol aksi */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  {selected.namaKelas}
                </h3>
                <p className="text-xs text-zinc-400 dark:text-slate-400">
                  {selected.mapel} • {selected.jurusan} • {selected.rombel}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
                    <CalendarClock size={12} />
                    {selected.jadwalHari}, {selected.jadwalJam}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
                    <Users size={12} />
                    {selected.jumlahSiswa} siswa terdaftar
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
                    <Monitor size={12} />
                    {selected.platform}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 text-xs">
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500">
                  <Video size={14} />
                  Masuk Kelas Virtual
                </button>
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
                  <Pencil size={14} />
                  Edit Pengaturan Kelas
                </button>
              </div>
            </div>

            <div className="mt-2 rounded-xl border border-dashed border-zinc-300 dark:border-slate-700 p-3 flex flex-col md:flex-row gap-3 text-[11px]">
              <div className="flex-1 space-y-1">
                <p className="font-semibold text-[12px]">Informasi Ruang</p>
                <p className="text-zinc-600 dark:text-slate-300">
                  Kode Ruang:{" "}
                  <span className="font-mono font-semibold">
                    {selected.kodeRuang}
                  </span>
                </p>
                <p className="text-zinc-600 dark:text-slate-300 flex items-center gap-1">
                  <Link2 size={12} className="text-cyan-500" />
                  <span className="truncate">
                    {selected.tautan} (mockup – tidak benar-benar aktif)
                  </span>
                </p>
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-semibold text-[12px]">
                  Integrasi dengan Fitur Lain
                </p>
                <p className="text-zinc-600 dark:text-slate-300">
                  • Terhubung ke <span className="font-semibold">Materi &amp; Tugas</span>  
                  (upload materi, tugas, dan rekaman).
                </p>
                <p className="text-zinc-600 dark:text-slate-300">
                  • Presensi otomatis ke{" "}
                  <span className="font-semibold">
                    Presensi &amp; Jurnal Mengajar
                  </span>
                  .
                </p>
                <p className="text-zinc-600 dark:text-slate-300">
                  • Diskusi dan tanya jawab melalui{" "}
                  <span className="font-semibold">Forum &amp; Pengumuman</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Grid: sesi hari ini & riwayat */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Box status sesi / hari ini */}
            <div className="lg:col-span-1 rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 text-[11px] space-y-3">
              <p className="font-semibold text-[12px] mb-1">
                Status Pertemuan
              </p>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] ${
                    selected.status === "Berjalan"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/40"
                      : selected.status === "Terjadwal"
                      ? "bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/40"
                      : "bg-zinc-100 text-zinc-600 border border-zinc-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                  }`}
                >
                  <Clock size={12} />
                  {selected.status}
                </span>
              </div>
              <p className="text-zinc-600 dark:text-slate-300">
                Dalam implementasi penuh, pada bagian ini guru dapat melihat
                countdown menuju jam mulai, daftar siswa yang sudah join, dan
                tombol untuk menandai pertemuan sebagai selesai.
              </p>
              <div className="space-y-1">
                <p className="font-semibold text-[12px]">Aksi Cepat</p>
                <div className="flex flex-wrap gap-2">
                  <QuickPill icon={<FileText size={12} />} label="Lampirkan Materi" />
                  <QuickPill icon={<MessageCircle size={12} />} label="Kirim Pengumuman" />
                  <QuickPill icon={<CheckCircle2 size={12} />} label="Rekam Presensi" />
                </div>
              </div>
            </div>

            {/* Box riwayat sesi */}
            <div className="lg:col-span-2 rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 text-[11px]">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-[12px]">
                  Riwayat Pertemuan Kelas Virtual
                </p>
                <button className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-zinc-300 bg-white/80 text-[11px] text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
                  <Download size={14} />
                  Export Rekap
                </button>
              </div>

              {sessions.length === 0 ? (
                <p className="text-zinc-500 dark:text-slate-400">
                  Belum ada pertemuan terekam untuk kelas ini.
                </p>
              ) : (
                <div className="space-y-2">
                  {sessions.map((s) => {
                    const persen = Math.round((s.hadir / s.total) * 100);
                    return (
                      <div
                        key={s.id}
                        className="rounded-xl border border-zinc-200 dark:border-slate-700 bg-zinc-50/80 dark:bg-slate-900/40 px-3 py-2 flex flex-col gap-1"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-[12px]">
                              Pertemuan {s.ke}: {s.topik}
                            </p>
                            <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                              {s.tanggal} • {s.jam}
                            </p>
                            <p className="text-[11px] text-zinc-500 dark:text-slate-400 mt-0.5">
                              Kehadiran: {s.hadir}/{s.total} siswa ({persen}
                              %)
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1 text-[10px]">
                            {s.rekaman && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900 text-slate-50 dark:bg-slate-800">
                                <PlayCircle size={11} />
                                Rekaman
                              </span>
                            )}
                            {s.materi && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
                                <FileText size={11} />
                                Materi
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mt-1 flex flex-wrap gap-1 text-[10px] text-zinc-500 dark:text-slate-400">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/80 dark:bg-slate-900/60 border border-zinc-200 dark:border-slate-700">
                            <MessageCircle size={10} />
                            Terhubung ke Forum &amp; Pengumuman
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/80 dark:bg-slate-900/60 border border-zinc-200 dark:border-slate-700">
                            <CheckCircle2 size={10} />
                            Presensi &amp; jurnal tercatat
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

// Helper kecil untuk pill aksi cepat
function QuickPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-zinc-300 bg-white/80 text-[11px] text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
      {icon}
      {label}
    </button>
  );
}

export default KelasVirtualPage;
