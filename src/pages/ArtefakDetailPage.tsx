// src/pages/ArtefakDetailPage.tsx
import React from "react";
import {
  ArrowLeft,
  FolderOpen,
  Image as ImageIcon,
  Video,
  FileText,
  Link2,
  CalendarDays,
  Users,
  BookOpen,
  ClipboardList,
  MessageCircle,
  Star,
  Download,
  ExternalLink,
} from "lucide-react";

type ArtefakType = "Foto" | "Video" | "Dokumen" | "Link";

type ArtefakDetail = {
  id: number;
  jenis: ArtefakType;
  judul: string;
  deskripsi: string;
  sumber: "Projek Profil Pancasila" | "PKL" | "Praktik Bengkel" | "Tugas Kelas";
  tanggal: string;
  mapel: string;
  kelas: string;
  jurusan: "TKR" | "TMK" | "TP";
  projek: string;
  lokasi: string;
  fileName: string;
  fileSize: string;
};

const MOCK_ARTEFAK: ArtefakDetail = {
  id: 1,
  jenis: "Foto",
  judul: "Dokumentasi Servis Berkala Motor Matic",
  deskripsi:
    "Foto sebelum dan sesudah servis berkala pada motor matic, termasuk penggantian oli mesin, oli gardan, dan pengecekan sistem kelistrikan. Artefak ini digunakan sebagai bukti praktik servis berkala pada bengkel sekolah.",
  sumber: "Praktik Bengkel",
  tanggal: "2025-08-12",
  mapel: "Pemeliharaan Mesin Kendaraan Ringan",
  kelas: "XI TKR 1",
  jurusan: "TKR",
  projek: "Projek Profil: Layanan Servis Motor Sehat",
  lokasi: "Bengkel TKR SMK Kartek",
  fileName: "servis-berkala-motor-matic-raka.jpg",
  fileSize: "1.8 MB",
};

const MOCK_SISWA = {
  nama: "Raka Pratama",
  nisn: "1234567890",
};

const MOCK_REFLEKSI_SISWA =
  "Saya belajar bahwa proses servis berkala bukan hanya mengganti oli, tetapi juga memastikan kendaraan aman digunakan. Tantangan saya adalah menjelaskan temuan kerusakan kepada 'pelanggan' dengan bahasa yang mudah dipahami.";

const MOCK_CATATAN_GURU =
  "Raka sudah cukup baik dalam prosedur teknis, namun masih perlu latihan komunikasi saat menjelaskan estimasi biaya dan prioritas perbaikan kepada pelanggan.";

const ArtefakDetailPage: React.FC = () => {
  const a = MOCK_ARTEFAK;

  return (
    <div className="h-full w-full bg-zinc-50 dark:bg-slate-950">
      {/* Topbar */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 dark:bg-slate-950/80 border-b border-zinc-200 dark:border-slate-800">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1 text-[11px] text-zinc-500 dark:text-slate-400">
              <button
                type="button"
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-zinc-200 bg-white/80 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:bg-slate-800"
                // NOTE: pada implementasi penuh bisa pakai useNavigate(-1)
                onClick={() => window.history.back()}
              >
                <ArrowLeft size={12} />
                Kembali
              </button>
              <span className="hidden sm:inline text-zinc-400 dark:text-slate-600">
                •
              </span>
              <span className="hidden sm:inline">
                Portofolio &amp; Refleksi / Detail Artefak
              </span>
            </div>
            <h2 className="text-xl font-semibold tracking-tight">
              {a.judul}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-slate-400 flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1">
                <Users size={12} />
                {MOCK_SISWA.nama} · {a.kelas} ({a.jurusan})
              </span>
              <span className="hidden sm:inline text-zinc-400 dark:text-slate-600">
                •
              </span>
              <span className="hidden sm:inline">
                {a.mapel} · {a.sumber}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
              <Download size={14} />
              Unduh Artefak
            </button>
            <button className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500">
              <ExternalLink size={14} />
              Buka di Tab Baru
            </button>
          </div>
        </div>
      </header>

      {/* Konten utama */}
      <main className="px-6 pb-8 pt-5 grid grid-cols-1 xl:grid-cols-3 gap-6 text-xs">
        {/* Kolom kiri: preview artefak + meta teknis */}
        <section className="xl:col-span-2 space-y-4">
          {/* Preview utama */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-gradient-to-br from-slate-100 via-zinc-50 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 flex flex-col md:flex-row gap-4">
            {/* Area preview (mockup) */}
            <div className="md:w-2/3 rounded-2xl bg-slate-900/5 dark:bg-slate-900/60 border border-dashed border-zinc-300 dark:border-slate-700 flex items-center justify-center relative overflow-hidden min-h-[220px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(59,130,246,0.18),_transparent_55%)] opacity-60" />
              <div className="relative z-10 flex flex-col items-center text-center px-4">
                <ArtefakIconLarge jenis={a.jenis} />
                <p className="mt-2 text-[11px] font-semibold text-zinc-700 dark:text-slate-100">
                  {a.fileName}
                </p>
                <p className="text-[10px] text-zinc-500 dark:text-slate-400">
                  {a.fileSize} • Preview statis (mockup)
                </p>
                <p className="mt-2 text-[10px] text-zinc-500 dark:text-slate-400 max-w-sm">
                  Pada implementasi penuh, area ini akan menampilkan{" "}
                  {a.jenis === "Foto"
                    ? "preview gambar resolusi tinggi."
                    : a.jenis === "Video"
                    ? "player video dengan kontrol play/pause."
                    : a.jenis === "Dokumen"
                    ? "viewer dokumen (PDF/Office)."
                    : "embed link atau resource eksternal."}
                </p>
              </div>
            </div>

            {/* Meta teknis artefak */}
            <div className="md:w-1/3 space-y-3">
              <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 p-3">
                <p className="font-semibold text-[12px] mb-2 flex items-center gap-2">
                  <FolderOpen size={14} />
                  Detail Artefak
                </p>
                <dl className="space-y-1.5 text-[11px]">
                  <MetaRow label="Jenis">
                    <ArtefakPill jenis={a.jenis} />
                  </MetaRow>
                  <MetaRow label="Sumber">
                    {a.sumber}
                  </MetaRow>
                  <MetaRow label="Mata Pelajaran">
                    {a.mapel}
                  </MetaRow>
                  <MetaRow label="Kelas / Jurusan">
                    {a.kelas} ({a.jurusan})
                  </MetaRow>
                  <MetaRow label="Tanggal">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays size={11} />
                      {a.tanggal}
                    </span>
                  </MetaRow>
                  <MetaRow label="Lokasi">
                    {a.lokasi}
                  </MetaRow>
                  <MetaRow label="Projek/Konteks">
                    {a.projek}
                  </MetaRow>
                </dl>
              </div>

              <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 p-3">
                <p className="font-semibold text-[12px] mb-1 flex items-center gap-2">
                  <BookOpen size={14} />
                  Keterkaitan CP/KD (Mockup)
                </p>
                <p className="text-[11px] text-zinc-600 dark:text-slate-300 mb-1">
                  Artefak ini bisa ditautkan ke:
                </p>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] text-zinc-600 dark:text-slate-300">
                  <li>
                    CP/KD: Servis berkala motor matic dan penerapan K3 bengkel.
                  </li>
                  <li>
                    Projek Profil Pancasila: gotong-royong &amp; kreativitas dalam
                    layanan jasa.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Deskripsi naratif artefak */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 p-4">
            <p className="font-semibold text-[12px] mb-2 flex items-center gap-2">
              <FileText size={14} />
              Deskripsi Artefak
            </p>
            <p className="text-[11px] text-zinc-700 dark:text-slate-200 leading-relaxed">
              {a.deskripsi}
            </p>
            <p className="mt-2 text-[11px] text-zinc-500 dark:text-slate-400">
              Pada implementasi penuh, guru dapat mengedit deskripsi ini, menambah
              tag (misalnya: <span className="italic">K3, komunikasi pelanggan</span>),
              dan menandai artefak sebagai bahan diskusi saat{" "}
              <span className="font-semibold">konferensi orang tua</span>.
            </p>
          </div>
        </section>

        {/* Kolom kanan: refleksi, catatan guru, integrasi fitur lain */}
        <section className="xl:col-span-1 space-y-4">
          {/* Identitas siswa & ringkasan portofolio */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 p-4">
            <p className="font-semibold text-[12px] mb-2 flex items-center gap-2">
              <Users size={14} />
              Identitas Siswa (Ringkas)
            </p>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-[13px] font-semibold text-white">
                {MOCK_SISWA.nama
                  .split(" ")
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <p className="text-[12px] font-semibold">
                  {MOCK_SISWA.nama}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                  {a.kelas} ({a.jurusan}) · NISN {MOCK_SISWA.nisn}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <StatSmall label="Total Artefak" value="12" tone="blue" />
              <StatSmall label="Artefak Unggulan" value="4" tone="amber" />
              <StatSmall label="Status Projek" value="Aktif" tone="green" />
              <StatSmall label="Status PKL" value="Selesai" tone="green" />
            </div>
          </div>

          {/* Refleksi siswa */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 p-4">
            <p className="font-semibold text-[12px] mb-1 flex items-center gap-2">
              <MessageCircle size={14} />
              Refleksi Siswa (Artefak Ini)
            </p>
            <p className="text-[11px] text-zinc-700 dark:text-slate-200 leading-relaxed">
              {MOCK_REFLEKSI_SISWA}
            </p>
            <p className="mt-2 text-[10px] text-zinc-500 dark:text-slate-400">
              Pada implementasi penuh, siswa bisa menulis/refine refleksi langsung
              setelah mengunggah artefak, dan guru dapat memberi komentar balik.
            </p>
          </div>

          {/* Catatan guru */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 p-4">
            <p className="font-semibold text-[12px] mb-1 flex items-center gap-2">
              <ClipboardList size={14} />
              Catatan Guru
            </p>
            <p className="text-[11px] text-zinc-700 dark:text-slate-200 leading-relaxed">
              {MOCK_CATATAN_GURU}
            </p>
            <p className="mt-2 text-[10px] text-zinc-500 dark:text-slate-400">
              Catatan ini bisa ditautkan ke Buku Nilai (penilaian projek/PKL) dan
              ditampilkan saat rapat orang tua, dengan opsi disembunyikan dari
              tampilan siswa jika diperlukan.
            </p>
          </div>

          {/* Integrasi dengan fitur lain */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 p-4">
            <p className="font-semibold text-[12px] mb-2 flex items-center gap-2">
              <Link2 size={14} />
              Terhubung dengan Fitur Lain
            </p>
            <ul className="space-y-1.5 text-[11px] text-zinc-700 dark:text-slate-200">
              <li className="flex items-start gap-2">
                <BookOpen size={12} className="mt-0.5 text-cyan-500" />
                <span>
                  <span className="font-semibold">Kelas Virtual:</span> artefak
                  ini bisa dilampirkan sebagai materi/rekaman tugas di pertemuan
                  terkait.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FileText size={12} className="mt-0.5 text-emerald-500" />
                <span>
                  <span className="font-semibold">Materi &amp; Tugas:</span> awal
                  mulanya artefak ini adalah pengumpulan tugas praktik bengkel.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ClipboardList size={12} className="mt-0.5 text-amber-500" />
                <span>
                  <span className="font-semibold">Buku Nilai &amp; Remedial:</span>{" "}
                  bila capaian belum sesuai, artefak lanjutan dapat dibuat pada
                  sesi remedial/pengayaan.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Star size={12} className="mt-0.5 text-amber-500" />
                <span>
                  <span className="font-semibold">Rapor Projek &amp; PKL:</span>{" "}
                  artefak unggulan seperti ini bisa otomatis masuk ke rekap
                  portofolio untuk rapor projek dan penilaian PKL.
                </span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

function ArtefakIconLarge({ jenis }: { jenis: ArtefakType }) {
  const base =
    "w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm";
  if (jenis === "Foto") {
    return (
      <div className={`${base} bg-sky-500/10 text-sky-500`}>
        <ImageIcon size={26} />
      </div>
    );
  }
  if (jenis === "Video") {
    return (
      <div className={`${base} bg-rose-500/10 text-rose-500`}>
        <Video size={26} />
      </div>
    );
  }
  if (jenis === "Dokumen") {
    return (
      <div className={`${base} bg-emerald-500/10 text-emerald-500`}>
        <FileText size={26} />
      </div>
    );
  }
  return (
    <div className={`${base} bg-zinc-500/10 text-zinc-600`}>
      <Link2 size={26} />
    </div>
  );
}

function ArtefakPill({ jenis }: { jenis: ArtefakType }) {
  if (jenis === "Foto") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/40 text-[10px]">
        <ImageIcon size={11} />
        Foto
      </span>
    );
  }
  if (jenis === "Video") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/40 text-[10px]">
        <Video size={11} />
        Video
      </span>
    );
  }
  if (jenis === "Dokumen") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/40 text-[10px]">
        <FileText size={11} />
        Dokumen
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-50 text-zinc-700 border border-zinc-200 dark:bg-slate-900/40 dark:text-slate-200 dark:border-slate-700 text-[10px]">
      <Link2 size={11} />
      Link
    </span>
  );
}

function MetaRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between gap-2">
      <dt className="text-zinc-500 dark:text-slate-400">{label}</dt>
      <dd className="text-right text-zinc-700 dark:text-slate-100">
        {children}
      </dd>
    </div>
  );
}

function StatSmall({
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
    <div className={`rounded-xl border px-2.5 py-2 ${toneClass}`}>
      <p className="text-[10px] mb-0.5">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

export default ArtefakDetailPage;
