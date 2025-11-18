// src/pages/SkemaPenilaianKkmPage.tsx
import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Percent,
  Scale,
  CheckCircle2,
  ListChecks,
  BarChart3,
  Info,
} from "lucide-react";

type KomponenNilai = {
  jenis: string;
  bobot: number;
  keterangan: string;
};

type KdRow = {
  kode: string;
  deskripsi: string;
  jenis: "Pengetahuan" | "Keterampilan" | "Sikap";
  kkm: number;
};

type Skema = {
  id: number;
  mapel: string;
  jurusan: "TKR" | "TMK" | "TP";
  kelas: string;
  semester: "Ganjil" | "Genap";
  kkmPengetahuan: number;
  kkmKeterampilan: number;
  kkmSikap?: number;
  komponen: KomponenNilai[];
  kd: KdRow[];
  catatan: string;
};

const today = new Date();
const dateStr = today.toLocaleDateString("id-ID", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
});

// ===== dummy data Skema Penilaian & KKM untuk 3 jurusan =====
const SKEMA_LIST: Skema[] = [
  {
    id: 1,
    mapel: "Pemeliharaan Mesin Kendaraan Ringan",
    jurusan: "TKR",
    kelas: "XI TKR 1–2",
    semester: "Ganjil",
    kkmPengetahuan: 75,
    kkmKeterampilan: 78,
    kkmSikap: 80,
    komponen: [
      {
        jenis: "Tugas / Laporan",
        bobot: 20,
        keterangan: "Laporan servis berkala, jurnal praktik bengkel.",
      },
      {
        jenis: "Penilaian Harian (PH)",
        bobot: 25,
        keterangan: "Kuis teori dan soal analisis kerusakan ringan.",
      },
      {
        jenis: "Penilaian Tengah Semester (PTS)",
        bobot: 20,
        keterangan: "Tes teori dan studi kasus bengkel.",
      },
      {
        jenis: "Penilaian Akhir Semester (PAS)",
        bobot: 15,
        keterangan: "Ujian teori komprehensif.",
      },
      {
        jenis: "Praktik Bengkel / Projek",
        bobot: 20,
        keterangan: "Unjuk kerja servis berkala lengkap pada unit kendaraan.",
      },
    ],
    kd: [
      {
        kode: "CP/KD 3.1",
        deskripsi: "Memahami tujuan dan prosedur servis berkala.",
        jenis: "Pengetahuan",
        kkm: 75,
      },
      {
        kode: "CP/KD 4.1",
        deskripsi:
          "Melaksanakan servis berkala sesuai SOP dan menerapkan K3 bengkel.",
        jenis: "Keterampilan",
        kkm: 78,
      },
      {
        kode: "CP/KD Sikap",
        deskripsi: "Menunjukkan disiplin, teliti, dan tanggung jawab.",
        jenis: "Sikap",
        kkm: 80,
      },
    ],
    catatan:
      "Bobot praktik cukup tinggi karena mapel ini menekankan unjuk kerja bengkel. Guru dapat menambah penilaian projek P5 bila diperlukan.",
  },
  {
    id: 2,
    mapel: "Sistem Hidrolik & Pneumatik",
    jurusan: "TMK",
    kelas: "XI TMK 1",
    semester: "Ganjil",
    kkmPengetahuan: 74,
    kkmKeterampilan: 76,
    komponen: [
      {
        jenis: "Tugas Teori",
        bobot: 20,
        keterangan: "Ringkasan materi dan latihan simbol hidrolik.",
      },
      {
        jenis: "PH / Kuis",
        bobot: 25,
        keterangan: "Soal konsep dasar tekanan dan fluida.",
      },
      {
        jenis: "PTS",
        bobot: 20,
        keterangan: "Tes tertulis dan analisis rangkaian.",
      },
      {
        jenis: "Praktik Rangkaian Hidrolik",
        bobot: 25,
        keterangan: "Merangkai dan menguji rangkaian pada trainer.",
      },
      {
        jenis: "Sikap Kerja",
        bobot: 10,
        keterangan: "K3, kerjasama, dan kerapian saat praktik.",
      },
    ],
    kd: [
      {
        kode: "CP/KD 3.2",
        deskripsi: "Menganalisis rangkaian hidrolik sederhana.",
        jenis: "Pengetahuan",
        kkm: 74,
      },
      {
        kode: "CP/KD 4.2",
        deskripsi: "Merangkai dan menguji sistem hidrolik.",
        jenis: "Keterampilan",
        kkm: 76,
      },
    ],
    catatan:
      "KKM sedikit lebih rendah karena tingkat kompleksitas simbol dan rangkaian. Dapat direview kembali setelah satu siklus semester.",
  },
  {
    id: 3,
    mapel: "Teknik Pemesinan Bubut",
    jurusan: "TP",
    kelas: "XII TP 1",
    semester: "Genap",
    kkmPengetahuan: 76,
    kkmKeterampilan: 80,
    komponen: [
      {
        jenis: "Tugas Gambar Kerja",
        bobot: 15,
        keterangan: "Analisis gambar kerja poros dan perhitungan ukuran.",
      },
      {
        jenis: "PH",
        bobot: 20,
        keterangan: "Kuis simbol, alat potong, dan parameter pemotongan.",
      },
      {
        jenis: "PTS",
        bobot: 15,
        keterangan: "Tes teori seputar mesin bubut.",
      },
      {
        jenis: "Praktik Pembuatan Poros",
        bobot: 35,
        keterangan:
          "Unjuk kerja membuat poros sesuai toleransi yang ditentukan.",
      },
      {
        jenis: "Projek / UKK Simulasi",
        bobot: 15,
        keterangan: "Projek mini pra-UKK sebagai persiapan sertifikasi.",
      },
    ],
    kd: [
      {
        kode: "CP/KD 3.3",
        deskripsi: "Memahami proses pembubutan berbagai bentuk.",
        jenis: "Pengetahuan",
        kkm: 76,
      },
      {
        kode: "CP/KD 4.3",
        deskripsi: "Melakukan pembubutan poros sesuai standar.",
        jenis: "Keterampilan",
        kkm: 80,
      },
    ],
    catatan:
      "KKM keterampilan tinggi karena terkait langsung dengan persiapan UKK dan dunia industri.",
  },
];

const SkemaPenilaianKkmPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(SKEMA_LIST[0].id);
  const selected = SKEMA_LIST.find((s) => s.id === selectedId)!;

  const totalBobot = selected.komponen.reduce((sum, k) => sum + k.bobot, 0);

  return (
    <div className="h-full w-full bg-zinc-50 dark:bg-slate-950">
      {/* Topbar */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 dark:bg-slate-950/80 border-b border-zinc-200 dark:border-slate-800">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Skema Penilaian &amp; KKM
            </h2>
            <p className="text-xs text-zinc-500 dark:text-slate-400">
              {dateStr} · Pengaturan bobot nilai &amp; KKM per mapel kejuruan
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition">
              <ListChecks size={16} />
              Tambah Skema
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
              <Download size={16} />
              Export Excel
            </button>
          </div>
        </div>
      </header>

      {/* Filter bar */}
      <section className="px-6 pt-5 pb-3 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-full bg-slate-900 text-slate-100 dark:bg-slate-800 dark:text-slate-50">
            Tahun Ajar 2025/2026
          </span>
          <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
            Semester: Semua
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
              placeholder="Cari mapel atau jurusan..."
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
        {/* Kolom kiri: daftar skema */}
        <aside className="xl:col-span-1 rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 flex flex-col text-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold">Daftar Skema</h3>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                {SKEMA_LIST.length} mapel kejuruan terdaftar
              </p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 mt-1">
            {SKEMA_LIST.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition ${
                  s.id === selected.id
                    ? "border-cyan-500/70 bg-cyan-500/10"
                    : "border-zinc-200 bg-white/60 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:bg-slate-800"
                }`}
              >
                <p className="text-[13px] font-semibold mb-0.5">{s.mapel}</p>
                <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                  {s.jurusan} · {s.kelas}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-slate-400 mt-0.5">
                  Semester {s.semester}
                </p>
              </button>
            ))}
          </div>
        </aside>

        {/* Kolom kanan: detail skema */}
        <section className="xl:col-span-2 space-y-4 text-xs">
          {/* Ringkasan KKM & total bobot */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
              <div>
                <h3 className="text-lg font-semibold mb-1">{selected.mapel}</h3>
                <p className="text-xs text-zinc-400 dark:text-slate-400">
                  {selected.jurusan} · {selected.kelas} · Semester{" "}
                  {selected.semester}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                  <KpiPill
                    icon={<Scale size={12} />}
                    label={`KKM Pengetahuan: ${selected.kkmPengetahuan}`}
                  />
                  <KpiPill
                    icon={<Scale size={12} />}
                    label={`KKM Keterampilan: ${selected.kkmKeterampilan}`}
                  />
                  {selected.kkmSikap && (
                    <KpiPill
                      icon={<Scale size={12} />}
                      label={`KKM Sikap: ${selected.kkmSikap}`}
                    />
                  )}
                  <KpiPill
                    icon={<Percent size={12} />}
                    label={`Total Bobot: ${totalBobot}%`}
                    tone={
                      totalBobot === 100
                        ? "ok"
                        : totalBobot > 100
                        ? "warning"
                        : "info"
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 text-xs">
                <button className="px-3 py-1.5 rounded-lg bg-cyan-600 text-xs text-white hover:bg-cyan-500">
                  Edit Skema
                </button>
                <button className="px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
                  Sinkron ke Buku Nilai
                </button>
              </div>
            </div>

            <div className="mt-2 rounded-xl border border-dashed border-zinc-300 dark:border-slate-700 p-3 text-[11px] flex gap-2">
              <Info size={14} className="mt-0.5 text-cyan-500" />
              <p className="text-zinc-600 dark:text-slate-300 leading-relaxed">
                Skema ini akan digunakan otomatis pada halaman{" "}
                <span className="font-semibold">
                  Buku Nilai &amp; Analisis KD
                </span>{" "}
                serta menjadi dasar penentuan{" "}
                <span className="font-semibold">Remedial &amp; Pengayaan</span>{" "}
                bila nilai siswa berada di bawah KKM.
              </p>
            </div>
          </div>

          {/* Grid: komponen nilai & KKM per KD */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Komponen nilai */}
            <div className="lg:col-span-2 rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
              <h4 className="font-semibold text-[12px] mb-2 flex items-center gap-2">
                <BarChart3 size={14} />
                Komponen Penilaian &amp; Bobot
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400 mb-2">
                Ringkasan bobot nilai yang membentuk nilai akhir raport untuk
                mapel ini.
              </p>
              <div className="border border-zinc-200 dark:border-slate-700 rounded-xl overflow-hidden text-[11px]">
                <div className="grid grid-cols-12 bg-zinc-100/80 dark:bg-slate-900/60">
                  <div className="col-span-5 px-3 py-1.5 font-semibold border-r border-zinc-200 dark:border-slate-800">
                    Komponen
                  </div>
                  <div className="col-span-2 px-3 py-1.5 font-semibold border-r border-zinc-200 dark:border-slate-800 text-right">
                    Bobot
                  </div>
                  <div className="col-span-5 px-3 py-1.5 font-semibold">
                    Keterangan
                  </div>
                </div>
                {selected.komponen.map((k) => (
                  <div
                    key={k.jenis}
                    className="grid grid-cols-12 odd:bg-white/80 even:bg-zinc-50/70 dark:odd:bg-slate-900/40 dark:even:bg-slate-900/20 border-t border-zinc-100 dark:border-slate-800"
                  >
                    <div className="col-span-5 px-3 py-1.5 border-r border-zinc-100 dark:border-slate-800">
                      {k.jenis}
                    </div>
                    <div className="col-span-2 px-3 py-1.5 border-r border-zinc-100 dark:border-slate-800 text-right flex items-center justify-end gap-1">
                      {k.bobot}%
                    </div>
                    <div className="col-span-5 px-3 py-1.5">{k.keterangan}</div>
                  </div>
                ))}
              </div>
              {totalBobot !== 100 && (
                <p className="mt-2 text-[11px] text-amber-600 dark:text-amber-400">
                  Catatan: total bobot saat ini {totalBobot}%. Idealnya total
                  bobot = 100% agar perhitungan nilai lebih konsisten.
                </p>
              )}
            </div>

            {/* Tabel KKM per KD */}
            <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
              <h4 className="font-semibold text-[12px] mb-2 flex items-center gap-2">
                <Scale size={14} />
                KKM per CP/KD
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400 mb-2">
                Menjelaskan ambang minimal ketuntasan tiap kompetensi.
              </p>
              <div className="space-y-2 text-[11px]">
                {selected.kd.map((row) => (
                  <div
                    key={row.kode}
                    className="rounded-xl border border-zinc-200 dark:border-slate-700 bg-zinc-50/80 dark:bg-slate-900/40 px-3 py-2"
                  >
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="font-semibold">{row.kode}</p>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900 text-slate-50 dark:bg-slate-800 text-[10px]">
                        <Scale size={11} />
                        KKM {row.kkm}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-600 dark:text-slate-300">
                      {row.deskripsi}
                    </p>
                    <p className="mt-0.5 text-[10px] text-zinc-500 dark:text-slate-400">
                      Jenis penilaian: {row.jenis}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Catatan implementasi */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 text-[11px]">
            <h4 className="font-semibold text-[12px] mb-2 flex items-center gap-2">
              <CheckCircle2 size={14} />
              Catatan Implementasi di LMS
            </h4>
            <ul className="list-disc list-outside pl-4 space-y-1 text-zinc-600 dark:text-slate-300">
              <li>
                Saat guru mengisi nilai di halaman{" "}
                <span className="font-semibold">Buku Nilai</span>, sistem akan
                otomatis mengalikan skor dengan bobot komponen.
              </li>
              <li>
                Siswa yang nilai akhir di bawah KKM akan otomatis muncul di
                daftar{" "}
                <span className="font-semibold">Remedial &amp; Pengayaan</span>.
              </li>
              <li>
                Admin kurikulum dapat mengunci skema tertentu agar tidak
                sembarang diubah, namun tetap bisa di-clone untuk kelas lain.
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

// === small UI helpers ===
function KpiPill({
  icon,
  label,
  tone = "default",
}: {
  icon?: React.ReactNode;
  label: string;
  tone?: "default" | "ok" | "warning" | "info";
}) {
  let base =
    "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] border";

  if (tone === "ok") {
    base +=
      " bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/40";
  } else if (tone === "warning") {
    base +=
      " bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/40";
  } else if (tone === "info") {
    base +=
      " bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/40";
  } else {
    base +=
      " bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700";
  }

  return (
    <span className={base}>
      {icon}
      {label}
    </span>
  );
}

export default SkemaPenilaianKkmPage;
