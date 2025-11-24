// src/pages/PortofolioRefleksiPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FolderOpen,
  Image as ImageIcon,
  Video,
  FileText,
  Star,
  CheckCircle2,
  Clock,
  Users,
  Filter,
  Download,
  ArrowRight,
  ClipboardList,
  Search,
  Bell, Sun
} from "lucide-react";

type Jurusan = "TKR" | "TMK" | "TP";

type ArtefakType = "Foto" | "Video" | "Dokumen" | "Link";

type Artefak = {
  id: number;
  jenis: ArtefakType;
  judul: string;
  deskripsi: string;
  sumber: "Projek Profil Pancasila" | "PKL" | "Praktik Bengkel" | "Tugas Kelas" | "Projek Mini";
  tanggal: string;
  mapel: string;
  kelas: string;
};

type PortofolioSiswa = {
  id: number;
  nama: string;
  kelas: string;
  jurusan: Jurusan;
  totalArtefak: number;
  artefakUnggulan: number;
  projekAktif: string;
  fokusKompetensi: string;
  catatanRefleksi: string;
};

const PORTOFOLIO: PortofolioSiswa[] = [
  {
    id: 1,
    nama: "Raka Pratama",
    kelas: "XI TKR 1",
    jurusan: "TKR",
    totalArtefak: 12,
    artefakUnggulan: 4,
    projekAktif: "Projek Profil: Layanan Servis Motor Sehat",
    fokusKompetensi: "Servis berkala & komunikasi dengan pelanggan.",
    catatanRefleksi:
      "Mulai percaya diri menjelaskan kerusakan kendaraan ke pelanggan dan menyusun estimasi servis.",
  },
  {
    id: 2,
    nama: "Siti Lestari",
    kelas: "XII TP 1",
    jurusan: "TP",
    totalArtefak: 9,
    artefakUnggulan: 3,
    projekAktif: "PKL: Workshop Bubut CV Sejahtera Teknik",
    fokusKompetensi: "Pembubutan poros & kontrol kualitas hasil kerja.",
    catatanRefleksi:
      "Belajar pentingnya ketelitian pengukuran dan komunikasi dengan mandor bengkel.",
  },
  {
    id: 3,
    nama: "Andi Setiawan",
    kelas: "XI TMK 1",
    jurusan: "TMK",
    totalArtefak: 7,
    artefakUnggulan: 2,
    projekAktif: "Projek Mini: Simulasi Sistem Hidrolik Pres",
    fokusKompetensi: "Membaca diagram hidrolik dan troubleshooting sederhana.",
    catatanRefleksi:
      "Masih perlu latihan untuk menjelaskan alur kerja rangkaian kepada teman lain.",
  },
];

const ARTEFAK_PER_SISWA: Record<number, Artefak[]> = {
  1: [
    {
      id: 1,
      jenis: "Foto",
      judul: "Dokumentasi Servis Berkala Motor Matic",
      deskripsi: "Foto sebelum-sesudah servis, termasuk penggantian oli & filter.",
      sumber: "Praktik Bengkel",
      tanggal: "2025-08-12",
      mapel: "Pemeliharaan Mesin Kendaraan Ringan",
      kelas: "XI TKR 1",
    },
    {
      id: 2,
      jenis: "Video",
      judul: "Penjelasan Proses Tune Up ke Pelanggan",
      deskripsi: "Video simulasi komunikasi dengan pelanggan di bengkel sekolah.",
      sumber: "Tugas Kelas",
      tanggal: "2025-08-20",
      mapel: "Produk Kreatif & Kewirausahaan",
      kelas: "XI TKR 1",
    },
    {
      id: 3,
      jenis: "Dokumen",
      judul: "Job Sheet Servis Berkala",
      deskripsi: "Dokumen job sheet dengan checklist servis dan estimasi biaya.",
      sumber: "Projek Profil Pancasila",
      tanggal: "2025-09-01",
      mapel: "Pemeliharaan Mesin Kendaraan Ringan",
      kelas: "XI TKR 1",
    },
    {
      id: 4,
      jenis: "Foto",
      judul: "Layout Bengkel Mini untuk Projek Profil",
      deskripsi: "Foto penataan area kerja, meja penerimaan, dan display suku cadang.",
      sumber: "Projek Profil Pancasila",
      tanggal: "2025-09-10",
      mapel: "Dasar-Dasar Otomotif",
      kelas: "XI TKR 1",
    },
  ],
  2: [
    {
      id: 5,
      jenis: "Foto",
      judul: "Hasil Pembubutan Poros pada Mesin Bubut Konvensional",
      deskripsi: "Dokumentasi hasil kerja dengan fokus pada kualitas permukaan.",
      sumber: "PKL",
      tanggal: "2025-07-28",
      mapel: "Teknik Pemesinan Bubut",
      kelas: "XII TP 1",
    },
    {
      id: 6,
      jenis: "Dokumen",
      judul: "Laporan Harian PKL Minggu ke-3",
      deskripsi: "Ringkasan aktivitas di bengkel bubut dan refleksi harian.",
      sumber: "PKL",
      tanggal: "2025-08-02",
      mapel: "Teknik Pemesinan Bubut",
      kelas: "XII TP 1",
    },
    {
      id: 7,
      jenis: "Video",
      judul: "Penjelasan Proses Pengukuran dengan Mikrometer",
      deskripsi: "Video pendek menjelaskan cara membaca skala mikrometer luar.",
      sumber: "Tugas Kelas",
      tanggal: "2025-08-10",
      mapel: "Metrologi Industri",
      kelas: "XII TP 1",
    },
  ],
  3: [
    {
      id: 8,
      jenis: "Foto",
      judul: "Mini Panel Simulasi Hidrolik Pres",
      deskripsi: "Foto rangkaian hidrolik sederhana untuk simulasi penekanan.",
      sumber: "Projek Mini",
      tanggal: "2025-08-05",
      mapel: "Sistem Hidrolik Industri",
      kelas: "XI TMK 1",
    },
    {
      id: 9,
      jenis: "Dokumen",
      judul: "Diagram Rangkaian Hidrolik",
      deskripsi: "Skema simbol hidrolik yang digunakan pada projek mini.",
      sumber: "Tugas Kelas",
      tanggal: "2025-08-08",
      mapel: "Sistem Hidrolik Industri",
      kelas: "XI TMK 1",
    },
    {
      id: 10,
      jenis: "Video",
      judul: "Presentasi Kelompok: Alur Kerja Sistem Hidrolik",
      deskripsi:
        "Video presentasi kelompok menjelaskan cara kerja rangkaian hidrolik pres.",
      sumber: "Projek Profil Pancasila",
      tanggal: "2025-08-18",
      mapel: "Sistem Hidrolik Industri",
      kelas: "XI TMK 1",
    },
  ],
};

const PortofolioRefleksiPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(PORTOFOLIO[0].id);

  const selected =
    PORTOFOLIO.find((p) => p.id === selectedId) ?? PORTOFOLIO[0];

  const artefak = ARTEFAK_PER_SISWA[selected.id] ?? [];

  const unggulan = artefak.slice(0, 2); // mockup: 2 artefak unggulan teratas

  const navigate = useNavigate();

  return (
    <div className="h-full w-full bg-zinc-50 dark:bg-slate-950">
      {/* Topbar */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 dark:bg-slate-950/80 border-b border-zinc-200 dark:border-slate-800">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Portofolio &amp; Refleksi Siswa
            </h2>
            <p className="text-xs text-zinc-500 dark:text-slate-400">
              Kumpulan bukti belajar (artefak) dari Projek Profil Pancasila,
              PKL, praktik bengkel, dan tugas kelas untuk jurusan TKR, TMK, dan TP.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
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

      {/* Filter chips */}
      <section className="px-6 pt-5 pb-3 flex flex-wrap gap-2 text-xs">
        <span className="px-3 py-1.5 rounded-full bg-slate-900 text-slate-100 flex items-center gap-1">
          Tahun Ajar 2025/2026
        </span>
        <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
          Sumber: Projek Profil • PKL • Praktik Bengkel
        </span>
        <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
          Jurusan: TKR • TMK • TP
        </span>
        <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
          Terhubung ke Buku Nilai &amp; Remedial
        </span>
      </section>

      {/* Grid utama */}
      <main className="px-6 pb-8 grid grid-cols-1 xl:grid-cols-3 gap-6 text-xs">
        {/* Kolom kiri: daftar siswa & pencarian */}
        <section className="xl:col-span-1 space-y-4">
          {/* Search & ringkasan */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-[12px] flex items-center gap-2">
                <Users size={14} />
                Daftar Siswa &amp; Portofolio
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                {PORTOFOLIO.length} siswa
              </p>
            </div>
            <div className="mb-3 flex items-center gap-2">
              <div className="relative flex-1">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                />
                <input
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 dark:bg-slate-900/60 dark:border-slate-700 outline-none focus:ring-1 focus:ring-cyan-500 text-[11px]"
                  placeholder="Cari berdasarkan nama siswa atau kelas..."
                />
              </div>
            </div>
            <div className="flex-1 max-h-80 overflow-y-auto space-y-2 pr-1">
              {PORTOFOLIO.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition ${
                    p.id === selected.id
                      ? "border-cyan-500/70 bg-cyan-500/10"
                      : "border-zinc-200 bg-white/60 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <p className="text-[13px] font-semibold">{p.nama}</p>
                    <span className="text-[10px] text-zinc-500 dark:text-slate-400">
                      {p.kelas} ({p.jurusan})
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-slate-400 line-clamp-1">
                    Projek Aktif: {p.projekAktif}
                  </p>
                  <div className="mt-1 flex items-center justify-between text-[11px]">
                    <span>Total artefak: {p.totalArtefak}</span>
                    <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-300">
                      <Star size={10} />
                      {p.artefakUnggulan} unggulan
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Keterangan singkat */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
            <p className="font-semibold text-[12px] mb-2 flex items-center gap-2">
              <FolderOpen size={14} />
              Fungsi Halaman Portofolio
            </p>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-zinc-600 dark:text-slate-300">
              <li>Mengumpulkan bukti belajar terbaik per siswa.</li>
              <li>
                Mendukung penyusunan rapor projek, penilaian PKL, dan diskusi
                dengan orang tua.
              </li>
              <li>
                Terhubung dengan nilai sumatif &amp; projek dari Buku Nilai
                serta jadwal dari Kelas Virtual.
              </li>
            </ul>
          </div>
        </section>

        {/* Kolom kanan: detail portofolio siswa terpilih */}
        <section className="xl:col-span-2 space-y-4">
          {/* Ringkasan siswa & refleksi singkat */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-[13px] font-semibold text-white">
                    {selected.nama
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold">
                      {selected.nama}
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                      {selected.kelas} ({selected.jurusan})
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-600 dark:text-slate-300 mt-1">
                  Projek/PKL aktif:{" "}
                  <span className="font-semibold">
                    {selected.projekAktif}
                  </span>
                </p>
                <p className="text-[11px] text-zinc-600 dark:text-slate-300 mt-1">
                  Fokus kompetensi: {selected.fokusKompetensi}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 text-xs">
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
                  <ClipboardList size={14} />
                  Lihat Rekap per Siswa
                </button>
                <button
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500"
                    onClick={() => navigate("/portofolio-refleksi/artefak")}
                    >
                    <ArrowRight size={14} />
                    Buka Detail Artefak
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px] mb-3">
              <StatChip
                label="Total Artefak"
                value={selected.totalArtefak.toString()}
                tone="blue"
              />
              <StatChip
                label="Artefak Unggulan"
                value={selected.artefakUnggulan.toString()}
                tone="amber"
              />
              <StatChip
                label="Keterkaitan KD/CP"
                value="Terpetakan"
                tone="green"
              />
              <StatChip
                label="Status Portofolio"
                value="Siap untuk rapor projek"
                tone="green"
              />
            </div>

            <div className="rounded-xl border border-dashed border-zinc-300 dark:border-slate-700 px-3 py-2 flex items-start gap-2 text-[11px] text-zinc-600 dark:text-slate-300">
              <CheckCircle2 size={14} className="mt-0.5 text-emerald-500" />
              <p>
                <span className="font-semibold">Refleksi singkat siswa:</span>{" "}
                {selected.catatanRefleksi}
              </p>
            </div>
          </div>

          {/* Artefak unggulan + daftar artefak lengkap */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-[11px]">
            {/* Artefak unggulan (kartu besar) */}
            <div className="md:col-span-2 space-y-3">
              <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
                <p className="font-semibold text-[12px] mb-2 flex items-center gap-2">
                  <Star size={14} className="text-amber-500" />
                  Artefak Unggulan
                </p>
                {unggulan.length === 0 ? (
                  <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                    Belum ada artefak unggulan (mockup).
                  </p>
                ) : (
                  <div className="space-y-2">
                    {unggulan.map((a) => (
                      <div
                        key={a.id}
                        className="rounded-xl border border-zinc-200 dark:border-slate-700 bg-zinc-50/80 dark:bg-slate-900/40 px-3 py-2 flex items-start gap-2"
                      >
                        <ArtefakIcon jenis={a.jenis} />
                        <div>
                          <p className="text-[11px] font-semibold">
                            {a.judul}
                          </p>
                          <p className="text-[10px] text-zinc-500 dark:text-slate-400 line-clamp-2">
                            {a.deskripsi}
                          </p>
                          <p className="text-[10px] text-zinc-500 dark:text-slate-400 mt-0.5">
                            {a.tanggal} • {a.mapel} • {a.sumber}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
                <p className="font-semibold text-[12px] mb-1 flex items-center gap-2">
                  <Clock size={14} />
                  Jejak Waktu Portofolio
                </p>
                <p className="text-[11px] text-zinc-600 dark:text-slate-300 mb-2">
                  Pada implementasi penuh, halaman ini dapat menampilkan timeline
                  perkembangan artefak dari awal sampai akhir semester.
                </p>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-zinc-600 dark:text-slate-300">
                  <li>
                    Awal semester: fokus dokumentasi praktik dasar di bengkel.
                  </li>
                  <li>
                    Tengah semester: projek mini &amp; presentasi kelompok.
                  </li>
                  <li>
                    Akhir semester: portofolio siap untuk penilaian sumatif dan
                    rapor projek.
                  </li>
                </ul>
              </div>
            </div>

            {/* Daftar artefak lengkap */}
            <div className="md:col-span-3 rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 flex flex-col">
              <p className="font-semibold text-[12px] mb-2 flex items-center gap-2">
                <FileText size={14} />
                Daftar Artefak Portofolio
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400 mb-2">
                Terhubung dengan Materi &amp; Tugas, Kelas Virtual, dan nilai
                sumatif. Artefak dapat difilter berdasarkan mapel, sumber, atau
                jenis (foto/video/dokumen).
              </p>
              <div className="border border-zinc-200 dark:border-slate-700 rounded-xl overflow-hidden text-[11px]">
                <div className="grid grid-cols-5 bg-zinc-100/80 dark:bg-slate-900/60">
                  <div className="px-2 py-1.5 font-semibold border-r border-zinc-200 dark:border-slate-800">
                    Jenis
                  </div>
                  <div className="px-2 py-1.5 font-semibold border-r border-zinc-200 dark:border-slate-800 col-span-2">
                    Judul
                  </div>
                  <div className="px-2 py-1.5 font-semibold border-r border-zinc-200 dark:border-slate-800">
                    Mapel / Sumber
                  </div>
                  <div className="px-2 py-1.5 font-semibold">
                    Tanggal
                  </div>
                </div>
                {artefak.length === 0 ? (
                  <div className="px-3 py-2 text-[11px] text-zinc-500 dark:text-slate-400">
                    Belum ada artefak untuk siswa ini (mockup).
                  </div>
                ) : (
                  artefak.map((a) => (
                    <div
                      key={a.id}
                      className="grid grid-cols-5 odd:bg-white/80 even:bg-zinc-50/70 dark:odd:bg-slate-900/40 dark:even:bg-slate-900/20 border-t border-zinc-100 dark:border-slate-800"
                    >
                      <div className="px-2 py-1.5 border-r border-zinc-100 dark:border-slate-800 flex items-center gap-1.5">
                        <ArtefakIcon jenis={a.jenis} />
                        <span>{a.jenis}</span>
                      </div>
                      <div className="px-2 py-1.5 border-r border-zinc-100 dark:border-slate-800 col-span-2">
                        <p className="font-semibold">{a.judul}</p>
                        <p className="text-[10px] text-zinc-500 dark:text-slate-400 line-clamp-1">
                          {a.deskripsi}
                        </p>
                      </div>
                      <div className="px-2 py-1.5 border-r border-zinc-100 dark:border-slate-800">
                        <p>{a.mapel}</p>
                        <p className="text-[10px] text-zinc-500 dark:text-slate-400">
                          {a.sumber}
                        </p>
                      </div>
                      <div className="px-2 py-1.5">
                        {a.tanggal}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <p className="mt-2 text-[11px] text-zinc-500 dark:text-slate-400">
                Pada implementasi penuh, setiap artefak dapat diklik untuk membuka
                halaman detail (preview foto/video/dokumen dan catatan refleksi
                lebih lengkap).
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

function ArtefakIcon({ jenis }: { jenis: ArtefakType }) {
  if (jenis === "Foto") {
    return <ImageIcon size={14} className="text-sky-500" />;
  }
  if (jenis === "Video") {
    return <Video size={14} className="text-rose-500" />;
  }
  if (jenis === "Dokumen") {
    return <FileText size={14} className="text-emerald-500" />;
  }
  return <FolderOpen size={14} className="text-zinc-500" />;
}

function StatChip({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "green" | "blue" | "amber";
}) {
  const toneClass =
    tone === "green"
      ? "border-emerald-200 dark:border-emerald-500/60 bg-emerald-50/80 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-200"
      : tone === "blue"
      ? "border-sky-200 dark:border-sky-500/60 bg-sky-50/80 dark:bg-sky-500/10 text-sky-800 dark:text-sky-200"
      : "border-amber-200 dark:border-amber-500/60 bg-amber-50/80 dark:bg-amber-500/10 text-amber-800 dark:text-amber-200";

  return (
    <div className={`rounded-xl border p-2.5 ${toneClass}`}>
      <p className="text-[10px] mb-0.5">{label}</p>
      <p className="text-base font-semibold">{value}</p>
    </div>
  );
}

export default PortofolioRefleksiPage;
