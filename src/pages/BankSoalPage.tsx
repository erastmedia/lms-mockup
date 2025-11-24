import { useState } from "react";
import {
  Filter,
  Search,
  Download,
  FileText,
  FileSpreadsheet,
  FileType,
  StickyNote,
  PlusCircle,
  Bell,
  Sun,
} from "lucide-react";

type SoalItem = {
  id: number;
  mapel: string;
  jurusan: string;
  kelas: string;
  tipe: "PG" | "Essay";
  jumlah: number;
  kodeKd: string;
  status: "Siap Pakai" | "Perlu Revisi" | "Draft";
};

const SOAL_LIST: SoalItem[] = [
  {
    id: 1,
    mapel: "Pemeliharaan Mesin Kendaraan Ringan",
    jurusan: "TKR",
    kelas: "XI TKR 1",
    tipe: "PG",
    jumlah: 30,
    kodeKd: "KD 3.1",
    status: "Siap Pakai",
  },
  {
    id: 2,
    mapel: "Sistem Hidrolik & Pneumatik",
    jurusan: "TMK",
    kelas: "XI TMK 1",
    tipe: "Essay",
    jumlah: 10,
    kodeKd: "KD 3.2",
    status: "Perlu Revisi",
  },
  {
    id: 3,
    mapel: "Teknik Pemesinan Bubut",
    jurusan: "TP",
    kelas: "XII TP 1",
    tipe: "PG",
    jumlah: 25,
    kodeKd: "Projek 1",
    status: "Draft",
  },
];

const TEMPLATES = [
  { label: "Template Soal Pilihan Ganda (PG)", icon: <FileText size={16} /> },
  { label: "Template Soal Essay", icon: <FileText size={16} /> },
  {
    label: "Template Analisis Butir Soal",
    icon: <FileSpreadsheet size={16} />,
  },
  { label: "Template Kisi-Kisi Soal", icon: <FileSpreadsheet size={16} /> },
  {
    label: "Template Lembar Jawaban Siswa (LJS)",
    icon: <FileType size={16} />,
  },
];

export default function BankSoalPage() {
  const [selectedId, setSelectedId] = useState<number>(1);

  const selected = SOAL_LIST.find((s) => s.id === selectedId) ?? SOAL_LIST[0];

  const today = new Date();
  const dateStr = today.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="h-full w-full bg-zinc-50 dark:bg-slate-950">
      {/* Topbar */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 dark:bg-slate-950/80 border-b border-zinc-200 dark:border-slate-800">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Bank Soal &amp; Template
            </h2>
            <p className="text-xs text-zinc-500 dark:text-slate-400">
              {dateStr} · Kumpulan soal &amp; template asesmen SMK Kartek
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition">
              <PlusCircle size={16} />
              Buat Soal Baru
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
              <StickyNote size={16} />
              Gunakan Template
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

      {/* Filter Bar */}
      <section className="px-6 pt-5 pb-3 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-xs">
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 rounded-full bg-slate-900 text-slate-100">
            Tahun Ajar 2025/2026
          </span>
          <span className="px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-slate-800 dark:text-slate-200">
            Semester: Ganjil
          </span>
          <span className="px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-slate-800 dark:text-slate-200">
            Jurusan: Semua
          </span>
          <span className="px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-slate-800 dark:text-slate-200">
            Mapel: Semua
          </span>
        </div>

        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              placeholder="Cari soal atau template..."
              className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-zinc-300 bg-white/80 dark:bg-slate-900/60 dark:border-slate-700 outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800">
            <Filter size={14} /> Filter
          </button>
        </div>
      </section>

      {/* Grid */}
      <main className="px-6 pb-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT: Daftar Soal */}
        <aside className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 flex flex-col text-xs xl:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold">Daftar Soal</h3>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                {SOAL_LIST.length} bank soal tersimpan
              </p>
            </div>
            <button className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] border border-zinc-300 bg-white/80 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/60">
              <Download size={14} />
              Export
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 mt-1">
            {SOAL_LIST.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition ${
                  s.id === selected.id
                    ? "border-cyan-500 bg-cyan-500/10"
                    : "border-zinc-200 bg-white/60 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:bg-slate-800"
                }`}
              >
                <p className="font-semibold text-[13px]">{s.mapel}</p>
                <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                  {s.jurusan} • {s.kelas}
                </p>
                <p className="text-[11px] mt-1 text-zinc-500 dark:text-slate-400">
                  {s.tipe} • {s.jumlah} soal • {s.kodeKd}
                </p>

                {s.status === "Siap Pakai" && (
                  <span className="inline-block mt-2 text-green-600 text-[11px] font-medium">
                    ● Siap Pakai
                  </span>
                )}
                {s.status === "Perlu Revisi" && (
                  <span className="inline-block mt-2 text-amber-600 text-[11px] font-medium">
                    ● Perlu Revisi
                  </span>
                )}
                {s.status === "Draft" && (
                  <span className="inline-block mt-2 text-zinc-400 text-[11px] font-medium">
                    ● Draft
                  </span>
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* RIGHT: Template + Catatan Guru */}
        <section className="xl:col-span-2 space-y-6">
          {/* Templates */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 text-xs">
            <h4 className="font-semibold mb-2 text-[12px]">
              Template Soal &amp; Dokumen
            </h4>

            <ul className="space-y-2">
              {TEMPLATES.map((t, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg border border-zinc-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/40 hover:bg-zinc-100 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  {t.icon}
                  {t.label}
                </li>
              ))}
            </ul>

            <button className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-300 bg-white text-xs hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
              <Download size={14} /> Unduh Semua Template
            </button>
          </div>

          {/* Catatan Guru */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 text-xs">
            <h4 className="font-semibold mb-2 text-[12px]">Catatan Guru</h4>

            <textarea
              placeholder="Area catatan (mockup) – catatan tentang soal, revisi, evaluasi…"
              rows={6}
              className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 outline-none focus:ring-1 focus:ring-cyan-500 resize-none"
            ></textarea>
          </div>
        </section>
      </main>
    </div>
  );
}
