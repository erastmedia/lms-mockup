// src/pages/KurikulumCpkdPage.tsx
import React, { useState } from "react";
import {
  BookOpen,
  Target,
  Layers,
  Search,
  Filter,
  Download,
  Info,
  ChevronRight,
  CheckCircle2,
  ListOrdered,
} from "lucide-react";

type CpRow = {
  kode: string;
  uraian: string;
  fase: string;
};

type KdRow = {
  kode: string;
  uraian: string;
  aspek: "Pengetahuan" | "Keterampilan" | "Sikap";
};

type MapelCpkd = {
  id: number;
  mapel: string;
  jurusan: "TKR" | "TMK" | "TP";
  kelas: string;
  fase: string;
  deskripsi: string;
  jumlahCp: number;
  jumlahKd: number;
  cp: CpRow[];
  kd: KdRow[];
};

const today = new Date();
const dateStr = today.toLocaleDateString("id-ID", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
});

// ===== Dummy data Kurikulum & CP/KD per jurusan SMK Kartek =====
const MAPEL_LIST: MapelCpkd[] = [
  {
    id: 1,
    mapel: "Pemeliharaan Mesin Kendaraan Ringan",
    jurusan: "TKR",
    kelas: "XI TKR 1–2",
    fase: "E",
    deskripsi:
      "Mapel kejuruan yang berfokus pada servis berkala, inspeksi, dan perbaikan ringan kendaraan ringan.",
    jumlahCp: 2,
    jumlahKd: 4,
    cp: [
      {
        kode: "CP TKR-E.1",
        uraian:
          "Peserta didik mampu memahami konsep dasar pemeliharaan mesin kendaraan ringan dan prosedur servis berkala.",
        fase: "E",
      },
      {
        kode: "CP TKR-E.2",
        uraian:
          "Peserta didik mampu melakukan servis berkala dan perbaikan ringan sesuai SOP dan prinsip K3 bengkel.",
        fase: "E",
      },
    ],
    kd: [
      {
        kode: "CP/KD 3.1",
        uraian:
          "Menganalisis tujuan, jadwal, dan prosedur servis berkala pada kendaraan ringan.",
        aspek: "Pengetahuan",
      },
      {
        kode: "CP/KD 4.1",
        uraian:
          "Melaksanakan servis berkala pada kendaraan ringan sesuai manual dan SOP bengkel.",
        aspek: "Keterampilan",
      },
      {
        kode: "CP/KD 3.2",
        uraian:
          "Menjelaskan pemeriksaan visual, pengukuran, dan batas keausan komponen mesin.",
        aspek: "Pengetahuan",
      },
      {
        kode: "CP/KD 4.2",
        uraian:
          "Melakukan pemeriksaan dan penggantian komponen mesin yang aus sesuai standar.",
        aspek: "Keterampilan",
      },
    ],
  },
  {
    id: 2,
    mapel: "Sistem Hidrolik & Pneumatik",
    jurusan: "TMK",
    kelas: "XI TMK 1",
    fase: "E",
    deskripsi:
      "Membahas prinsip dasar fluida, komponen, rangkaian, dan troubleshooting pada sistem hidrolik dan pneumatik industri.",
    jumlahCp: 2,
    jumlahKd: 4,
    cp: [
      {
        kode: "CP TMK-E.1",
        uraian:
          "Peserta didik memahami konsep tekanan, aliran fluida, serta fungsi komponen sistem hidrolik dan pneumatik.",
        fase: "E",
      },
      {
        kode: "CP TMK-E.2",
        uraian:
          "Peserta didik mampu merangkai dan menguji sistem hidrolik dan pneumatik sederhana dengan memperhatikan K3.",
        fase: "E",
      },
    ],
    kd: [
      {
        kode: "CP/KD 3.1",
        uraian:
          "Menganalisis prinsip kerja sistem hidrolik dan pneumatik berdasarkan hukum-hukum fluida.",
        aspek: "Pengetahuan",
      },
      {
        kode: "CP/KD 4.1",
        uraian:
          "Merangkai sistem hidrolik/pneumatik sederhana pada trainer atau simulasi.",
        aspek: "Keterampilan",
      },
      {
        kode: "CP/KD 3.2",
        uraian:
          "Mengidentifikasi simbol dan fungsi komponen utama sistem hidrolik/pneumatik.",
        aspek: "Pengetahuan",
      },
      {
        kode: "CP/KD 4.2",
        uraian:
          "Melakukan pemeriksaan dan perbaikan sederhana terhadap gangguan pada rangkaian hidrolik/pneumatik.",
        aspek: "Keterampilan",
      },
    ],
  },
  {
    id: 3,
    mapel: "Teknik Pemesinan Bubut",
    jurusan: "TP",
    kelas: "XII TP 1",
    fase: "F",
    deskripsi:
      "Mapel kejuruan yang menekankan kemampuan pengoperasian mesin bubut untuk pembuatan komponen poros dan bentuk dasar lainnya.",
    jumlahCp: 2,
    jumlahKd: 4,
    cp: [
      {
        kode: "CP TP-F.1",
        uraian:
          "Peserta didik memahami proses pemesinan bubut dan parameter pemotongan untuk berbagai jenis pekerjaan.",
        fase: "F",
      },
      {
        kode: "CP TP-F.2",
        uraian:
          "Peserta didik mampu mengoperasikan mesin bubut untuk membuat produk yang memenuhi standar toleransi industri.",
        fase: "F",
      },
    ],
    kd: [
      {
        kode: "CP/KD 3.1",
        uraian:
          "Menganalisis gambar kerja, jenis pahat, serta parameter pemotongan pada proses pembubutan.",
        aspek: "Pengetahuan",
      },
      {
        kode: "CP/KD 4.1",
        uraian:
          "Melakukan setting dan pembubutan poros silinder, muka, dan tirus sesuai gambar kerja.",
        aspek: "Keterampilan",
      },
      {
        kode: "CP/KD 3.2",
        uraian:
          "Menjelaskan prosedur pemeriksaan hasil pembubutan berdasarkan standar toleransi.",
        aspek: "Pengetahuan",
      },
      {
        kode: "CP/KD 4.2",
        uraian:
          "Melakukan pengukuran dan pengendalian kualitas hasil pembubutan sesuai standar industri.",
        aspek: "Keterampilan",
      },
    ],
  },
];

const KurikulumCpkdPage: React.FC = () => {
  const [jurusanFilter, setJurusanFilter] = useState<
    "ALL" | "TKR" | "TMK" | "TP"
  >("ALL");
  const [selectedId, setSelectedId] = useState<number>(MAPEL_LIST[0].id);

  const filtered = MAPEL_LIST.filter((m) =>
    jurusanFilter === "ALL" ? true : m.jurusan === jurusanFilter
  );
  const selected =
    filtered.find((m) => m.id === selectedId) ?? filtered[0] ?? MAPEL_LIST[0];

  // jika filter berubah dan selected tidak ada di list, kunci ke item pertama
  React.useEffect(() => {
    if (!filtered.some((m) => m.id === selectedId) && filtered[0]) {
      setSelectedId(filtered[0].id);
    }
  }, [jurusanFilter, selectedId, filtered]);

  return (
    <div className="h-full w-full bg-zinc-50 dark:bg-slate-950">
      {/* Topbar */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 dark:bg-slate-950/80 border-b border-zinc-200 dark:border-slate-800">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Kurikulum &amp; CP/KD
            </h2>
            <p className="text-xs text-zinc-500 dark:text-slate-400">
              {dateStr} · Pemetaan capaian pembelajaran &amp; KD mapel kejuruan
              SMK Kartek
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition">
              <BookOpen size={16} />
              Tambah CP/KD
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
              <Download size={16} />
              Export Dokumen
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
            Fase Kurikulum: E–F
          </span>
          <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
            Merujuk Kurikulum Merdeka SMK Pusat Keunggulan
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              size={16}
            />
            <input
              placeholder="Cari mapel, CP, atau KD..."
              className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-zinc-300 bg-white/80 dark:bg-slate-900/60 dark:border-slate-700 outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800">
            <Filter size={14} /> Filter Lanjut
          </button>
        </div>
      </section>

      {/* Tabs jurusan */}
      <section className="px-6 pb-3 flex flex-wrap gap-2 text-xs">
        {[
          { key: "ALL", label: "Semua Jurusan" },
          { key: "TKR", label: "TKR - Teknik Kendaraan Ringan" },
          { key: "TMK", label: "TMK - Teknik Mekanik Industri" },
          { key: "TP", label: "TP - Teknik Permesinan" },
        ].map((j) => {
          const active = jurusanFilter === (j.key as any);
          return (
            <button
              key={j.key}
              onClick={() =>
                setJurusanFilter(j.key as "ALL" | "TKR" | "TMK" | "TP")
              }
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs transition ${
                active
                  ? "border-cyan-500 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300"
                  : "border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              {j.key !== "ALL" && <Layers size={13} />}
              {j.label}
            </button>
          );
        })}
      </section>

      {/* Grid utama */}
      <main className="px-6 pb-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Kolom kiri: daftar mapel */}
        <aside className="xl:col-span-1 rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 flex flex-col text-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold">Daftar Mapel Kejuruan</h3>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                {filtered.length} mapel dengan CP/KD terdokumentasi
              </p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 mt-1">
            {filtered.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition ${
                  m.id === selected.id
                    ? "border-cyan-500/70 bg-cyan-500/10"
                    : "border-zinc-200 bg-white/60 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:bg-slate-800"
                }`}
              >
                <p className="text-[13px] font-semibold mb-0.5">{m.mapel}</p>
                <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                  {m.jurusan} · {m.kelas}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                  <span>Fase {m.fase}</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
                    <Target size={11} />
                    {m.jumlahCp} CP
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
                    <ListOrdered size={11} />
                    {m.jumlahKd} KD
                  </span>
                </p>
              </button>
            ))}
          </div>
        </aside>

        {/* Kolom kanan: detail CP/KD */}
        <section className="xl:col-span-2 space-y-4 text-xs">
          {/* Ringkasan mapel */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
              <div>
                <h3 className="text-lg font-semibold mb-1">{selected.mapel}</h3>
                <p className="text-xs text-zinc-400 dark:text-slate-400">
                  {selected.jurusan} · {selected.kelas} · Fase {selected.fase}
                </p>
                <p className="mt-2 text-[11px] text-zinc-600 dark:text-slate-300 leading-relaxed">
                  {selected.deskripsi}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 text-xs">
                <button className="px-3 py-1.5 rounded-lg bg-cyan-600 text-xs text-white hover:bg-cyan-500">
                  Edit Kurikulum
                </button>
                <button className="px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
                  Cetak Ringkasan CP/KD
                </button>
              </div>
            </div>

            <div className="mt-2 rounded-xl border border-dashed border-zinc-300 dark:border-slate-700 p-3 text-[11px] flex gap-2">
              <Info size={14} className="mt-0.5 text-cyan-500" />
              <p className="text-zinc-600 dark:text-slate-300 leading-relaxed">
                Data CP/KD di halaman ini terintegrasi dengan{" "}
                <span className="font-semibold">Prota &amp; Promes</span>,{" "}
                <span className="font-semibold">RPP / Modul Ajar</span>, dan{" "}
                <span className="font-semibold">
                  Buku Nilai &amp; Analisis KD
                </span>{" "}
                sehingga guru tidak perlu mengisi ulang kode KD di setiap fitur.
              </p>
            </div>
          </div>

          {/* Grid: tabel CP dan KD */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Tabel CP */}
            <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
              <h4 className="font-semibold text-[12px] mb-2 flex items-center gap-2">
                <Target size={14} />
                Capaian Pembelajaran (CP)
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400 mb-2">
                Rumusan kemampuan akhir fase yang menjadi acuan utama
                perencanaan pembelajaran.
              </p>
              <div className="border border-zinc-200 dark:border-slate-700 rounded-xl overflow-hidden text-[11px]">
                <div className="grid grid-cols-12 bg-zinc-100/80 dark:bg-slate-900/60">
                  <div className="col-span-3 px-3 py-1.5 font-semibold border-r border-zinc-200 dark:border-slate-800">
                    Kode CP
                  </div>
                  <div className="col-span-7 px-3 py-1.5 font-semibold border-r border-zinc-200 dark:border-slate-800">
                    Uraian Capaian
                  </div>
                  <div className="col-span-2 px-3 py-1.5 font-semibold">
                    Fase
                  </div>
                </div>
                {selected.cp.map((cp) => (
                  <div
                    key={cp.kode}
                    className="grid grid-cols-12 odd:bg-white/80 even:bg-zinc-50/70 dark:odd:bg-slate-900/40 dark:even:bg-slate-900/20 border-t border-zinc-100 dark:border-slate-800"
                  >
                    <div className="col-span-3 px-3 py-1.5 border-r border-zinc-100 dark:border-slate-800 font-semibold">
                      {cp.kode}
                    </div>
                    <div className="col-span-7 px-3 py-1.5 border-r border-zinc-100 dark:border-slate-800">
                      {cp.uraian}
                    </div>
                    <div className="col-span-2 px-3 py-1.5 flex items-center gap-1">
                      <ChevronRight size={11} className="text-zinc-400" />
                      {cp.fase}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabel KD */}
            <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
              <h4 className="font-semibold text-[12px] mb-2 flex items-center gap-2">
                <Layers size={14} />
                Tujuan / KD Turunan
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400 mb-2">
                Tujuan pembelajaran yang lebih rinci dan operasional untuk
                dipetakan ke RPP dan aktivitas kelas.
              </p>
              <div className="border border-zinc-200 dark:border-slate-700 rounded-xl overflow-hidden text-[11px]">
                <div className="grid grid-cols-12 bg-zinc-100/80 dark:bg-slate-900/60">
                  <div className="col-span-3 px-3 py-1.5 font-semibold border-r border-zinc-200 dark:border-slate-800">
                    Kode KD
                  </div>
                  <div className="col-span-7 px-3 py-1.5 font-semibold border-r border-zinc-200 dark:border-slate-800">
                    Uraian Tujuan / KD
                  </div>
                  <div className="col-span-2 px-3 py-1.5 font-semibold">
                    Aspek
                  </div>
                </div>
                {selected.kd.map((kd) => (
                  <div
                    key={kd.kode}
                    className="grid grid-cols-12 odd:bg-white/80 even:bg-zinc-50/70 dark:odd:bg-slate-900/40 dark:even:bg-slate-900/20 border-t border-zinc-100 dark:border-slate-800"
                  >
                    <div className="col-span-3 px-3 py-1.5 border-r border-zinc-100 dark:border-slate-800 font-semibold">
                      {kd.kode}
                    </div>
                    <div className="col-span-7 px-3 py-1.5 border-r border-zinc-100 dark:border-slate-800">
                      {kd.uraian}
                    </div>
                    <div className="col-span-2 px-3 py-1.5 flex items-center gap-1">
                      <ChevronRight size={11} className="text-zinc-400" />
                      {kd.aspek}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Catatan keterkaitan fitur */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 text-[11px]">
            <h4 className="font-semibold text-[12px] mb-2 flex items-center gap-2">
              <CheckCircle2 size={14} />
              Keterkaitan dengan Fitur LMS Lain
            </h4>
            <ul className="list-disc list-outside pl-4 space-y-1 text-zinc-600 dark:text-slate-300">
              <li>
                Setiap <span className="font-semibold">RPP / Modul Ajar</span>{" "}
                akan memilih CP dan KD dari data master ini sehingga penulisan
                tetap konsisten.
              </li>
              <li>
                Halaman{" "}
                <span className="font-semibold">Prota &amp; Promes</span>{" "}
                menggunakan CP/KD untuk menyusun urutan materi tahunan dan
                semester.
              </li>
              <li>
                Di{" "}
                <span className="font-semibold">
                  Buku Nilai &amp; Analisis KD
                </span>
                , guru dapat melihat pencapaian nilai siswa per KD berdasarkan
                kode yang sama dengan halaman ini.
              </li>
              <li>
                Saat menyusun{" "}
                <span className="font-semibold">Remedial &amp; Pengayaan</span>,
                sistem dapat menandai KD mana saja yang belum tuntas dan
                membutuhkan intervensi.
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default KurikulumCpkdPage;
