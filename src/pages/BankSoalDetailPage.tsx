// src/pages/BankSoalDetailPage.tsx
import React from "react";
import {
  ArrowLeft,
  BookOpen,
  Layers,
  Tag,
  BarChart2,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Edit3,
  Copy,
  Download,
  Info,
  BookmarkCheck,
  Bell,
  Sun
} from "lucide-react";

type Opsi = {
  kode: "A" | "B" | "C" | "D" | "E";
  teks: string;
};

type DetailSoal = {
  id: string;
  mapel: string;
  jurusan: "TKR" | "TMK" | "TP";
  kelas: string;
  paket: string;
  tipe: "Pilihan Ganda" | "Essay" | "Uraian";
  level: "Mudah" | "Sedang" | "Sulit";
  kd: string;
  indikator: string;
  bobot: number;
  estimasiMenit: number;
  teksSoal: string;
  opsi: Opsi[];
  jawabanBenar: "A" | "B" | "C" | "D" | "E";
  pembahasan: string;
  tags: string[];
  terakhirDipakai: string;
  statistik: {
    totalDikerjakan: number;
    persentaseBenar: number;
    indeksKesukaran: "Mudah" | "Sedang" | "Sulit";
    catatanAnalisis: string;
  };
};

const DUMMY_SOAL: DetailSoal = {
  id: "TKR-PMK-11-001",
  mapel: "Pemeliharaan Mesin Kendaraan Ringan",
  jurusan: "TKR",
  kelas: "XI TKR 1–2",
  paket: "PAS Ganjil 2025/2026",
  tipe: "Pilihan Ganda",
  level: "Sedang",
  kd: "CP/KD 3.1 & 4.1",
  indikator:
    "Diberikan data servis berkala, peserta didik dapat menentukan komponen yang wajib diperiksa sesuai jadwal servis.",
  bobot: 1,
  estimasiMenit: 2,
  teksSoal:
    "Perhatikan data berikut!\n\nSebuah kendaraan ringan direkomendasikan melakukan servis berkala setiap 10.000 km. Pada servis 40.000 km, komponen berikut ini tertera dalam daftar pemeriksaan:\n\n1) Oli mesin\n2) Filter oli\n3) Busi\n4) Kampas rem depan\n\nManakah kombinasi tindakan yang PALING tepat dilakukan pada servis ke-40.000 km sesuai prinsip servis berkala?",
  opsi: [
    {
      kode: "A",
      teks: "Mengganti oli mesin saja karena sudah melewati 10.000 km.",
    },
    {
      kode: "B",
      teks: "Memeriksa kampas rem saja karena terkait keselamatan.",
    },
    {
      kode: "C",
      teks: "Mengganti oli mesin dan memeriksa kondisi komponen lain.",
    },
    {
      kode: "D",
      teks: "Mengganti oli mesin, filter oli, dan memeriksa kampas rem.",
    },
    {
      kode: "E",
      teks: "Mengganti semua komponen (1–4) tanpa pemeriksaan lanjutan.",
    },
  ],
  jawabanBenar: "D",
  pembahasan:
    "Pada servis 40.000 km, umumnya dilakukan penggantian oli mesin dan filter oli, serta pemeriksaan komponen keselamatan seperti kampas rem. Tidak semua komponen selalu wajib diganti selama masih dalam batas keausan. Karena itu opsi yang paling tepat adalah mengganti oli mesin, mengganti filter oli, dan memeriksa kampas rem (opsi D).",
  tags: ["Servis Berkala", "K3 Bengkel", "Pemeliharaan Mesin"],
  terakhirDipakai: "Penilaian Akhir Semester Ganjil 2024/2025",
  statistik: {
    totalDikerjakan: 126,
    persentaseBenar: 68,
    indeksKesukaran: "Sedang",
    catatanAnalisis:
      "Soal berada pada kategori sedang dengan distribusi jawaban cukup baik. Masih ada siswa yang bingung membedakan komponen yang wajib diganti dan diperiksa.",
  },
};

const BankSoalDetailPage: React.FC = () => {
  const soal = DUMMY_SOAL;

  const isBenar = (kode: Opsi["kode"]) => kode === soal.jawabanBenar;

  return (
    <div className="h-full w-full bg-zinc-50 dark:bg-slate-950">
      {/* Topbar */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 dark:bg-slate-950/80 border-b border-zinc-200 dark:border-slate-800">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-300 bg-white/80 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
              <ArrowLeft size={14} />
              Kembali ke Bank Soal
            </button>
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Detail Soal – {soal.id}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-slate-400">
                {soal.mapel} · {soal.jurusan} · {soal.kelas}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition">
              <Eye size={16} />
              Preview di Siswa
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-300 bg-white/90 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
              <Edit3 size={16} />
              Edit Soal
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-300 bg-white/90 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
              <Copy size={16} />
              Duplikasi
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-300 bg-white/90 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
              <Download size={16} />
              Export (Word/PDF)
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

      {/* Konten utama */}
      <main className="px-6 pb-8 pt-5 grid grid-cols-1 xl:grid-cols-3 gap-6 text-xs">
        {/* Kolom kiri (utama) */}
        <section className="xl:col-span-2 space-y-4">
          {/* Info header soal */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/40 p-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 text-slate-100 dark:bg-slate-800 dark:text-slate-50">
                    <BookOpen size={12} />
                    {soal.mapel}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
                    {soal.jurusan} · {soal.kelas}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-200 dark:border-cyan-500/40">
                    <Layers size={12} />
                    {soal.tipe} · Level {soal.level}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                  Paket: <span className="font-semibold">{soal.paket}</span>
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 text-[11px]">
                <p className="text-zinc-500 dark:text-slate-400">
                  Bobot Soal:{" "}
                  <span className="font-semibold text-zinc-800 dark:text-slate-50">
                    {soal.bobot} poin
                  </span>
                </p>
                <p className="text-zinc-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock size={12} />
                  Estimasi waktu:{" "}
                  <span className="font-semibold">
                    {soal.estimasiMenit} menit
                  </span>
                </p>
                <p className="text-[10px] text-zinc-400 dark:text-slate-500">
                  Terakhir dipakai: {soal.terakhirDipakai}
                </p>
              </div>
            </div>

            <div className="mt-2 rounded-xl border border-dashed border-zinc-300 dark:border-slate-700 p-3 flex gap-2">
              <Info size={14} className="mt-0.5 text-cyan-500" />
              <div className="space-y-1">
                <p className="text-[11px] text-zinc-600 dark:text-slate-300">
                  <span className="font-semibold">KD / Tujuan:</span>{" "}
                  {soal.kd}
                </p>
                <p className="text-[11px] text-zinc-600 dark:text-slate-300">
                  <span className="font-semibold">Indikator:</span>{" "}
                  {soal.indikator}
                </p>
              </div>
            </div>
          </div>

          {/* Teks soal */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/40 p-4">
            <h3 className="font-semibold text-[12px] mb-2">
              Teks Soal (Tampilan Guru)
            </h3>
            <div className="text-[12px] text-zinc-800 dark:text-slate-100 whitespace-pre-line leading-relaxed">
              {soal.teksSoal}
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
              {soal.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <Tag size={11} />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Opsi jawaban + kunci */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/40 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-[12px]">
                Opsi Jawaban &amp; Kunci
              </h3>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                Jawaban benar ditandai dengan badge hijau.
              </p>
            </div>

            <div className="space-y-2">
              {soal.opsi.map((o) => {
                const benar = isBenar(o.kode);
                return (
                  <div
                    key={o.kode}
                    className={`flex items-start gap-2 rounded-xl border px-3 py-2 text-[12px] transition ${
                      benar
                        ? "border-emerald-400 bg-emerald-50/80 dark:border-emerald-500/70 dark:bg-emerald-500/10"
                        : "border-zinc-200 bg-white/80 dark:border-slate-700 dark:bg-slate-900/40"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${
                        benar
                          ? "bg-emerald-500 text-white"
                          : "bg-zinc-200 text-zinc-700 dark:bg-slate-800 dark:text-slate-200"
                      }`}
                    >
                      {o.kode}
                    </div>
                    <div className="flex-1 text-zinc-800 dark:text-slate-100">
                      {o.teks}
                    </div>
                    <div className="ml-2">
                      {benar ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500 text-[10px] text-white">
                          <CheckCircle2 size={11} />
                          Kunci
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-100 text-[10px] text-zinc-500 dark:bg-slate-800 dark:text-slate-300">
                          <XCircle size={11} />
                          Distraktor
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-slate-800">
              <p className="text-[11px] font-semibold mb-1">
                Pembahasan / Alasan Kunci:
              </p>
              <p className="text-[11px] text-zinc-700 dark:text-slate-200 leading-relaxed">
                {soal.pembahasan}
              </p>
            </div>
          </div>
        </section>

        {/* Kolom kanan (sidebar info) */}
        <aside className="xl:col-span-1 space-y-4 text-[11px]">
          {/* Metadata singkat soal */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/40 p-4 space-y-2">
            <h3 className="font-semibold text-[12px] mb-1">
              Metadata Soal &amp; Keterkaitan
            </h3>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-zinc-500 dark:text-slate-400">
                  ID Soal
                </span>
                <span className="font-mono text-[11px]">
                  {soal.id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 dark:text-slate-400">
                  Tipe
                </span>
                <span className="font-semibold">{soal.tipe}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 dark:text-slate-400">
                  Level
                </span>
                <span>{soal.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 dark:text-slate-400">
                  Bobot
                </span>
                <span>{soal.bobot} poin</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 dark:text-slate-400">
                  Estimasi waktu
                </span>
                <span>{soal.estimasiMenit} menit</span>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-dashed border-zinc-200 dark:border-slate-700 space-y-1.5">
              <p className="font-semibold text-[11px]">
                Terhubung dengan:
              </p>
              <ul className="space-y-1 text-zinc-600 dark:text-slate-300">
                <li className="flex items-center gap-1.5">
                  <Layers size={12} className="text-cyan-500" />
                  RPP / Modul Ajar – topik servis berkala
                </li>
                <li className="flex items-center gap-1.5">
                  <Layers size={12} className="text-cyan-500" />
                  Buku Nilai &amp; Analisis KD (CP/KD 3.1 &amp; 4.1)
                </li>
                <li className="flex items-center gap-1.5">
                  <Layers size={12} className="text-cyan-500" />
                  Paket {soal.paket}
                </li>
              </ul>
            </div>
          </div>

          {/* Statistik & analisis butir */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/40 p-4 space-y-2">
            <h3 className="font-semibold text-[12px] mb-1 flex items-center gap-2">
              <BarChart2 size={14} />
              Statistik &amp; Analisis Butir
            </h3>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-zinc-500 dark:text-slate-400">
                  Total dikerjakan
                </span>
                <span>{soal.statistik.totalDikerjakan} siswa</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 dark:text-slate-400">
                  Persentase benar
                </span>
                <span>{soal.statistik.persentaseBenar}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 dark:text-slate-400">
                  Indeks kesukaran
                </span>
                <span>{soal.statistik.indeksKesukaran}</span>
              </div>
            </div>

            <div className="mt-2">
              <p className="text-[10px] text-zinc-500 dark:text-slate-400 mb-1">
                Catatan analisis singkat:
              </p>
              <p className="text-[11px] text-zinc-700 dark:text-slate-200 leading-relaxed">
                {soal.statistik.catatanAnalisis}
              </p>
            </div>

            <div className="mt-2 pt-2 border-t border-dashed border-zinc-200 dark:border-slate-700">
              <p className="text-[10px] text-zinc-500 dark:text-slate-400">
                Pada implementasi penuh, bagian ini dapat menampilkan distribusi
                pilihan jawaban per opsi (A–E) serta indeks daya pembeda (discrimination
                index) untuk kebutuhan analisis butir soal.
              </p>
            </div>
          </div>

          {/* Catatan guru / bookmark */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/40 p-4">
            <h3 className="font-semibold text-[12px] mb-2 flex items-center gap-2">
              <BookmarkCheck size={14} />
              Catatan Guru &amp; Bookmark
            </h3>
            <p className="text-[11px] text-zinc-600 dark:text-slate-300 mb-2">
              Guru dapat memberi catatan privat untuk soal ini, misalnya
              pengalaman saat digunakan, kendala siswa, atau rencana revisi.
            </p>
            <div className="rounded-xl border border-dashed border-zinc-300 dark:border-slate-700 px-3 py-2 bg-zinc-50/80 dark:bg-slate-900/40 text-[11px] text-zinc-500 dark:text-slate-300">
              Contoh catatan: “Perlu ditambahkan gambar ilustrasi servis berkala
              agar soal lebih kontekstual pada siswa kelas XI.”
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default BankSoalDetailPage;
