// src/pages/BukuNilaiAnalisisPage.tsx
import React, { useState } from "react";
import {
  BarChart3,
  FileText,
  Filter,
  Download,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Bell, Sun
} from "lucide-react";

type Jurusan = "TKR" | "TMK" | "TP";

type KelasMapel = {
  id: number;
  kelas: string;
  jurusan: Jurusan;
  mapel: string;
  fase: "E" | "F";
  semester: "Ganjil" | "Genap";
  rataRata: number;
  ketuntasan: number; // %
  kategori: "Tinggi" | "Sedang" | "Perlu Perhatian";
};

type KDRow = {
  kode: string;
  deskripsi: string;
  rataRata: number;
  ketuntasan: number; // %
};

type SiswaRemedial = {
  id: number;
  nama: string;
  kelas: string;
  jurusan: Jurusan;
  mapel: string;
  kdBermasalah: string;
  nilaiAkhir: number;
  rekomendasi: string;
};

const KELAS_MAPEL: KelasMapel[] = [
  {
    id: 1,
    kelas: "XI TKR 1",
    jurusan: "TKR",
    mapel: "Pemeliharaan Mesin Kendaraan Ringan",
    fase: "E",
    semester: "Ganjil",
    rataRata: 82,
    ketuntasan: 88,
    kategori: "Tinggi",
  },
  {
    id: 2,
    kelas: "XI TMK 1",
    jurusan: "TMK",
    mapel: "Sistem Hidrolik Industri",
    fase: "E",
    semester: "Ganjil",
    rataRata: 76,
    ketuntasan: 72,
    kategori: "Sedang",
  },
  {
    id: 3,
    kelas: "XII TP 1",
    jurusan: "TP",
    mapel: "Teknik Pemesinan Bubut",
    fase: "F",
    semester: "Genap",
    rataRata: 70,
    ketuntasan: 64,
    kategori: "Perlu Perhatian",
  },
];

const KD_PER_KELAS: Record<number, KDRow[]> = {
  1: [
    {
      kode: "KD 3.1",
      deskripsi: "Memahami konsep servis berkala kendaraan ringan.",
      rataRata: 84,
      ketuntasan: 92,
    },
    {
      kode: "KD 3.2",
      deskripsi: "Menganalisis prosedur servis sistem pelumasan.",
      rataRata: 80,
      ketuntasan: 86,
    },
    {
      kode: "KD 4.1",
      deskripsi: "Melakukan servis berkala sesuai SOP dan K3.",
      rataRata: 82,
      ketuntasan: 88,
    },
  ],
  2: [
    {
      kode: "KD 3.1",
      deskripsi: "Menjelaskan prinsip dasar sistem hidrolik.",
      rataRata: 78,
      ketuntasan: 75,
    },
    {
      kode: "KD 3.2",
      deskripsi: "Mengidentifikasi komponen utama sistem hidrolik.",
      rataRata: 74,
      ketuntasan: 70,
    },
    {
      kode: "KD 4.1",
      deskripsi: "Menyusun rangkaian hidrolik sederhana.",
      rataRata: 76,
      ketuntasan: 72,
    },
  ],
  3: [
    {
      kode: "KD 3.1",
      deskripsi: "Memahami parameter pemotongan pada mesin bubut.",
      rataRata: 72,
      ketuntasan: 68,
    },
    {
      kode: "KD 4.1",
      deskripsi: "Mengoperasikan mesin bubut untuk poros sederhana.",
      rataRata: 68,
      ketuntasan: 60,
    },
    {
      kode: "KD 4.2",
      deskripsi: "Melakukan pemeriksaan kualitas hasil pembubutan.",
      rataRata: 70,
      ketuntasan: 64,
    },
  ],
};

const SISWA_REMEDIAL: SiswaRemedial[] = [
  {
    id: 1,
    nama: "Andi",
    kelas: "XI TMK 1",
    jurusan: "TMK",
    mapel: "Sistem Hidrolik Industri",
    kdBermasalah: "KD 3.2",
    nilaiAkhir: 68,
    rekomendasi: "Remedial konsep simbol & komponen hidrolik.",
  },
  {
    id: 2,
    nama: "Siti",
    kelas: "XII TP 1",
    jurusan: "TP",
    mapel: "Teknik Pemesinan Bubut",
    kdBermasalah: "KD 4.1",
    nilaiAkhir: 66,
    rekomendasi: "Remedial praktik setting mesin & pembubutan lurus.",
  },
  {
    id: 3,
    nama: "Raka",
    kelas: "XI TKR 1",
    jurusan: "TKR",
    mapel: "Pemeliharaan Mesin Kendaraan Ringan",
    kdBermasalah: "KD 3.2",
    nilaiAkhir: 70,
    rekomendasi: "Pengayaan teori sistem pelumasan & latihan soal.",
  },
];

const BukuNilaiAnalisisPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(KELAS_MAPEL[0].id);

  const selected =
    KELAS_MAPEL.find((k) => k.id === selectedId) ?? KELAS_MAPEL[0];

  const kdRows = KD_PER_KELAS[selected.id] ?? [];

  const kdTerendah = kdRows.reduce(
    (min, kd) => (kd.ketuntasan < min.ketuntasan ? kd : min),
    kdRows[0] ?? {
      kode: "",
      deskripsi: "",
      rataRata: 0,
      ketuntasan: 0,
    }
  );

  const kdTertinggi = kdRows.reduce(
    (max, kd) => (kd.ketuntasan > max.ketuntasan ? kd : max),
    kdRows[0] ?? {
      kode: "",
      deskripsi: "",
      rataRata: 0,
      ketuntasan: 0,
    }
  );

  const siswaRemedialKelas = SISWA_REMEDIAL.filter(
    (s) => s.kelas === selected.kelas && s.mapel === selected.mapel
  );

  return (
    <div className="h-full w-full bg-zinc-50 dark:bg-slate-950">
      {/* Topbar */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 dark:bg-slate-950/80 border-b border-zinc-200 dark:border-slate-800">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Buku Nilai &amp; Analisis KD
            </h2>
            <p className="text-xs text-zinc-500 dark:text-slate-400">
              Ringkasan nilai per kelas &amp; mapel kejuruan, dilengkapi analisis
              ketuntasan KD dan daftar siswa yang membutuhkan remedial.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
              <Filter size={14} />
              Filter Lanjut
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500">
              <Download size={14} />
              Export ke Excel
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
          Semester: Semua
        </span>
        <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
          Jurusan: TKR • TMK • TP
        </span>
        <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
          Terhubung ke Remedial &amp; Portofolio
        </span>
      </section>

      {/* Grid utama */}
      <main className="px-6 pb-8 grid grid-cols-1 xl:grid-cols-3 gap-6 text-xs">
        {/* Kolom kiri: daftar kelas & mapel */}
        <section className="xl:col-span-1 space-y-4">
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-[12px] flex items-center gap-2">
                <FileText size={14} />
                Daftar Kelas &amp; Mapel
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                {KELAS_MAPEL.length} entri
              </p>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 mt-1 pr-1">
              {KELAS_MAPEL.map((k) => (
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
                    {k.mapel}
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                    {k.kelas} ({k.jurusan}) • Fase {k.fase} • Semester{" "}
                    {k.semester}
                  </p>
                  <div className="mt-1 flex items-center justify-between text-[11px]">
                    <span>Rata-rata: {k.rataRata}</span>
                    <span>Ketuntasan: {k.ketuntasan}%</span>
                  </div>
                  <KategoriBadge kategori={k.kategori} />
                </button>
              ))}
            </div>
          </div>

          {/* Ringkasan singkat terpilih */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
            <p className="font-semibold text-[12px] mb-2 flex items-center gap-2">
              <BarChart3 size={14} />
              Ringkasan Kelas Terpilih
            </p>
            <p className="text-[11px] text-zinc-600 dark:text-slate-300 mb-1">
              {selected.mapel} • {selected.kelas} ({selected.jurusan})
            </p>
            <p className="text-[11px] text-zinc-500 dark:text-slate-400 mb-3">
              Fase {selected.fase} • Semester {selected.semester}
            </p>
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="rounded-xl border border-zinc-200 dark:border-slate-700 bg-zinc-50/80 dark:bg-slate-900/40 p-2.5">
                <p className="text-[10px] text-zinc-500 dark:text-slate-400 mb-0.5">
                  Rata-rata Nilai
                </p>
                <p className="text-lg font-semibold">{selected.rataRata}</p>
              </div>
              <div className="rounded-xl border border-emerald-200 dark:border-emerald-500/60 bg-emerald-50/80 dark:bg-emerald-500/10 p-2.5">
                <p className="text-[10px] text-emerald-700 dark:text-emerald-300 mb-0.5">
                  Ketuntasan
                </p>
                <p className="text-lg font-semibold">
                  {selected.ketuntasan}%
                </p>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-zinc-500 dark:text-slate-400">
              Pada implementasi penuh, guru dapat menggali nilai per tugas,
              ujian, dan kategori penilaian dari halaman ini.
            </p>
          </div>
        </section>

        {/* Kolom kanan: tabel KD + siswa remedial */}
        <section className="xl:col-span-2 space-y-4">
          {/* Analisis per KD */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
              <div>
                <p className="font-semibold text-[12px] mb-1 flex items-center gap-2">
                  <BarChart3 size={14} />
                  Analisis Nilai per KD
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                  Menampilkan rata-rata nilai dan persentase ketuntasan per KD
                  untuk kelas &amp; mapel terpilih.
                </p>
              </div>
              {kdRows.length > 0 && (
                <div className="flex flex-col items-end gap-1 text-[11px] text-zinc-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <ArrowUpRight size={12} className="text-emerald-500" />
                    KD paling kuat:{" "}
                    <strong>
                      {kdTertinggi.kode} ({kdTertinggi.ketuntasan}%)
                    </strong>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <ArrowDownRight size={12} className="text-rose-500" />
                    KD perlu perhatian:{" "}
                    <strong>
                      {kdTerendah.kode} ({kdTerendah.ketuntasan}%)
                    </strong>
                  </span>
                </div>
              )}
            </div>

            <div className="border border-zinc-200 dark:border-slate-700 rounded-xl overflow-hidden text-[11px]">
              <div className="grid grid-cols-4 bg-zinc-100/80 dark:bg-slate-900/60">
                <div className="px-2 py-1.5 font-semibold border-r border-zinc-200 dark:border-slate-800">
                  KD
                </div>
                <div className="px-2 py-1.5 font-semibold border-r border-zinc-200 dark:border-slate-800 col-span-2">
                  Deskripsi
                </div>
                <div className="px-2 py-1.5 font-semibold">Rata2 / Ketuntasan</div>
              </div>
              {kdRows.length === 0 ? (
                <div className="px-3 py-2 text-[11px] text-zinc-500 dark:text-slate-400">
                  Belum ada data KD (mockup).
                </div>
              ) : (
                kdRows.map((kd) => (
                  <div
                    key={kd.kode}
                    className="grid grid-cols-4 odd:bg-white/80 even:bg-zinc-50/70 dark:odd:bg-slate-900/40 dark:even:bg-slate-900/20 border-t border-zinc-100 dark:border-slate-800"
                  >
                    <div className="px-2 py-1.5 border-r border-zinc-100 dark:border-slate-800">
                      <span className="font-semibold">{kd.kode}</span>
                    </div>
                    <div className="px-2 py-1.5 border-r border-zinc-100 dark:border-slate-800 col-span-2">
                      {kd.deskripsi}
                    </div>
                    <div className="px-2 py-1.5 flex flex-col gap-0.5">
                      <span>Rata-rata: {kd.rataRata}</span>
                      <span
                        className={
                          kd.ketuntasan >= 85
                            ? "text-emerald-600 dark:text-emerald-300"
                            : kd.ketuntasan >= 70
                            ? "text-amber-600 dark:text-amber-300"
                            : "text-rose-600 dark:text-rose-300"
                        }
                      >
                        Ketuntasan: {kd.ketuntasan}%
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <p className="mt-2 text-[11px] text-zinc-500 dark:text-slate-400">
              Pada implementasi penuh, warna baris/kolom dapat dijadikan
              heatmap visual untuk memudahkan guru membaca kekuatan dan
              kelemahan kompetensi.
            </p>
          </div>

          {/* Siswa remedial & pengayaan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px]">
            <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
              <p className="font-semibold text-[12px] mb-1 flex items-center gap-2">
                <AlertCircle size={14} />
                Daftar Siswa Perlu Remedial (Mockup)
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400 mb-2">
                Menampilkan siswa yang nilai akhirnya di bawah KKM atau ketuntasan KD
                tertentu masih rendah.
              </p>
              {siswaRemedialKelas.length === 0 ? (
                <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                  Untuk kelas ini belum ada siswa yang masuk daftar remedial
                  (mockup).
                </p>
              ) : (
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {siswaRemedialKelas.map((s) => (
                    <div
                      key={s.id}
                      className="px-3 py-2 rounded-xl border border-amber-200 bg-amber-50/80 dark:border-amber-500/60 dark:bg-amber-500/10"
                    >
                      <p className="text-[11px] font-semibold">{s.nama}</p>
                      <p className="text-[10px] text-amber-800 dark:text-amber-200">
                        {s.kelas} ({s.jurusan}) • {s.mapel}
                      </p>
                      <p className="text-[10px] text-amber-800 dark:text-amber-200 mt-0.5">
                        KD bermasalah: {s.kdBermasalah} • Nilai: {s.nilaiAkhir}
                      </p>
                      <p className="text-[10px] text-amber-800 dark:text-amber-200 mt-0.5">
                        Rekomendasi: {s.rekomendasi}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
              <p className="font-semibold text-[12px] mb-1 flex items-center gap-2">
                <CheckCircle2 size={14} />
                Keterkaitan dengan Portofolio &amp; Presensi
              </p>
              <p className="text-[11px] text-zinc-600 dark:text-slate-300 mb-2">
                Analisis nilai ini tidak berdiri sendiri, tetapi terhubung
                dengan data kehadiran dan artefak portofolio siswa.
              </p>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-zinc-600 dark:text-slate-300">
                <li>
                  Siswa dengan ketidakhadiran tinggi akan diberi penanda khusus
                  pada grafik nilai.
                </li>
                <li>
                  Nilai praktik dapat dikaitkan dengan artefak portofolio (foto
                  hasil kerja, video praktik, dan sebagainya).
                </li>
                <li>
                  Guru dapat langsung membuat jadwal{" "}
                  <span className="font-semibold">
                    Remedial &amp; Pengayaan
                  </span>{" "}
                  dari daftar siswa di sebelah kiri.
                </li>
                <li>
                  Rekap per KD ini menjadi dasar input rapor projek dan diskusi
                  dengan wali kelas atau orang tua.
                </li>
              </ul>
              <div className="mt-3 rounded-xl border border-dashed border-zinc-300 dark:border-slate-700 px-3 py-2 flex items-start gap-2 text-[11px] text-zinc-600 dark:text-slate-300">
                <Users size={14} className="mt-0.5" />
                <p>
                  Pada implementasi penuh, halaman ini juga dapat menyediakan{" "}
                  <span className="font-semibold">grafik garis atau batang</span>{" "}
                  perkembangan nilai per siswa dan per KD sepanjang satu
                  semester.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

function KategoriBadge({
  kategori,
}: {
  kategori: KelasMapel["kategori"];
}) {
  if (kategori === "Tinggi") {
    return (
      <span className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/40 text-[10px]">
        <CheckCircle2 size={12} />
        Kategori tinggi
      </span>
    );
  }
  if (kategori === "Sedang") {
    return (
      <span className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/40 text-[10px]">
        <AlertCircle size={12} />
        Kategori sedang
      </span>
    );
  }
  return (
    <span className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/40 text-[10px]">
      <AlertCircle size={12} />
      Perlu perhatian
    </span>
  );
}

export default BukuNilaiAnalisisPage;
