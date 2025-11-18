// src/pages/ProtaPromesPage.tsx
import React, { useState } from "react";
import { PlusCircle, Bell, Search, Filter, Download, Sun } from "lucide-react";

const ProtaPromesPage: React.FC = () => {
  const today = new Date();
  const dateStr = today.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const protaPromes = [
    {
      id: 1,
      mapel: "Pemeliharaan Mesin Kendaraan Ringan",
      jurusan: "TKR",
      kelas: "XI TKR 1",
      semester: "Ganjil",
      fase: "E",
      mingguTotal: 18,
      ringkasan:
        "Servis berkala, sistem pelumasan, dan tune up dasar pada kendaraan ringan sesuai standar bengkel TKR.",
      distribusi: [
        { bulan: "Juli", minggu: "M1–M3", fokus: "Pengenalan & K3 Bengkel" },
        { bulan: "Agustus", minggu: "M4–M7", fokus: "Servis Berkala" },
        { bulan: "September", minggu: "M8–M11", fokus: "Sistem Pelumasan" },
        {
          bulan: "Oktober",
          minggu: "M12–M15",
          fokus: "Diagnosa Kerusakan Ringan",
        },
        { bulan: "November", minggu: "M16–M18", fokus: "Remedial & Pengayaan" },
      ],
    },
    {
      id: 2,
      mapel: "Sistem Hidrolik Industri",
      jurusan: "TMK",
      kelas: "XI TMK 1",
      semester: "Ganjil",
      fase: "E",
      mingguTotal: 16,
      ringkasan:
        "Dasar hidrolik, pengenalan komponen utama, simbol, rangkaian, dan troubleshooting dasar sistem hidrolik.",
      distribusi: [
        { bulan: "Juli", minggu: "M1–M2", fokus: "Konsep Dasar Hidrolik" },
        { bulan: "Agustus", minggu: "M3–M6", fokus: "Komponen & Simbol" },
        { bulan: "September", minggu: "M7–M10", fokus: "Rangkaian Hidrolik" },
        { bulan: "Oktober", minggu: "M11–M14", fokus: "Troubleshooting" },
        { bulan: "November", minggu: "M15–M16", fokus: "Projek Mini & Review" },
      ],
    },
    {
      id: 3,
      mapel: "Teknik Pemesinan Bubut",
      jurusan: "TP",
      kelas: "XII TP 1",
      semester: "Genap",
      fase: "F",
      mingguTotal: 20,
      ringkasan:
        "Pengoperasian mesin bubut untuk pembuatan komponen poros, termasuk pembubutan ulir, taper, dan quality control.",
      distribusi: [
        {
          bulan: "Januari",
          minggu: "M1–M4",
          fokus: "Keselamatan Kerja & Setting Mesin",
        },
        {
          bulan: "Februari",
          minggu: "M5–M8",
          fokus: "Pembubutan Silinder & Muka",
        },
        { bulan: "Maret", minggu: "M9–M13", fokus: "Pembubutan Ulir & Taper" },
        {
          bulan: "April",
          minggu: "M14–M18",
          fokus: "Projek Poros & Quality Control",
        },
        { bulan: "Mei", minggu: "M19–M20", fokus: "Review UKK & Remedial" },
      ],
    },
  ];

  const [selectedId, setSelectedId] = useState<number>(protaPromes[0].id);
  const selected = protaPromes.find((p) => p.id === selectedId)!;

  return (
    <div className="h-full w-full bg-zinc-50 dark:bg-slate-950">
      {/* Topbar */}
      <div className="sticky top-0 z-10 backdrop-blur bg-white/80 dark:bg-slate-950/80 border-b border-zinc-200 dark:border-slate-800">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Prota &amp; Promes
            </h2>
            <p className="text-xs text-zinc-500 dark:text-slate-400">
              {dateStr} · Rencana Tahunan &amp; Semester per mapel kejuruan
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/10 text-cyan-700 hover:bg-cyan-500/20 dark:text-cyan-300 text-xs transition">
              <PlusCircle size={16} /> Tambah Prota/Promes
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
      </div>

      {/* Filter Bar */}
      <div className="px-6 pt-5 pb-3 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
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
              placeholder="Cari Prota / Promes..."
              className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-zinc-300 bg-white/80 dark:bg-slate-900/60 dark:border-slate-700 outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800">
            <Filter size={14} /> Filter Lanjut
          </button>
        </div>
      </div>

      {/* Grid utama */}
      <div className="px-6 pb-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Kolom kiri: daftar Prota & Promes */}
        <div className="xl:col-span-1 rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 flex flex-col text-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold">
                Daftar Prota &amp; Promes
              </h3>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                {protaPromes.length} mapel kejuruan terdaftar
              </p>
            </div>
            <button className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] border border-zinc-300 bg-white/80 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/60 dark:hover:bg-slate-800">
              <Download size={14} /> Export
            </button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 mt-1">
            {protaPromes.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition ${
                  p.id === selected.id
                    ? "border-cyan-500/70 bg-cyan-500/10"
                    : "border-zinc-200 bg-white/60 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:bg-slate-800"
                }`}
              >
                <p className="text-[13px] font-semibold mb-1">{p.mapel}</p>
                <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                  {p.jurusan} • {p.kelas}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-slate-400 mt-0.5">
                  Semester {p.semester} • Fase {p.fase} • {p.mingguTotal} minggu
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Kolom kanan: detail */}
        <div className="xl:col-span-2 space-y-4">
          {/* Ringkasan utama */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
              <div>
                <h3 className="text-lg font-semibold mb-1">{selected.mapel}</h3>
                <p className="text-xs text-zinc-400 dark:text-slate-400">
                  {selected.jurusan} • {selected.kelas} • Semester{" "}
                  {selected.semester} • Fase {selected.fase}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                  <span className="px-2.5 py-1 rounded-full bg-slate-900 text-slate-100 dark:bg-slate-800 dark:text-slate-50">
                    Total {selected.mingguTotal} Minggu Efektif
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
                    Terhubung ke RPP &amp; Jadwal Mengajar
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 text-xs">
                <button className="px-3 py-1.5 rounded-lg bg-cyan-600 text-xs text-white hover:bg-cyan-500">
                  Edit Prota/Promes
                </button>
                <button className="px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
                  Cetak / Unduh
                </button>
              </div>
            </div>
            <div className="space-y-2 mt-2 text-xs">
              <h4 className="font-semibold text-[12px]">
                Ringkasan Prota &amp; Promes
              </h4>
              <p className="text-zinc-500 dark:text-slate-400 leading-relaxed">
                {selected.ringkasan}
              </p>
            </div>
          </div>

          {/* Grid Prota Tahunan & Promes Semester */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Prota Tahunan */}
            <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
              <h4 className="font-semibold text-[12px] mb-2">
                Prota (Program Tahunan)
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400 mb-2">
                Distribusi materi per bulan dan minggu efektif sepanjang tahun
                ajaran.
              </p>
              <div className="border border-zinc-200 dark:border-slate-700 rounded-xl overflow-hidden text-[11px]">
                <div className="grid grid-cols-3 bg-zinc-100/80 dark:bg-slate-900/60">
                  <div className="px-2 py-1.5 font-semibold border-r border-zinc-200 dark:border-slate-800">
                    Bulan
                  </div>
                  <div className="px-2 py-1.5 font-semibold border-r border-zinc-200 dark:border-slate-800">
                    Minggu
                  </div>
                  <div className="px-2 py-1.5 font-semibold">Fokus Materi</div>
                </div>
                {selected.distribusi.map((row) => (
                  <div
                    key={row.bulan + row.minggu}
                    className="grid grid-cols-3 odd:bg-white/80 even:bg-zinc-50/70 dark:odd:bg-slate-900/40 dark:even:bg-slate-900/20 border-t border-zinc-100 dark:border-slate-800"
                  >
                    <div className="px-2 py-1.5 border-r border-zinc-100 dark:border-slate-800">
                      {row.bulan}
                    </div>
                    <div className="px-2 py-1.5 border-r border-zinc-100 dark:border-slate-800">
                      {row.minggu}
                    </div>
                    <div className="px-2 py-1.5">{row.fokus}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Promes Semester */}
            <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
              <h4 className="font-semibold text-[12px] mb-2">
                Promes (Program Semester)
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400 mb-2">
                Gambaran urutan materi per minggu pada semester berjalan,
                terhubung dengan RPP dan jurnal mengajar.
              </p>
              <div className="grid grid-cols-4 gap-2 text-[11px]">
                {Array.from({ length: selected.mingguTotal }).map((_, idx) => {
                  const no = idx + 1;
                  const label = `M${no}`;
                  const isAssessment = no % 6 === 0;
                  return (
                    <div
                      key={label}
                      className={`rounded-lg border px-2 py-1.5 flex flex-col gap-0.5 ${
                        isAssessment
                          ? "border-emerald-400 bg-emerald-50/70 dark:border-emerald-500/70 dark:bg-emerald-500/10"
                          : "border-zinc-200 bg-white/80 dark:border-slate-700 dark:bg-slate-900/40"
                      }`}
                    >
                      <span className="text-[10px] font-semibold">{label}</span>
                      <span className="text-[10px] text-zinc-500 dark:text-slate-400">
                        {isAssessment
                          ? "Evaluasi / Ulangan"
                          : "Materi berkelanjutan"}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-2 text-[11px] text-zinc-500 dark:text-slate-500">
                Catatan: pada implementasi penuh, tiap minggu akan terhubung
                langsung ke RPP, jurnal mengajar, dan status keterlaksanaan.
              </p>
            </div>
          </div>

          {/* Catatan Sinkronisasi */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 text-xs">
            <h4 className="font-semibold text-[12px] mb-2">
              Catatan Sinkronisasi
            </h4>
            <p className="text-[11px] text-zinc-500 dark:text-slate-400 mb-2">
              Prota &amp; Promes pada LMS ini dirancang untuk selalu selaras
              dengan Kurikulum (CP/KD), RPP/Modul Ajar, dan jadwal mengajar
              harian guru. Setiap perubahan pada Prota/Promes dapat memberikan
              rekomendasi penyesuaian terhadap perangkat ajar lain.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px]">
              <SyncCard
                title="Kurikulum & CP/KD"
                desc="CP/KD menjadi dasar penyusunan urutan materi tahunan & semester."
              />
              <SyncCard
                title="RPP / Modul Ajar"
                desc="Setiap minggu pada Promes terhubung ke RPP sesuai topik & KD."
              />
              <SyncCard
                title="Presensi & Jurnal"
                desc="Jurnal mengajar mencatat keterlaksanaan Prota/Promes per minggu."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function SyncCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-dashed border-zinc-300 dark:border-slate-700 p-2">
      <p className="font-semibold mb-1">{title}</p>
      <p className="text-zinc-500 dark:text-slate-400">{desc}</p>
    </div>
  );
}

export default ProtaPromesPage;
