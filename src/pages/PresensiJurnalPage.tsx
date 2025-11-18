// src/pages/PresensiJurnalPage.tsx
import React, { useState } from "react";
import {
  CalendarDays,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  ClipboardList,
  PenLine,
  FileText,
  Bell,
  Sun
} from "lucide-react";

type Jurusan = "TKR" | "TMK" | "TP";

type Session = {
  id: number;
  jamKe: string;
  waktu: string;
  kelas: string;
  jurusan: Jurusan;
  mapel: string;
  ruang?: string;
  totalSiswa: number;
  hadir: number;
  izin: number;
  alpha: number;
  terlambat: number;
  status: "Selesai" | "Sedang Berlangsung" | "Belum Mulai";
  cpKd: string;
  tujuanPembelajaran: string;
  ringkasanKegiatan: string;
  media: string;
  penilaianSingkat: string;
  tindakLanjut: string;
};

const SESSIONS: Session[] = [
  {
    id: 1,
    jamKe: "1–2",
    waktu: "07.15 – 08.45",
    kelas: "XI TKR 1",
    jurusan: "TKR",
    mapel: "Pemeliharaan Mesin Kendaraan Ringan",
    ruang: "Bengkel TKR 1",
    totalSiswa: 36,
    hadir: 34,
    izin: 1,
    alpha: 1,
    terlambat: 2,
    status: "Selesai",
    cpKd:
      "CP Otomotif – KD: Menerapkan servis berkala kendaraan ringan sesuai prosedur dan K3.",
    tujuanPembelajaran:
      "Siswa mampu menjelaskan prosedur servis berkala dan melakukan inspeksi dasar dengan memperhatikan K3 bengkel.",
    ringkasanKegiatan:
      "Pembukaan & apersepsi, penguatan konsep servis berkala, demonstrasi pengecekan oli & filter, praktik berpasangan, dan refleksi singkat.",
    media: "Unit kendaraan praktik, lembar kerja (LK), video pendek servis berkala.",
    penilaianSingkat:
      "Observasi unjuk kerja (praktik), tanya jawab lisan, dan ceklist sikap K3 di bengkel.",
    tindakLanjut:
      "Siswa yang masih keliru dalam membaca dipstick oli dijadwalkan remedial praktik pada pertemuan berikutnya.",
  },
  {
    id: 2,
    jamKe: "3–4",
    waktu: "09.00 – 10.30",
    kelas: "XI TMK 1",
    jurusan: "TMK",
    mapel: "Sistem Hidrolik Industri",
    ruang: "Lab TMK",
    totalSiswa: 32,
    hadir: 31,
    izin: 0,
    alpha: 1,
    terlambat: 1,
    status: "Sedang Berlangsung",
    cpKd:
      "CP Mekanik Industri – KD: Menjelaskan prinsip kerja sistem hidrolik dan komponennya.",
    tujuanPembelajaran:
      "Siswa mampu mengidentifikasi simbol dan komponen utama sistem hidrolik pada rangkaian sederhana.",
    ringkasanKegiatan:
      "Review materi tekanan & fluida, pengenalan simbol hidrolik, analisis rangkaian sederhana, dan diskusi kelompok kecil.",
    media: "Trainer hidrolik, modul cetak, slide presentasi, dan lembar observasi.",
    penilaianSingkat:
      "Kuis singkat 5 soal konsep dasar hidrolik, serta penilaian partisipasi diskusi.",
    tindakLanjut:
      "Siswa yang nilai kuis di bawah KKM diarahkan untuk mengerjakan latihan tambahan melalui LMS.",
  },
  {
    id: 3,
    jamKe: "5–6",
    waktu: "10.45 – 12.15",
    kelas: "XII TP 1",
    jurusan: "TP",
    mapel: "Teknik Pemesinan Bubut",
    ruang: "Bengkel TP",
    totalSiswa: 30,
    hadir: 29,
    izin: 1,
    alpha: 0,
    terlambat: 0,
    status: "Belum Mulai",
    cpKd:
      "CP Teknik Pemesinan – KD: Mengoperasikan mesin bubut untuk membuat komponen poros sederhana.",
    tujuanPembelajaran:
      "Siswa mampu menjelaskan prosedur setting mesin bubut dan melakukan pembubutan lurus dengan parameter yang tepat.",
    ringkasanKegiatan:
      "Pengecekan kesiapan alat & bahan, review K3, demonstrasi setting mesin oleh guru, dan praktik individu membuat poros sederhana.",
    media: "Mesin bubut, alat ukur (kaliper, mikrometer), lembar job sheet.",
    penilaianSingkat:
      "Penilaian produk hasil pembubutan (dimensi & kualitas permukaan) dan kedisiplinan mengikuti prosedur K3.",
    tindakLanjut:
      "Hasil pekerjaan siswa difoto dan diunggah sebagai artefak portofolio praktikum di LMS.",
  },
];

const PresensiJurnalMengajarPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(SESSIONS[0].id);

  const today = new Date();
  const dateStr = today.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const selected =
    SESSIONS.find((s) => s.id === selectedId) ?? SESSIONS[0];

  const totalHadir = SESSIONS.reduce((acc, s) => acc + s.hadir, 0);
  const totalTarget = SESSIONS.reduce((acc, s) => acc + s.totalSiswa, 0);
  const totalAlpha = SESSIONS.reduce((acc, s) => acc + s.alpha, 0);
  const totalTerlambat = SESSIONS.reduce((acc, s) => acc + s.terlambat, 0);

  const persenHadir =
    totalTarget === 0 ? 0 : Math.round((totalHadir / totalTarget) * 100);

  return (
    <div className="h-full w-full bg-zinc-50 dark:bg-slate-950">
      {/* Topbar */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 dark:bg-slate-950/80 border-b border-zinc-200 dark:border-slate-800">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Presensi &amp; Jurnal Mengajar
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
                Terhubung dengan Kelas Virtual, Prota &amp; Promes, dan Buku
                Nilai.
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
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

      {/* Filter / Info chip singkat */}
      <section className="px-6 pt-5 pb-3 flex flex-wrap gap-2 text-xs">
        <span className="px-3 py-1.5 rounded-full bg-slate-900 text-slate-100 flex items-center gap-1">
          <Users size={12} />
          Guru: Bapak Budi (contoh)
        </span>
        <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
          Jurusan: TKR • TMK • TP
        </span>
        <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
          Terhubung ke Presensi Siswa &amp; Jurnal Mengajar (Per Jam)
        </span>
      </section>

      {/* Grid utama */}
      <main className="px-6 pb-8 grid grid-cols-1 xl:grid-cols-3 gap-6 text-xs">
        {/* Kolom kiri: ringkasan & daftar sesi */}
        <section className="xl:col-span-1 space-y-4">
          {/* Ringkasan presensi hari ini */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
            <p className="font-semibold text-[12px] mb-2 flex items-center gap-2">
              <CheckCircle2 size={14} />
              Ringkasan Presensi Hari Ini (Mockup)
            </p>
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="rounded-xl border border-zinc-200 dark:border-slate-700 bg-zinc-50/80 dark:bg-slate-900/40 p-2.5">
                <p className="text-[10px] text-zinc-500 dark:text-slate-400 mb-0.5">
                  Kehadiran
                </p>
                <p className="text-lg font-semibold">{persenHadir}%</p>
                <p className="text-[10px] text-zinc-500 dark:text-slate-400">
                  {totalHadir} dari {totalTarget} siswa
                </p>
              </div>
              <div className="rounded-xl border border-amber-200 dark:border-amber-500/60 bg-amber-50/80 dark:bg-amber-500/10 p-2.5">
                <p className="text-[10px] text-amber-700 dark:text-amber-300 mb-0.5">
                  Terlambat &amp; Alpha
                </p>
                <p className="text-lg font-semibold">
                  {totalTerlambat + totalAlpha}
                </p>
                <p className="text-[10px] text-amber-700 dark:text-amber-300">
                  {totalTerlambat} terlambat • {totalAlpha} alpha
                </p>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-zinc-500 dark:text-slate-400">
              Data di atas merupakan gabungan dari seluruh jam mengajar hari ini.
              Pada implementasi penuh, setiap sesi terhubung langsung dengan
              presensi siswa di aplikasi.
            </p>
          </div>

          {/* Daftar sesi/jam mengajar */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-[12px] flex items-center gap-2">
                <Clock size={14} />
                Jadwal Mengajar Hari Ini
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                {SESSIONS.length} sesi
              </p>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 mt-1 pr-1">
              {SESSIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition ${
                    s.id === selected.id
                      ? "border-cyan-500/70 bg-cyan-500/10"
                      : "border-zinc-200 bg-white/60 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold text-zinc-600 dark:text-slate-200">
                      Jam {s.jamKe} • {s.waktu}
                    </span>
                    <StatusBadge status={s.status} />
                  </div>
                  <p className="text-[13px] font-semibold">{s.mapel}</p>
                  <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                    {s.kelas} ({s.jurusan}){s.ruang ? ` • ${s.ruang}` : ""}
                  </p>
                  <p className="mt-1 text-[11px] text-zinc-500 dark:text-slate-400 flex justify-between">
                    <span>
                      Hadir {s.hadir}/{s.totalSiswa}
                    </span>
                    <span>
                      {s.terlambat} terlambat • {s.alpha} alpha
                    </span>
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Kolom kanan: detail jurnal mengajar sesi terpilih */}
        <section className="xl:col-span-2 space-y-4">
          {/* Header sesi terpilih */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
              <div>
                <p className="text-[11px] text-zinc-500 dark:text-slate-400 mb-1 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={11} />
                    Jam {selected.jamKe} • {selected.waktu}
                  </span>
                  <span className="hidden sm:inline text-zinc-400 dark:text-slate-500">
                    •
                  </span>
                  <span className="hidden sm:inline">
                    Jurnal Mengajar &amp; Presensi Sesi Ini
                  </span>
                </p>
                <h3 className="text-lg font-semibold mb-1">
                  {selected.mapel}
                </h3>
                <p className="text-xs text-zinc-400 dark:text-slate-400">
                  Kelas {selected.kelas} ({selected.jurusan})
                  {selected.ruang ? ` • ${selected.ruang}` : ""}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 text-xs">
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
                  <ClipboardList size={14} />
                  Lihat Presensi Siswa
                </button>
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500">
                  <PenLine size={14} />
                  Edit / Isi Jurnal
                </button>
              </div>
            </div>

            {/* Ringkas angka presensi sesi ini */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
              <StatChip
                label="Hadir"
                value={`${selected.hadir}/${selected.totalSiswa}`}
                tone="green"
              />
              <StatChip
                label="Izin"
                value={selected.izin.toString()}
                tone="blue"
              />
              <StatChip
                label="Terlambat"
                value={selected.terlambat.toString()}
                tone="amber"
              />
              <StatChip
                label="Alpha"
                value={selected.alpha.toString()}
                tone="red"
              />
            </div>
          </div>

          {/* Detail Jurnal Mengajar */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-[11px]">
            {/* Kolom kiri: CP/KD & tujuan */}
            <div className="md:col-span-3 rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 space-y-3">
              <div>
                <p className="font-semibold text-[12px] mb-1 flex items-center gap-2">
                  <FileText size={14} />
                  CP/KD &amp; Tujuan Pembelajaran
                </p>
                <p className="text-zinc-600 dark:text-slate-300 mb-1">
                  <span className="font-semibold">CP/KD: </span>
                  {selected.cpKd}
                </p>
                <p className="text-zinc-600 dark:text-slate-300">
                  <span className="font-semibold">Tujuan: </span>
                  {selected.tujuanPembelajaran}
                </p>
              </div>
              <div>
                <p className="font-semibold text-[12px] mb-1">
                  Ringkasan Kegiatan Pembelajaran
                </p>
                <p className="text-zinc-600 dark:text-slate-300 leading-relaxed">
                  {selected.ringkasanKegiatan}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <p className="font-semibold text-[12px] mb-1">Media &amp; Sumber</p>
                  <p className="text-zinc-600 dark:text-slate-300">
                    {selected.media}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[12px] mb-1">
                    Penilaian Singkat
                  </p>
                  <p className="text-zinc-600 dark:text-slate-300">
                    {selected.penilaianSingkat}
                  </p>
                </div>
              </div>
            </div>

            {/* Kolom kanan: catatan & tindak lanjut */}
            <div className="md:col-span-2 rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 space-y-3">
              <div>
                <p className="font-semibold text-[12px] mb-1 flex items-center gap-2">
                  <AlertCircle size={14} />
                  Catatan Guru (Mockup)
                </p>
                <p className="text-zinc-600 dark:text-slate-300 mb-2">
                  Area ini menggambarkan catatan guru terkait dinamika kelas,
                  hambatan, atau hal-hal khusus yang perlu diingat.
                </p>
                <div className="rounded-xl border border-dashed border-zinc-300 dark:border-slate-700 px-3 py-2 text-[11px] text-zinc-600 dark:text-slate-300">
                  {selected.tindakLanjut}
                </div>
              </div>
              <div>
                <p className="font-semibold text-[12px] mb-1 flex items-center gap-2">
                  <AlertTriangle size={14} />
                  Keterkaitan dengan Remedial &amp; Portofolio
                </p>
                <p className="text-zinc-600 dark:text-slate-300">
                  Siswa yang nilai/kompetensinya belum tuntas pada sesi ini akan
                  otomatis masuk daftar kandidat{" "}
                  <span className="font-semibold">Remedial &amp; Pengayaan</span>{" "}
                  serta dapat dibuatkan artefak di menu{" "}
                  <span className="font-semibold">Portofolio &amp; Refleksi</span>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

function StatusBadge({ status }: { status: Session["status"] }) {
  if (status === "Sedang Berlangsung") {
    return (
      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/40 text-[10px]">
        Sedang berlangsung
      </span>
    );
  }
  if (status === "Selesai") {
    return (
      <span className="px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/40 text-[10px]">
        Selesai
      </span>
    );
  }
  return (
    <span className="px-2 py-0.5 rounded-full bg-zinc-50 text-zinc-600 border border-zinc-200 dark:bg-slate-900/40 dark:text-slate-300 dark:border-slate-700 text-[10px]">
      Belum mulai
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
    <div
      className={`rounded-xl border p-2.5 ${toneClass}`}
    >
      <p className="text-[10px] mb-0.5">{label}</p>
      <p className="text-base font-semibold">{value}</p>
    </div>
  );
}

export default PresensiJurnalMengajarPage;
