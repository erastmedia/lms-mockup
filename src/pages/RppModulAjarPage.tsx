// src/pages/RppModulAjarPage.tsx
import React, { useState } from "react";
import {
  Search,
  Filter,
  PlusCircle,
  Download,
  Printer,
  Tag,
  Clock,
  User,
  FileText,
  CheckCircle2,
  Bell,
  Sun,
} from "lucide-react";

type Rpp = {
  id: number;
  judul: string;
  mapel: string;
  jurusan: "TKR" | "TMK" | "TP";
  kelas: string;
  fase: string;
  tipe: "Modul Ajar" | "RPP Singkat";
  kd: string;
  durasi: string;
  status: "Siap Digunakan" | "Perlu Revisi" | "Draft";
  profilP5: string[];
  tujuan: string[];
  langkah: { tahap: string; durasi: string; deskripsi: string }[];
  asesmen: string[];
  media: string[];
  catatanGuru: string;
  lampiran: { nama: string; tipe: string }[];
};

const today = new Date();
const dateStr = today.toLocaleDateString("id-ID", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const rppList: Rpp[] = [
  {
    id: 1,
    judul: "RPP Pemeliharaan Mesin – Servis Berkala",
    mapel: "Pemeliharaan Mesin Kendaraan Ringan",
    jurusan: "TKR",
    kelas: "XI TKR 1",
    fase: "E",
    tipe: "Modul Ajar",
    kd: "CP/KD 3.1",
    durasi: "2 × 45 menit",
    status: "Siap Digunakan",
    profilP5: ["Gotong Royong", "Kreatif", "Bernalar Kritis", "Mandiri"],
    tujuan: [
      "Siswa mampu menjelaskan tujuan dan prosedur servis berkala pada kendaraan ringan.",
      "Siswa mampu melakukan pemeriksaan oli, filter udara, dan busi sesuai SOP bengkel.",
      "Siswa menunjukkan sikap disiplin dan mematuhi prosedur K3 di lingkungan bengkel.",
    ],
    langkah: [
      {
        tahap: "Pendahuluan (±10 menit)",
        durasi: "10 menit",
        deskripsi:
          "Apersepsi tentang pentingnya servis berkala, salam pembuka, pengecekan kehadiran, dan penyampaian tujuan pembelajaran.",
      },
      {
        tahap: "Inti (±60 menit)",
        durasi: "60 menit",
        deskripsi:
          "Guru mendemonstrasikan pemeriksaan oli dan filter, kemudian siswa praktik berkelompok pada unit kendaraan di bengkel.",
      },
      {
        tahap: "Penutup (±20 menit)",
        durasi: "20 menit",
        deskripsi:
          "Refleksi hasil praktik, tanya jawab kendala di bengkel, pemberian umpan balik, dan penugasan laporan singkat.",
      },
    ],
    asesmen: [
      "Asesmen formatif: lembar observasi sikap dan kuis singkat tentang prosedur servis berkala.",
      "Asesmen unjuk kerja: praktik melakukan servis berkala sederhana pada kendaraan.",
    ],
    media: [
      "Unit kendaraan praktik, toolkit bengkel, oli & filter.",
      "LCD/TV untuk menampilkan video prosedur servis berkala.",
      "LKPD pemeriksaan oli & filter, rubrik penilaian praktik.",
    ],
    catatanGuru:
      "Perhatikan siswa yang masih ragu menggunakan kunci momen dan pastikan prosedur K3 benar-benar diterapkan.",
    lampiran: [
      { nama: "RPP_TKR_ServisBerkala_P1.pdf", tipe: "PDF" },
      { nama: "LKPD_Pemeriksaan_Oli_Filter.docx", tipe: "DOCX" },
      { nama: "Rubrik_Servis_Berkala_TKR.xlsx", tipe: "XLSX" },
    ],
  },
  {
    id: 2,
    judul: "RPP Sistem Hidrolik Industri – Dasar & Safety",
    mapel: "Sistem Hidrolik & Pneumatik",
    jurusan: "TMK",
    kelas: "XI TMK 1",
    fase: "E",
    tipe: "Modul Ajar",
    kd: "CP/KD 3.2",
    durasi: "2 × 45 menit",
    status: "Perlu Revisi",
    profilP5: ["Bernalar Kritis", "Gotong Royong"],
    tujuan: [
      "Siswa memahami prinsip dasar kerja sistem hidrolik.",
      "Siswa mampu mengidentifikasi komponen utama pada trainer hidrolik.",
    ],
    langkah: [],
    asesmen: [],
    media: [],
    catatanGuru:
      "Perlu menambah contoh kasus kebocoran dan cara penanganannya.",
    lampiran: [{ nama: "RPP_TMK_Hidrolik_Dasar.docx", tipe: "DOCX" }],
  },
  {
    id: 3,
    judul: "RPP Proses Bubut – Pembuatan Poros",
    mapel: "Teknik Pemesinan Bubut",
    jurusan: "TP",
    kelas: "XII TP 1",
    fase: "F",
    tipe: "RPP Singkat",
    kd: "CP/KD Projek 1",
    durasi: "3 × 45 menit",
    status: "Draft",
    profilP5: ["Kreatif", "Gotong Royong"],
    tujuan: [
      "Siswa mampu mengoperasikan mesin bubut untuk membuat poros sederhana sesuai gambar kerja.",
    ],
    langkah: [],
    asesmen: [],
    media: [],
    catatanGuru:
      "RPP akan dilengkapi setelah koordinasi dengan guru produktif lain.",
    lampiran: [],
  },
];

const RppModulAjarPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(rppList[0].id);
  const selected = rppList.find((r) => r.id === selectedId)!;

  return (
    <div className="h-full w-full bg-zinc-50 dark:bg-slate-950">
      {/* Topbar */}
      <div className="sticky top-0 z-10 backdrop-blur bg-white/80 dark:bg-slate-950/80 border-b border-zinc-200 dark:border-slate-800">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              RPP / Modul Ajar
            </h2>
            <p className="text-xs text-zinc-500 dark:text-slate-400">
              {dateStr} · Koleksi perangkat ajar digital Anda
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition">
              <PlusCircle size={16} />
              RPP / Modul Baru
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition">
              <FileText size={16} />
              Duplikat dari Template
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

      {/* Filter bar */}
      <div className="px-6 pt-5 pb-3 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-full bg-slate-900 text-slate-100 dark:bg-slate-800 dark:text-slate-50">
            Tahun Ajar 2025/2026
          </span>
          <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
            Semester: Ganjil
          </span>
          <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
            Mapel: Semua
          </span>
          <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
            Kelas: Semua
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              size={16}
            />
            <input
              placeholder="Cari RPP / Modul Ajar..."
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
        {/* Kolom kiri: daftar RPP / Modul */}
        <div className="xl:col-span-1 rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 flex flex-col text-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold">Daftar RPP / Modul Ajar</h3>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                {rppList.length} perangkat ajar tersimpan
              </p>
            </div>
            <button className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] border border-zinc-300 bg-white/80 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/60 dark:hover:bg-slate-800">
              <Download size={14} /> Export
            </button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 mt-1">
            {rppList.map((rpp) => (
              <button
                key={rpp.id}
                onClick={() => setSelectedId(rpp.id)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition ${
                  rpp.id === selected.id
                    ? "border-cyan-500/70 bg-cyan-500/10"
                    : "border-zinc-200 bg-white/60 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:bg-slate-800"
                }`}
              >
                <p className="text-[13px] font-semibold mb-1">{rpp.judul}</p>
                <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                  {rpp.mapel} · {rpp.jurusan} · {rpp.kelas}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-slate-400 mt-0.5">
                  {rpp.tipe} · {rpp.kd}
                </p>
                <StatusBadge status={rpp.status} className="mt-1" />
              </button>
            ))}
          </div>
        </div>

        {/* Kolom kanan: detail RPP terpilih */}
        <div className="xl:col-span-2 space-y-4">
          {/* Header detail */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
              <div>
                <h3 className="text-lg font-semibold mb-1">{selected.judul}</h3>
                <p className="text-xs text-zinc-400 dark:text-slate-400">
                  {selected.mapel} · {selected.jurusan} · {selected.kelas} ·
                  Fase {selected.fase}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                  <Badge icon={<Tag size={12} />} label={selected.kd} />
                  <Badge icon={<FileText size={12} />} label={selected.tipe} />
                  <Badge icon={<Clock size={12} />} label={selected.durasi} />
                  <StatusBadge status={selected.status} />
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 text-xs">
                <button className="px-3 py-1.5 rounded-lg bg-cyan-600 text-xs text-white hover:bg-cyan-500">
                  Edit RPP / Modul
                </button>
                <div className="flex gap-2">
                  <button className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-zinc-300 bg-white/80 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
                    <Printer size={14} /> Cetak
                  </button>
                  <button className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-zinc-300 bg-white/80 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
                    <Download size={14} /> Unduh
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
              <div className="rounded-xl border border-dashed border-zinc-300 dark:border-slate-700 p-3">
                <p className="font-semibold mb-1 flex items-center gap-1">
                  <User size={13} /> Sasaran Belajar
                </p>
                <p className="text-zinc-500 dark:text-slate-400">
                  Siswa jurusan {selected.jurusan} kelas {selected.kelas} dalam
                  kompetensi keahlian terkait.
                </p>
              </div>
              <div className="rounded-xl border border-dashed border-zinc-300 dark:border-slate-707 p-3">
                <p className="font-semibold mb-1 flex items-center gap-1">
                  <CheckCircle2 size={13} /> Keterkaitan Prota &amp; Promes
                </p>
                <p className="text-zinc-500 dark:text-slate-400">
                  Terhubung ke minggu-minggu tertentu pada Prota &amp; Promes
                  sesuai topik pembelajaran.
                </p>
              </div>
              <div className="rounded-xl border border-dashed border-zinc-300 dark:border-slate-707 p-3">
                <p className="font-semibold mb-1 flex items-center gap-1">
                  <FileText size={13} /> Bukti Kinerja
                </p>
                <p className="text-zinc-500 dark:text-slate-400">
                  Menjadi referensi utama saat supervisi, penilaian kinerja
                  guru, dan arsip perangkat ajar.
                </p>
              </div>
            </div>
          </div>

          {/* Tujuan, langkah, asesmen, media, P5 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
            {/* Tujuan & langkah kegiatan */}
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
                <h4 className="font-semibold text-[12px] mb-2">
                  Tujuan Pembelajaran
                </h4>
                <ul className="list-disc list-outside pl-4 space-y-1 text-zinc-600 dark:text-slate-300">
                  {selected.tujuan.length > 0 ? (
                    selected.tujuan.map((t, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {t}
                      </li>
                    ))
                  ) : (
                    <li className="text-zinc-400 dark:text-slate-500 italic">
                      Tujuan pembelajaran akan dilengkapi.
                    </li>
                  )}
                </ul>
              </div>

              <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
                <h4 className="font-semibold text-[12px] mb-2">
                  Langkah Kegiatan
                </h4>
                {selected.langkah.length > 0 ? (
                  <div className="space-y-2">
                    {selected.langkah.map((l, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-zinc-200 dark:border-slate-700 bg-zinc-50/80 dark:bg-slate-900/40 px-3 py-2"
                      >
                        <p className="font-semibold text-[11px] flex items-center justify-between">
                          <span>{l.tahap}</span>
                          <span className="inline-flex items-center gap-1 text-[10px] text-zinc-500 dark:text-slate-400">
                            <Clock size={11} /> {l.durasi}
                          </span>
                        </p>
                        <p className="text-[11px] text-zinc-600 dark:text-slate-300 mt-0.5">
                          {l.deskripsi}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-zinc-400 dark:text-slate-500 italic">
                    Rincian langkah kegiatan akan diisi kemudian.
                  </p>
                )}
              </div>
            </div>

            {/* Asesmen, media, P5 */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
                <h4 className="font-semibold text-[12px] mb-2">
                  Asesmen &amp; Media
                </h4>
                <p className="text-[11px] font-semibold mb-1">Asesmen</p>
                <ul className="list-disc list-outside pl-4 space-y-1 text-[11px] text-zinc-600 dark:text-slate-300 mb-2">
                  {selected.asesmen.length > 0 ? (
                    selected.asesmen.map((a, idx) => <li key={idx}>{a}</li>)
                  ) : (
                    <li className="text-zinc-400 dark:text-slate-500 italic">
                      Rencana asesmen belum diisi.
                    </li>
                  )}
                </ul>
                <p className="text-[11px] font-semibold mb-1">Media & Sumber</p>
                <ul className="list-disc list-outside pl-4 space-y-1 text-[11px] text-zinc-600 dark:text-slate-300">
                  {selected.media.length > 0 ? (
                    selected.media.map((m, idx) => <li key={idx}>{m}</li>)
                  ) : (
                    <li className="text-zinc-400 dark:text-slate-500 italic">
                      Media pembelajaran belum ditentukan.
                    </li>
                  )}
                </ul>
              </div>

              <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
                <h4 className="font-semibold text-[12px] mb-2">
                  Profil Pelajar Pancasila / P5
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selected.profilP5.map((p) => (
                    <span
                      key={p}
                      className="px-2 py-0.5 rounded-full bg-cyan-50 text-[10px] text-cyan-800 dark:bg-cyan-500/10 dark:text-cyan-200 border border-cyan-100 dark:border-cyan-500/40"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Catatan guru & lampiran */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
            <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
              <h4 className="font-semibold text-[12px] mb-2">Catatan Guru</h4>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400 mb-2">
                Area ini dapat digunakan sebagai jurnal singkat untuk
                memperbaiki RPP pada pertemuan selanjutnya.
              </p>
              <div className="rounded-xl border border-dashed border-zinc-300 dark:border-slate-700 p-3 min-h-[80px] text-[11px] text-zinc-600 dark:text-slate-300 bg-zinc-50/80 dark:bg-slate-900/40">
                {selected.catatanGuru || (
                  <span className="text-zinc-400 dark:text-slate-500 italic">
                    Belum ada catatan.
                  </span>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
              <h4 className="font-semibold text-[12px] mb-2">
                Lampiran &amp; Dokumen
              </h4>
              {selected.lampiran.length > 0 ? (
                <ul className="space-y-1 text-[11px]">
                  {selected.lampiran.map((l, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between rounded-lg border border-zinc-200 dark:border-slate-700 bg-zinc-50/80 dark:bg-slate-900/40 px-3 py-1.5"
                    >
                      <span className="flex items-center gap-2">
                        <FileText size={14} />
                        {l.nama}
                      </span>
                      <span className="text-[10px] text-zinc-500 dark:text-slate-400">
                        {l.tipe}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[11px] text-zinc-400 dark:text-slate-500 italic">
                  Belum ada lampiran file untuk RPP ini.
                </p>
              )}
              <button className="mt-3 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
                <Download size={14} /> Unduh Semua Lampiran
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Badge({ icon, label }: { icon?: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
      {icon}
      {label}
    </span>
  );
}

function StatusBadge({
  status,
  className = "",
}: {
  status: Rpp["status"];
  className?: string;
}) {
  let color =
    "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700";

  if (status === "Siap Digunakan") {
    color =
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/40";
  } else if (status === "Perlu Revisi") {
    color =
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/40";
  } else if (status === "Draft") {
    color =
      "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700";
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] ${color} ${className}`}
    >
      <CheckCircle2 size={12} />
      {status}
    </span>
  );
}

export default RppModulAjarPage;
