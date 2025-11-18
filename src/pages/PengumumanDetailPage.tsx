// src/pages/PengumumanDetailPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Megaphone,
  Users,
  Calendar,
  CheckCircle2,
  Bell,
  Paperclip,
  FileText,
  Download,
} from "lucide-react";

type Reader = {
  id: number;
  nama: string;
  role: "Guru" | "Siswa" | "Wali Kelas" | "Wakasek";
  kelas?: string;
  jurusan?: "TKR" | "TMK" | "TP";
  waktuBaca?: string; // hanya untuk yang sudah baca
};

const PENGUMUMAN_MOCK = {
  id: 4,
  jenis: "Pengumuman Sekolah",
  judul: "Informasi Jadwal Ulangan Akhir Semester (UAS) Ganjil 2025/2026",
  dibuatOleh: "Wakasek Kurikulum",
  jabatan: "Wakasek Kurikulum",
  target: "Seluruh Guru & Siswa TKR, TMK, TP",
  tanggalDibuat: "Jum, 14 November 2025 • 09.15",
  berlakuMulai: "Senin, 01 Desember 2025",
  berlakuSampai: "Jum'at, 12 Desember 2025",
  kanalTampil: [
    "Dashboard Guru",
    "Aplikasi Siswa",
    "Forum & Pengumuman",
    "Kalender Akademik",
  ],
  isi: [
    "Sehubungan dengan akan dilaksanakannya Ulangan Akhir Semester (UAS) Ganjil Tahun Ajar 2025/2026, berikut kami sampaikan informasi jadwal pelaksanaan UAS untuk seluruh jurusan TKR, TMK, dan TP.",
    "Bapak/Ibu Guru diharapkan menyesuaikan Prota & Promes, memberikan penguatan materi, serta menginformasikan kepada peserta didik terkait materi yang akan diujikan.",
    "Siswa diharapkan mempersiapkan diri dengan sebaik-baiknya, menjaga kesehatan, dan hadir tepat waktu sesuai jadwal yang tercantum.",
  ],
  catatanTambahan:
    "Jadwal lengkap UAS dapat diunduh pada lampiran di bawah dan akan otomatis muncul pada Kalender Akademik siswa dan guru.",
  lampiran: [
    {
      id: 1,
      nama: "Jadwal-UAS-Ganjil-2025-2026.pdf",
      tipe: "PDF",
      keterangan: "Jadwal lengkap per hari & sesi",
    },
    {
      id: 2,
      nama: "Pembagian-Ruang-UAS-Ganjil.xlsx",
      tipe: "XLSX",
      keterangan: "Pembagian ruang & pengawas",
    },
  ],
};

const SUDAH_BACA: Reader[] = [
  {
    id: 1,
    nama: "Bapak Budi",
    role: "Guru",
    kelas: "XI TKR 1",
    jurusan: "TKR",
    waktuBaca: "14 Nov 2025 • 10.02",
  },
  {
    id: 2,
    nama: "Ibu Rina",
    role: "Guru",
    kelas: "XI TMK 1",
    jurusan: "TMK",
    waktuBaca: "14 Nov 2025 • 10.15",
  },
  {
    id: 3,
    nama: "Siswa: Andi",
    role: "Siswa",
    kelas: "XI TKR 1",
    jurusan: "TKR",
    waktuBaca: "14 Nov 2025 • 11.20",
  },
  {
    id: 4,
    nama: "Siswa: Siti",
    role: "Siswa",
    kelas: "XI TMK 1",
    jurusan: "TMK",
    waktuBaca: "14 Nov 2025 • 11.45",
  },
];

const BELUM_BACA: Reader[] = [
  {
    id: 5,
    nama: "Siswa: Raka",
    role: "Siswa",
    kelas: "XI TMK 1",
    jurusan: "TMK",
  },
  {
    id: 6,
    nama: "Siswa: Dimas",
    role: "Siswa",
    kelas: "XII TP 1",
    jurusan: "TP",
  },
];

const PengumumanDetailPage: React.FC = () => {
  const totalTarget = SUDAH_BACA.length + BELUM_BACA.length;
  const persenBaca =
    totalTarget === 0
      ? 0
      : Math.round((SUDAH_BACA.length / totalTarget) * 100);

  return (
    <div className="h-full w-full bg-zinc-50 dark:bg-slate-950">
      {/* Topbar */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 dark:bg-slate-950/80 border-b border-zinc-200 dark:border-slate-800">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/forum-pengumuman"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-300 bg-white/80 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <ArrowLeft size={14} />
              Kembali
            </Link>
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Detail Pengumuman
              </h2>
              <p className="text-xs text-zinc-500 dark:text-slate-400">
                Tampilan 1 pengumuman + daftar penerima yang sudah dan belum
                membaca (mockup)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
              <Download size={14} />
              Unduh sebagai PDF
            </button>
          </div>
        </div>
      </header>

      {/* Grid utama */}
      <main className="px-6 pb-8 pt-5 grid grid-cols-1 xl:grid-cols-3 gap-6 text-xs">
        {/* Kolom kiri: isi pengumuman */}
        <section className="xl:col-span-2 space-y-4">
          {/* Info utama pengumuman */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/40 text-[10px]">
                    <Megaphone size={11} />
                    {PENGUMUMAN_MOCK.jenis}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200 text-[10px]">
                    <Users size={11} />
                    {PENGUMUMAN_MOCK.target}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-1">
                  {PENGUMUMAN_MOCK.judul}
                </h3>
                <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                  Dibuat oleh{" "}
                  <span className="font-semibold">
                    {PENGUMUMAN_MOCK.dibuatOleh}
                  </span>{" "}
                  ({PENGUMUMAN_MOCK.jabatan})
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-slate-400 mt-0.5 flex flex-wrap gap-3 items-center">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={11} />
                    Dibuat: {PENGUMUMAN_MOCK.tanggalDibuat}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Bell size={11} />
                    Berlaku: {PENGUMUMAN_MOCK.berlakuMulai} –{" "}
                    {PENGUMUMAN_MOCK.berlakuSampai}
                  </span>
                </p>
              </div>
            </div>

            {/* Isi pengumuman */}
            <div className="mt-3 space-y-2 text-[11px] text-zinc-700 dark:text-slate-200 leading-relaxed">
              {PENGUMUMAN_MOCK.isi.map((par, idx) => (
                <p key={idx}>{par}</p>
              ))}
            </div>

            {/* Catatan & kanal tampil */}
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
              <div className="rounded-xl border border-dashed border-zinc-300 dark:border-slate-700 p-3">
                <p className="font-semibold text-[12px] mb-1">Catatan</p>
                <p className="text-zinc-600 dark:text-slate-300">
                  {PENGUMUMAN_MOCK.catatanTambahan}
                </p>
              </div>
              <div className="rounded-xl border border-dashed border-zinc-300 dark:border-slate-700 p-3">
                <p className="font-semibold text-[12px] mb-1">
                  Muncul di Halaman
                </p>
                <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-slate-300">
                  {PENGUMUMAN_MOCK.kanalTampil.map((k) => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Lampiran */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
            <p className="font-semibold text-[12px] mb-2 flex items-center gap-2">
              <Paperclip size={14} />
              Lampiran Pengumuman
            </p>
            {PENGUMUMAN_MOCK.lampiran.length === 0 ? (
              <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                Belum ada lampiran (mockup).
              </p>
            ) : (
              <ul className="space-y-2 text-[11px]">
                {PENGUMUMAN_MOCK.lampiran.map((l) => (
                  <li
                    key={l.id}
                    className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl border border-zinc-200 bg-white/80 hover:bg-zinc-50 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:bg-slate-800"
                  >
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-cyan-500" />
                      <div>
                        <p className="font-semibold text-[11px]">
                          {l.nama}
                        </p>
                        <p className="text-[10px] text-zinc-500 dark:text-slate-400">
                          {l.keterangan}
                        </p>
                      </div>
                    </div>
                    <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-zinc-300 bg-white/80 text-[10px] text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800">
                      <Download size={12} />
                      Unduh
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Kolom kanan: rekap pembaca */}
        <aside className="xl:col-span-1 space-y-4">
          {/* Ringkas rekap */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
            <p className="font-semibold text-[12px] mb-1 flex items-center gap-2">
              <CheckCircle2 size={14} />
              Rekap Pembaca Pengumuman (Mockup)
            </p>
            <p className="text-[11px] text-zinc-500 dark:text-slate-400 mb-3">
              Data ini menggambarkan berapa guru/siswa yang sudah membuka
              pengumuman pada aplikasi mereka.
            </p>

            <div className="grid grid-cols-3 gap-3 text-[11px]">
              <div className="rounded-xl border border-zinc-200 dark:border-slate-700 bg-zinc-50/80 dark:bg-slate-900/40 p-2.5">
                <p className="text-[10px] text-zinc-500 dark:text-slate-400 mb-0.5">
                  Total Target
                </p>
                <p className="text-lg font-semibold">{totalTarget}</p>
                <p className="text-[10px] text-zinc-500 dark:text-slate-400">
                  Guru &amp; Siswa
                </p>
              </div>
              <div className="rounded-xl border border-emerald-200 dark:border-emerald-500/60 bg-emerald-50/80 dark:bg-emerald-500/10 p-2.5">
                <p className="text-[10px] text-emerald-700 dark:text-emerald-300 mb-0.5">
                  Sudah Baca
                </p>
                <p className="text-lg font-semibold">{SUDAH_BACA.length}</p>
                <p className="text-[10px] text-emerald-700 dark:text-emerald-300">
                  {persenBaca}% dari target
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 dark:border-slate-700 bg-zinc-50/80 dark:bg-slate-900/40 p-2.5">
                <p className="text-[10px] text-zinc-500 dark:text-slate-400 mb-0.5">
                  Belum Baca
                </p>
                <p className="text-lg font-semibold">{BELUM_BACA.length}</p>
                <p className="text-[10px] text-zinc-500 dark:text-slate-400">
                  Potensi perlu follow up
                </p>
              </div>
            </div>

            {/* Progress bar mock */}
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-zinc-500 dark:text-slate-400 mb-1">
                <span>Persentase keterbacaan</span>
                <span>{persenBaca}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-2 rounded-full bg-emerald-500"
                  style={{ width: `${persenBaca}%` }}
                />
              </div>
            </div>
          </div>

          {/* Daftar yang sudah baca */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
            <p className="font-semibold text-[12px] mb-2">
              Sudah Baca ({SUDAH_BACA.length})
            </p>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {SUDAH_BACA.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg border border-emerald-100 bg-emerald-50/80 dark:border-emerald-500/40 dark:bg-emerald-500/10"
                >
                  <div>
                    <p className="text-[11px] font-semibold">{r.nama}</p>
                    <p className="text-[10px] text-emerald-800 dark:text-emerald-200">
                      {r.role}
                      {r.kelas && r.jurusan && (
                        <> • {r.kelas} ({r.jurusan})</>
                      )}
                    </p>
                  </div>
                  {r.waktuBaca && (
                    <p className="text-[10px] text-emerald-800 dark:text-emerald-200">
                      {r.waktuBaca}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Daftar yang belum baca */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
            <p className="font-semibold text-[12px] mb-2">
              Belum Baca ({BELUM_BACA.length})
            </p>
            <p className="text-[11px] text-zinc-500 dark:text-slate-400 mb-2">
              Pada implementasi penuh, guru atau admin dapat mengirim reminder
              khusus (mis. notifikasi aplikasi atau WhatsApp gateway) kepada
              daftar berikut.
            </p>
            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {BELUM_BACA.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg border border-zinc-200 bg-zinc-50/80 dark:border-slate-700 dark:bg-slate-900/40"
                >
                  <div>
                    <p className="text-[11px] font-semibold">{r.nama}</p>
                    <p className="text-[10px] text-zinc-600 dark:text-slate-300">
                      {r.role}
                      {r.kelas && r.jurusan && (
                        <> • {r.kelas} ({r.jurusan})</>
                      )}
                    </p>
                  </div>
                  <button className="text-[10px] px-2 py-0.5 rounded-full border border-zinc-300 bg-white/80 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/60 dark:hover:bg-slate-800">
                    Tandai / Kirim Reminder
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default PengumumanDetailPage;
