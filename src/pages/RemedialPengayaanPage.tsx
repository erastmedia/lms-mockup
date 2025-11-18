// src/pages/RemedialPengayaanPage.tsx
import React, { useState } from "react";
import {
  ClipboardList,
  CheckCircle2,
  AlertTriangle,
  CalendarDays,
  Users,
  BookOpen,
  Filter,
  Download,
  ArrowRight,
  RefreshCcw,
  Bell, Sun
} from "lucide-react";

type Jurusan = "TKR" | "TMK" | "TP";

type ProgramType = "Remedial" | "Pengayaan";

type ProgramRemedial = {
  id: number;
  jenis: ProgramType;
  kelas: string;
  jurusan: Jurusan;
  mapel: string;
  kdFokus: string;
  deskripsiSingkat: string;
  jadwal: string;
  mode: "Tatap Muka" | "Kelas Virtual" | "Campuran";
  kkm: number;
  targetTuntas: string;
};

type Peserta = {
  id: number;
  nama: string;
  nilaiAwal: number;
  status: "Belum Dijadwalkan" | "Terjadwal" | "Sedang Proses" | "Tuntas";
  catatan?: string;
};

const PROGRAMS: ProgramRemedial[] = [
  {
    id: 1,
    jenis: "Remedial",
    kelas: "XI TMK 1",
    jurusan: "TMK",
    mapel: "Sistem Hidrolik Industri",
    kdFokus: "KD 3.2 – Komponen & Simbol Hidrolik",
    deskripsiSingkat:
      "Remedial pemahaman simbol dan komponen utama sistem hidrolik berbasis latihan soal dan diskusi kelompok kecil.",
    jadwal: "Rabu, 15.00–16.30 (Lab TMK)",
    mode: "Campuran",
    kkm: 75,
    targetTuntas: "Minimal 80% siswa mencapai KKM pada KD 3.2.",
  },
  {
    id: 2,
    jenis: "Remedial",
    kelas: "XII TP 1",
    jurusan: "TP",
    mapel: "Teknik Pemesinan Bubut",
    kdFokus: "KD 4.1 – Praktik Setting & Pembubutan",
    deskripsiSingkat:
      "Remedial praktik pembubutan lurus dengan penekanan pada setting parameter dan K3 bengkel.",
    jadwal: "Kamis, 14.00–16.00 (Bengkel TP)",
    mode: "Tatap Muka",
    kkm: 75,
    targetTuntas: "Seluruh peserta mampu menghasilkan poros sesuai toleransi.",
  },
  {
    id: 3,
    jenis: "Pengayaan",
    kelas: "XI TKR 1",
    jurusan: "TKR",
    mapel: "Pemeliharaan Mesin Kendaraan Ringan",
    kdFokus: "Projek Mini – Servis Berkala Lanjutan",
    deskripsiSingkat:
      "Pengayaan projek mini untuk siswa dengan capaian tinggi: simulasi servis berkala lengkap dengan pencatatan job order.",
    jadwal: "Jumat, 13.00–15.00 (Bengkel TKR 1)",
    mode: "Campuran",
    kkm: 80,
    targetTuntas:
      "Artefak projek (job sheet & dokumentasi) siap dijadikan bahan portofolio.",
  },
];

const PESERTA_PER_PROGRAM: Record<number, Peserta[]> = {
  1: [
    {
      id: 1,
      nama: "Andi",
      nilaiAwal: 68,
      status: "Sedang Proses",
      catatan: "Sudah ikut 1 sesi, masih kesulitan membaca diagram rangkaian.",
    },
    {
      id: 2,
      nama: "Budi",
      nilaiAwal: 70,
      status: "Terjadwal",
      catatan: "Belum hadir, baru dijadwalkan pekan ini.",
    },
  ],
  2: [
    {
      id: 3,
      nama: "Siti",
      nilaiAwal: 66,
      status: "Sedang Proses",
      catatan: "Membutuhkan bimbingan lebih pada setting pahat & kecepatan.",
    },
    {
      id: 4,
      nama: "Rizal",
      nilaiAwal: 72,
      status: "Terjadwal",
      catatan: "Belum praktik ulang, baru briefing teori.",
    },
  ],
  3: [
    {
      id: 5,
      nama: "Raka",
      nilaiAwal: 88,
      status: "Tuntas",
      catatan: "Projek mini selesai, siap diunggah ke portofolio.",
    },
    {
      id: 6,
      nama: "Dina",
      nilaiAwal: 90,
      status: "Sedang Proses",
      catatan: "Sedang menyusun laporan projek dan dokumentasi foto.",
    },
  ],
};

const RemedialPengayaanPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(PROGRAMS[0].id);

  const selected =
    PROGRAMS.find((p) => p.id === selectedId) ?? PROGRAMS[0];

  const peserta = PESERTA_PER_PROGRAM[selected.id] ?? [];

  const totalPeserta = peserta.length;
  const tuntas = peserta.filter((p) => p.status === "Tuntas").length;
  const sedangProses = peserta.filter(
    (p) => p.status === "Sedang Proses"
  ).length;
  const belum = peserta.filter(
    (p) => p.status === "Belum Dijadwalkan" || p.status === "Terjadwal"
  ).length;

  const persenTuntas =
    totalPeserta === 0 ? 0 : Math.round((tuntas / totalPeserta) * 100);

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
              Remedial &amp; Pengayaan
            </h2>
            <p className="text-xs text-zinc-500 dark:text-slate-400 flex items-center gap-2">
              <span className="inline-flex items-center gap-1">
                <CalendarDays size={12} />
                {dateStr}
              </span>
              <span className="hidden sm:inline text-zinc-400 dark:text-slate-500">
                •
              </span>
              <span className="hidden sm:inline">
                Terhubung dengan Buku Nilai, Presensi, dan Portofolio &amp; Refleksi.
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
              <Filter size={14} />
              Filter Lanjut
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500">
              <Download size={14} />
              Export Rekap
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

      {/* Chips filter ringkas */}
      <section className="px-6 pt-5 pb-3 flex flex-wrap gap-2 text-xs">
        <span className="px-3 py-1.5 rounded-full bg-slate-900 text-slate-100 flex items-center gap-1">
          Tahun Ajar 2025/2026
        </span>
        <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
          Jenis: Remedial &amp; Pengayaan
        </span>
        <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
          Jurusan: TKR • TMK • TP
        </span>
        <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
          Sumber data: Buku Nilai &amp; Analisis KD
        </span>
      </section>

      {/* Grid utama */}
      <main className="px-6 pb-8 grid grid-cols-1 xl:grid-cols-3 gap-6 text-xs">
        {/* Kolom kiri: daftar program remedial/pengayaan */}
        <section className="xl:col-span-1 space-y-4">
          {/* Ringkasan hari ini */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
            <p className="font-semibold text-[12px] mb-2 flex items-center gap-2">
              <ClipboardList size={14} />
              Ringkasan Program Hari Ini (Mockup)
            </p>
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="rounded-xl border border-zinc-200 dark:border-slate-700 bg-zinc-50/80 dark:bg-slate-900/40 p-2.5">
                <p className="text-[10px] text-zinc-500 dark:text-slate-400 mb-0.5">
                  Total Program
                </p>
                <p className="text-lg font-semibold">{PROGRAMS.length}</p>
                <p className="text-[10px] text-zinc-500 dark:text-slate-400">
                  Remedial &amp; pengayaan aktif
                </p>
              </div>
              <div className="rounded-xl border border-emerald-200 dark:border-emerald-500/60 bg-emerald-50/80 dark:bg-emerald-500/10 p-2.5">
                <p className="text-[10px] text-emerald-700 dark:text-emerald-300 mb-0.5">
                  Tuntas Program Terpilih
                </p>
                <p className="text-lg font-semibold">
                  {persenTuntas}%
                </p>
                <p className="text-[10px] text-emerald-700 dark:text-emerald-300">
                  {tuntas} dari {totalPeserta} peserta
                </p>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-zinc-500 dark:text-slate-400">
              Pada implementasi penuh, kartu ini bisa menampilkan tren beberapa
              pekan terakhir dan jumlah program yang belum terlaksana.
            </p>
          </div>

          {/* Daftar program */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-[12px] flex items-center gap-2">
                <BookOpen size={14} />
                Daftar Program Remedial &amp; Pengayaan
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                {PROGRAMS.length} program
              </p>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 mt-1 pr-1">
              {PROGRAMS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition ${
                    p.id === selected.id
                      ? "border-cyan-500/70 bg-cyan-500/10"
                      : "border-zinc-200 bg-white/60 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <ProgramBadge jenis={p.jenis} />
                    <span className="text-[10px] text-zinc-500 dark:text-slate-400">
                      {p.jadwal}
                    </span>
                  </div>
                  <p className="text-[13px] font-semibold">{p.mapel}</p>
                  <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                    {p.kelas} ({p.jurusan}) • {p.kdFokus}
                  </p>
                  <p className="mt-1 text-[11px] text-zinc-500 dark:text-slate-400 line-clamp-2">
                    {p.deskripsiSingkat}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Kolom kanan: detail program terpilih */}
        <section className="xl:col-span-2 space-y-4">
          {/* Header program terpilih + meta */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ProgramBadge jenis={selected.jenis} />
                  <span className="text-[11px] text-zinc-500 dark:text-slate-400">
                    Mode: {selected.mode}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-1">
                  {selected.mapel}
                </h3>
                <p className="text-xs text-zinc-400 dark:text-slate-400">
                  Kelas {selected.kelas} ({selected.jurusan}) • Fokus:{" "}
                  {selected.kdFokus}
                </p>
                <p className="mt-2 text-[11px] text-zinc-600 dark:text-slate-300">
                  {selected.deskripsiSingkat}
                </p>
                <p className="mt-1 text-[11px] text-zinc-500 dark:text-slate-400">
                  Target ketuntasan:{" "}
                  <span className="font-semibold">
                    {selected.targetTuntas}
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 text-xs">
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
                  <RefreshCcw size={14} />
                  Susun Jadwal Ulang
                </button>
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500">
                  <ArrowRight size={14} />
                  Buat Sesi Remedial/Pengayaan
                </button>
              </div>
            </div>

            {/* Ringkasan angka peserta */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
              <StatChip
                label="Total Peserta"
                value={totalPeserta.toString()}
                tone="blue"
              />
              <StatChip
                label="Sedang Proses"
                value={sedangProses.toString()}
                tone="amber"
              />
              <StatChip
                label="Belum Tuntas"
                value={belum.toString()}
                tone="red"
              />
              <StatChip
                label="Tuntas"
                value={`${tuntas} (${persenTuntas}%)`}
                tone="green"
              />
            </div>
          </div>

          {/* Grid: daftar peserta + keterkaitan ke modul lain */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-[11px]">
            {/* Daftar peserta */}
            <div className="md:col-span-3 rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 flex flex-col">
              <p className="font-semibold text-[12px] mb-1 flex items-center gap-2">
                <Users size={14} />
                Daftar Peserta Program
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400 mb-2">
                Terhubung dengan data nilai &amp; kehadiran siswa di Buku Nilai
                dan Presensi &amp; Jurnal Mengajar.
              </p>
              <div className="flex-1 overflow-y-auto mt-1 pr-1 space-y-1.5">
                {peserta.length === 0 ? (
                  <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                    Belum ada peserta yang ditambahkan dalam program ini (mockup).
                  </p>
                ) : (
                  peserta.map((s) => (
                    <div
                      key={s.id}
                      className="px-3 py-2 rounded-xl border border-zinc-200 bg-white/70 dark:border-slate-700 dark:bg-slate-900/40 flex items-start justify-between gap-2"
                    >
                      <div>
                        <p className="text-[11px] font-semibold">
                          {s.nama}
                        </p>
                        <p className="text-[10px] text-zinc-500 dark:text-slate-400">
                          Nilai awal: {s.nilaiAwal} (KKM {selected.kkm})
                        </p>
                        {s.catatan && (
                          <p className="mt-0.5 text-[10px] text-zinc-500 dark:text-slate-400">
                            Catatan: {s.catatan}
                          </p>
                        )}
                      </div>
                      <StatusPesertaBadge status={s.status} />
                    </div>
                  ))
                )}
              </div>
              <p className="mt-2 text-[11px] text-zinc-500 dark:text-slate-400">
                Pada implementasi penuh, guru dapat langsung input nilai setelah
                sesi remedial/pengayaan dan status akan otomatis berubah menjadi{" "}
                <span className="font-semibold">Tuntas</span> jika memenuhi KKM.
              </p>
            </div>

            {/* Keterkaitan ke Bank Soal, Kelas Virtual, Portofolio */}
            <div className="md:col-span-2 rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 space-y-3">
              <p className="font-semibold text-[12px] mb-1 flex items-center gap-2">
                <AlertTriangle size={14} />
                Integrasi dengan Fitur Lain
              </p>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-zinc-600 dark:text-slate-300">
                <li>
                  Dari <span className="font-semibold">Buku Nilai &amp; Analisis KD</span>, 
                  guru dapat memilih KD yang lemah lalu otomatis membuat program
                  remedial untuk siswa terkait.
                </li>
                <li>
                  Soal-soal remedial dapat diambil dari{" "}
                  <span className="font-semibold">Bank Soal &amp; Template</span>{" "}
                  dan dikirim melalui <span className="font-semibold">Kelas Virtual</span>.
                </li>
                <li>
                  Untuk pengayaan, artefak projek (foto/video/laporan) akan
                  otomatis terbaca di menu{" "}
                  <span className="font-semibold">Portofolio &amp; Refleksi</span>.
                </li>
                <li>
                  Kehadiran di sesi remedial/pengayaan juga tercatat di{" "}
                  <span className="font-semibold">
                    Presensi &amp; Jurnal Mengajar
                  </span>{" "}
                  sebagai aktivitas tambahan.
                </li>
              </ul>
              <div className="mt-3 rounded-xl border border-dashed border-zinc-300 dark:border-slate-700 px-3 py-2 flex items-start gap-2 text-[11px] text-zinc-600 dark:text-slate-300">
                <ClipboardList size={14} className="mt-0.5" />
                <p>
                  Pada implementasi penuh, halaman ini dapat menampilkan{" "}
                  <span className="font-semibold">timeline</span> setiap sesi
                  remedial/pengayaan, lengkap dengan progres per siswa dan tombol
                  cepat untuk mengirim notifikasi ke orang tua/wali.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

function ProgramBadge({ jenis }: { jenis: ProgramType }) {
  if (jenis === "Remedial") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/40 text-[10px]">
        <AlertTriangle size={12} />
        Remedial
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/40 text-[10px]">
      <CheckCircle2 size={12} />
      Pengayaan
    </span>
  );
}

function StatusPesertaBadge({
  status,
}: {
  status:
    | "Belum Dijadwalkan"
    | "Terjadwal"
    | "Sedang Proses"
    | "Tuntas";
}) {
  if (status === "Tuntas") {
    return (
      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/40 text-[10px]">
        Tuntas
      </span>
    );
  }
  if (status === "Sedang Proses") {
    return (
      <span className="px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/40 text-[10px]">
        Sedang proses
      </span>
    );
  }
  if (status === "Terjadwal") {
    return (
      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/40 text-[10px]">
        Sudah dijadwalkan
      </span>
    );
  }
  return (
    <span className="px-2 py-0.5 rounded-full bg-zinc-50 text-zinc-600 border border-zinc-200 dark:bg-slate-900/40 dark:text-slate-300 dark:border-slate-700 text-[10px]">
      Belum dijadwalkan
    </span>
  );
}

function StatChip({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "green" | "blue" | "amber" | "red";
}) {
  const toneClass =
    tone === "green"
      ? "border-emerald-200 dark:border-emerald-500/60 bg-emerald-50/80 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-200"
      : tone === "blue"
      ? "border-sky-200 dark:border-sky-500/60 bg-sky-50/80 dark:bg-sky-500/10 text-sky-800 dark:text-sky-200"
      : tone === "amber"
      ? "border-amber-200 dark:border-amber-500/60 bg-amber-50/80 dark:bg-amber-500/10 text-amber-800 dark:text-amber-200"
      : "border-rose-200 dark:border-rose-500/60 bg-rose-50/80 dark:bg-rose-500/10 text-rose-800 dark:text-rose-200";

  return (
    <div className={`rounded-xl border p-2.5 ${toneClass}`}>
      <p className="text-[10px] mb-0.5">{label}</p>
      <p className="text-base font-semibold">{value}</p>
    </div>
  );
}

export default RemedialPengayaanPage;
