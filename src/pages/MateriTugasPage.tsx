// src/pages/MateriTugasPage.tsx
import React, { useState } from "react";
import {
  Search,
  Filter,
  FileText,
  PlayCircle,
  Paperclip,
  MessageCircle,
  CheckCircle2,
  Clock,
  Download,
  UploadCloud,
  PlusCircle,
  BookOpen,
  ClipboardList,
  Link2,
  Bell,
  Sun
} from "lucide-react";

type Attachment = {
  id: number;
  nama: string;
  tipe: "Video" | "PDF" | "DOCX" | "Lainnya";
};

type MateriTugasItem = {
  id: number;
  jenis: "Materi" | "Tugas";
  pertemuanKe: number;
  kelasVirtual: string;
  mapel: string;
  jurusan: "TKR" | "TMK" | "TP";
  rombel: string;
  judul: string;
  deskripsiSingkat: string;
  tanggal: string;
  tenggat?: string; // untuk tugas
  status: "Draft" | "Dipublikasikan" | "Ditutup";
  jumlahLampiran: number;
  sudahDinilai?: boolean;
};

const MATERI_TUGAS_LIST: MateriTugasItem[] = [
  {
    id: 1,
    jenis: "Materi",
    pertemuanKe: 5,
    kelasVirtual: "Kelas Virtual XI TKR 1",
    mapel: "Pemeliharaan Mesin Kendaraan Ringan",
    jurusan: "TKR",
    rombel: "XI TKR 1",
    judul: "Materi K3 Bengkel & Servis Berkala",
    deskripsiSingkat:
      "Slide dan handout terkait keselamatan kerja di bengkel dan prosedur servis berkala.",
    tanggal: "Sen, 17 Nov 2025",
    status: "Dipublikasikan",
    jumlahLampiran: 2,
  },
  {
    id: 2,
    jenis: "Tugas",
    pertemuanKe: 5,
    kelasVirtual: "Kelas Virtual XI TKR 1",
    mapel: "Pemeliharaan Mesin Kendaraan Ringan",
    jurusan: "TKR",
    rombel: "XI TKR 1",
    judul: "Tugas Analisis Servis Berkala",
    deskripsiSingkat:
      "Siswa diminta menganalisis checklist servis berkala dan mengisi lembar kerja.",
    tanggal: "Sen, 17 Nov 2025",
    tenggat: "Jum, 21 Nov 2025 • 23.59",
    status: "Dipublikasikan",
    jumlahLampiran: 1,
    sudahDinilai: false,
  },
  {
    id: 3,
    jenis: "Materi",
    pertemuanKe: 3,
    kelasVirtual: "Kelas Virtual XI TMK 1",
    mapel: "Sistem Hidrolik & Pneumatik",
    jurusan: "TMK",
    rombel: "XI TMK 1",
    judul: "Prinsip Tekanan & Fluida",
    deskripsiSingkat:
      "Materi teori dasar tekanan, debit, dan hukum Pascal pada sistem hidrolik.",
    tanggal: "Sel, 11 Nov 2025",
    status: "Dipublikasikan",
    jumlahLampiran: 2,
  },
  {
    id: 4,
    jenis: "Tugas",
    pertemuanKe: 3,
    kelasVirtual: "Kelas Virtual XI TMK 1",
    mapel: "Sistem Hidrolik & Pneumatik",
    jurusan: "TMK",
    rombel: "XI TMK 1",
    judul: "Latihan Soal Tekanan & Fluida",
    deskripsiSingkat:
      "Tugas soal pilihan ganda & isian singkat tentang konsep tekanan dan fluida.",
    tanggal: "Sel, 11 Nov 2025",
    tenggat: "Sab, 15 Nov 2025 • 21.00",
    status: "Ditutup",
    jumlahLampiran: 1,
    sudahDinilai: true,
  },
  {
    id: 5,
    jenis: "Materi",
    pertemuanKe: 6,
    kelasVirtual: "Kelas Virtual XII TP 1",
    mapel: "Teknik Pemesinan Bubut",
    jurusan: "TP",
    rombel: "XII TP 1",
    judul: "Video Demonstrasi Pembubutan Poros",
    deskripsiSingkat:
      "Rekaman praktik pembubutan poros sesuai gambar kerja dan standar toleransi.",
    tanggal: "Kam, 13 Nov 2025",
    status: "Dipublikasikan",
    jumlahLampiran: 2,
  },
];

const ATTACHMENTS_MAP: Record<number, Attachment[]> = {
  1: [
    {
      id: 1,
      nama: "Slide K3 Bengkel.pdf",
      tipe: "PDF",
    },
    {
      id: 2,
      nama: "Handout Servis Berkala.pdf",
      tipe: "PDF",
    },
  ],
  2: [
    {
      id: 3,
      nama: "LK Analisis Servis Berkala.docx",
      tipe: "DOCX",
    },
  ],
  3: [
    {
      id: 4,
      nama: "Slide Tekanan & Fluida.pdf",
      tipe: "PDF",
    },
    {
      id: 5,
      nama: "Catatan Tambahan Hidrolik.pdf",
      tipe: "PDF",
    },
  ],
  4: [
    {
      id: 6,
      nama: "Soal Latihan Tekanan & Fluida.docx",
      tipe: "DOCX",
    },
  ],
  5: [
    {
      id: 7,
      nama: "Rekaman Praktik Bubut.mp4",
      tipe: "Video",
    },
    {
      id: 8,
      nama: "Gambar Kerja Poros.pdf",
      tipe: "PDF",
    },
  ],
};

const MateriTugasPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(MATERI_TUGAS_LIST[0].id);
  const [filterJenis, setFilterJenis] = useState<"ALL" | "Materi" | "Tugas">(
    "ALL"
  );
  const [filterJurusan, setFilterJurusan] = useState<"ALL" | "TKR" | "TMK" | "TP">(
    "ALL"
  );

  const selected =
    MATERI_TUGAS_LIST.find((m) => m.id === selectedId) ?? MATERI_TUGAS_LIST[0];

  const filtered = MATERI_TUGAS_LIST.filter((item) => {
    if (filterJenis !== "ALL" && item.jenis !== filterJenis) return false;
    if (filterJurusan !== "ALL" && item.jurusan !== filterJurusan) return false;
    return true;
  });

  React.useEffect(() => {
    if (!filtered.some((m) => m.id === selectedId) && filtered[0]) {
      setSelectedId(filtered[0].id);
    }
  }, [filterJenis, filterJurusan, filtered, selectedId]);

  const attachments = ATTACHMENTS_MAP[selected.id] ?? [];

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
              Materi &amp; Tugas
            </h2>
            <p className="text-xs text-zinc-500 dark:text-slate-400">
              {dateStr} · Pengelolaan materi, rekaman, dan tugas terhubung ke
              Kelas Virtual SMK Kartek
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition">
              <PlusCircle size={16} />
              Tambah Materi / Tugas
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
              <UploadCloud size={16} />
              Upload Lampiran
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

      {/* Filter & search bar */}
      <section className="px-6 pt-5 pb-3 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-xs">
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 rounded-full bg-slate-900 text-slate-100">
            Tahun Ajar 2025/2026
          </span>
          <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
            Terhubung ke Kelas Virtual &amp; Kalender Akademik
          </span>
          <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
            Integrasi dengan Buku Nilai &amp; Portofolio
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              size={16}
            />
            <input
              placeholder="Cari materi / tugas berdasarkan judul atau mapel..."
              className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-zinc-300 bg-white/80 dark:bg-slate-900/60 dark:border-slate-700 outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800">
            <Filter size={14} /> Filter Lanjut
          </button>
        </div>
      </section>

      {/* Tabs filter jenis & jurusan */}
      <section className="px-6 pb-3 flex flex-wrap gap-2 text-xs">
        {/* Filter jenis */}
        <div className="flex flex-wrap gap-2">
          {[
            { key: "ALL", label: "Semua Jenis" },
            { key: "Materi", label: "Materi" },
            { key: "Tugas", label: "Tugas" },
          ].map((opt) => {
            const active = filterJenis === (opt.key as any);
            return (
              <button
                key={opt.key}
                onClick={() =>
                  setFilterJenis(opt.key as "ALL" | "Materi" | "Tugas")
                }
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs transition ${
                  active
                    ? "border-cyan-500 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300"
                    : "border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                {opt.key === "Materi" && <BookOpen size={13} />}
                {opt.key === "Tugas" && <ClipboardList size={13} />}
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Filter jurusan */}
        <div className="flex flex-wrap gap-2">
          {[
            { key: "ALL", label: "Semua Jurusan" },
            { key: "TKR", label: "TKR" },
            { key: "TMK", label: "TMK" },
            { key: "TP", label: "TP" },
          ].map((opt) => {
            const active = filterJurusan === (opt.key as any);
            return (
              <button
                key={opt.key}
                onClick={() =>
                  setFilterJurusan(opt.key as "ALL" | "TKR" | "TMK" | "TP")
                }
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs transition ${
                  active
                    ? "border-cyan-500 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300"
                    : "border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid utama */}
      <main className="px-6 pb-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Kolom kiri: daftar materi & tugas */}
        <aside className="xl:col-span-1 rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 flex flex-col text-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold">Daftar Materi &amp; Tugas</h3>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                {filtered.length} item terfilter
              </p>
            </div>
            <button className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] border border-zinc-300 bg-white/80 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/60">
              <Download size={14} />
              Export
            </button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 mt-1">
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition ${
                  item.id === selected.id
                    ? "border-cyan-500/70 bg-cyan-500/10"
                    : "border-zinc-200 bg-white/60 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-[13px] truncate">
                    {item.judul}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] ${
                      item.jenis === "Materi"
                        ? "bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/40"
                        : "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/40"
                    }`}
                  >
                    {item.jenis === "Materi" ? (
                      <BookOpen size={10} />
                    ) : (
                      <ClipboardList size={10} />
                    )}
                    {item.jenis}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-slate-400 mt-0.5">
                  {item.mapel} • {item.jurusan} • {item.rombel}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-slate-400 mt-0.5">
                  Pertemuan {item.pertemuanKe} • {item.kelasVirtual}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-slate-400 mt-0.5">
                  {item.tanggal}
                  {item.tenggat && (
                    <>
                      {" "}
                      • Tenggat: <span className="font-semibold">{item.tenggat}</span>
                    </>
                  )}
                </p>
                <div className="mt-1 flex items-center justify-between text-[10px] text-zinc-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <Paperclip size={10} />
                    {item.jumlahLampiran} lampiran
                  </span>
                  <StatusBadge item={item} />
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Kolom kanan: detail materi / tugas terpilih */}
        <section className="xl:col-span-2 space-y-4 text-xs">
          {/* Ringkasan utama */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
              <div>
                <div className="inline-flex items-center gap-2 mb-1">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] ${
                      selected.jenis === "Materi"
                        ? "bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/40"
                        : "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/40"
                    }`}
                  >
                    {selected.jenis === "Materi" ? (
                      <BookOpen size={11} />
                    ) : (
                      <ClipboardList size={11} />
                    )}
                    {selected.jenis}
                  </span>
                  <StatusBadge item={selected} />
                </div>
                <h3 className="text-lg font-semibold mb-1">{selected.judul}</h3>
                <p className="text-xs text-zinc-400 dark:text-slate-400">
                  {selected.mapel} • {selected.jurusan} • {selected.rombel} •
                  Pertemuan {selected.pertemuanKe} ({selected.kelasVirtual})
                </p>
                <p className="mt-2 text-[11px] text-zinc-600 dark:text-slate-300 leading-relaxed">
                  {selected.deskripsiSingkat}
                </p>
                <p className="mt-1 text-[11px] text-zinc-500 dark:text-slate-400">
                  Dipublikasikan: {selected.tanggal}
                  {selected.tenggat && (
                    <>
                      {" "}
                      · Tenggat pengumpulan:{" "}
                      <span className="font-semibold">{selected.tenggat}</span>
                    </>
                  )}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 text-xs">
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500">
                  <Link2 size={14} />
                  Lihat di Kelas Virtual
                </button>
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
                  <FileText size={14} />
                  Edit Materi / Tugas
                </button>
              </div>
            </div>

            <div className="mt-2 rounded-xl border border-dashed border-zinc-300 dark:border-slate-700 p-3 flex flex-col md:flex-row gap-3 text-[11px]">
              <div className="flex-1">
                <p className="font-semibold text-[12px] mb-1">
                  Keterkaitan dengan Fitur Lain
                </p>
                <p className="text-zinc-600 dark:text-slate-300">
                  • Nilai tugas terhubung ke{" "}
                  <span className="font-semibold">Buku Nilai &amp; Analisis KD</span>.
                </p>
                <p className="text-zinc-600 dark:text-slate-300">
                  • Lampiran hasil kerja dapat masuk ke{" "}
                  <span className="font-semibold">Portofolio &amp; Refleksi</span>{" "}
                  (terutama untuk projek &amp; PKL).
                </p>
                <p className="text-zinc-600 dark:text-slate-300">
                  • Diskusi terkait materi ditampung di{" "}
                  <span className="font-semibold">Forum &amp; Pengumuman</span>.
                </p>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[12px] mb-1">Rencana Pengembangan</p>
                <p className="text-zinc-600 dark:text-slate-300">
                  Pada implementasi penuh, guru dapat mengatur visibilitas materi
                  (hanya saat jam pelajaran, sepanjang minggu, atau sampai tugas
                  dikumpulkan), serta menyusun jalur belajar per topik.
                </p>
              </div>
            </div>
          </div>

          {/* Lampiran & ringkasan rekaman / tugas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Lampiran */}
            <div className="lg:col-span-1 rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 text-[11px] space-y-2">
              <p className="font-semibold text-[12px] mb-1 flex items-center gap-2">
                <Paperclip size={14} />
                Lampiran
              </p>
              {attachments.length === 0 ? (
                <p className="text-zinc-500 dark:text-slate-400">
                  Belum ada lampiran pada materi / tugas ini (dummy data).
                </p>
              ) : (
                <ul className="space-y-1.5">
                  {attachments.map((a) => (
                    <li
                      key={a.id}
                      className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/40"
                    >
                      <div className="flex items-center gap-2">
                        {a.tipe === "Video" ? (
                          <PlayCircle size={14} className="text-emerald-500" />
                        ) : (
                          <FileText size={14} className="text-cyan-500" />
                        )}
                        <span className="truncate">{a.nama}</span>
                      </div>
                      <button className="text-[10px] px-2 py-0.5 rounded-full border border-zinc-300 bg-white hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800">
                        Unduh
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Ringkasan aktivitas & integrasi nilai */}
            <div className="lg:col-span-2 rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 text-[11px] space-y-3">
              <p className="font-semibold text-[12px] mb-1">
                Ringkasan Aktivitas &amp; Penilaian (Mockup)
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded-xl border border-dashed border-zinc-300 dark:border-slate-700 p-3 space-y-1">
                  <p className="font-semibold text-[12px]">Status Pengumpulan</p>
                  <p className="text-zinc-600 dark:text-slate-300">
                    Dalam versi produksi, bagian ini menampilkan berapa siswa yang
                    sudah mengumpulkan tugas, terlambat, atau belum mengumpulkan.
                  </p>
                </div>
                <div className="rounded-xl border border-dashed border-zinc-300 dark:border-slate-700 p-3 space-y-1">
                  <p className="font-semibold text-[12px]">Analisis KD</p>
                  <p className="text-zinc-600 dark:text-slate-300">
                    Nilai dari tugas ini dapat di-mapping ke{" "}
                    <span className="font-semibold">KD tertentu</span>, lalu
                    dianalisis di halaman Buku Nilai &amp; Analisis KD.
                  </p>
                </div>
                <div className="rounded-xl border border-dashed border-zinc-300 dark:border-slate-700 p-3 space-y-1">
                  <p className="font-semibold text-[12px]">Portofolio</p>
                  <p className="text-zinc-600 dark:text-slate-300">
                    Artefak terbaik (laporan, foto praktik, video) dapat dipilih
                    sebagai <span className="font-semibold">bukti projek / PKL</span>{" "}
                    di Portofolio siswa.
                  </p>
                </div>
              </div>

              <div className="mt-2 space-y-1">
                <p className="font-semibold text-[12px]">Aksi Cepat</p>
                <div className="flex flex-wrap gap-2">
                  <QuickPill
                    icon={<MessageCircle size={11} />}
                    label="Buat Pengumuman di Forum"
                  />
                  <QuickPill
                    icon={<CheckCircle2 size={11} />}
                    label="Tandai Sudah Dinilai"
                  />
                  <QuickPill
                    icon={<Clock size={11} />}
                    label="Atur Ulang Tenggat (Mock)"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

function StatusBadge({ item }: { item: MateriTugasItem }) {
  if (item.status === "Dipublikasikan") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/40 text-[10px]">
        <CheckCircle2 size={10} />
        Dipublikasikan
      </span>
    );
  }
  if (item.status === "Ditutup") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 text-[10px]">
        <Clock size={10} />
        Ditutup
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/40 text-[10px]">
      Draft
    </span>
  );
}

function QuickPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-zinc-300 bg-white/80 text-[11px] text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
      {icon}
      {label}
    </button>
  );
}

export default MateriTugasPage;
