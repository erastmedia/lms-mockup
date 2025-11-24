// src/pages/ForumPengumumanPage.tsx
import React, { useState } from "react";
import {
  Search,
  Filter,
  MessageCircle,
  Megaphone,
  Pin,
  Paperclip,
  Send,
  Users,
  Calendar,
  CheckCircle2,
  Bell,
  Sun
} from "lucide-react";

type TopicType = "Diskusi" | "Pengumuman Kelas" | "Pengumuman Sekolah" | "Tugas";

type ForumTopic = {
  id: number;
  jenis: TopicType;
  judul: string;
  kelasVirtual?: string;
  mapel?: string;
  jurusan?: "TKR" | "TMK" | "TP";
  rombel?: string;
  totalBalasan: number;
  belumDibaca: number;
  terakhirOleh: string;
  waktuTerakhir: string;
  pinned?: boolean;
  locked?: boolean;
};

type ForumMessage = {
  id: number;
  pengirim: string;
  role: "Guru" | "Siswa" | "Wali Kelas" | "Wakasek";
  waktu: string;
  konten: string;
  isGuru?: boolean;
  isImportant?: boolean;
};

const TOPICS: ForumTopic[] = [
  {
    id: 1,
    jenis: "Diskusi",
    judul: "Diskusi Servis Berkala – XI TKR 1",
    kelasVirtual: "Kelas Virtual XI TKR 1",
    mapel: "Pemeliharaan Mesin Kendaraan Ringan",
    jurusan: "TKR",
    rombel: "XI TKR 1",
    totalBalasan: 18,
    belumDibaca: 3,
    terakhirOleh: "Siswa: Andi",
    waktuTerakhir: "10 menit yang lalu",
    pinned: true,
  },
  {
    id: 2,
    jenis: "Tugas",
    judul: "Pengumuman Tugas Analisis Servis Berkala",
    kelasVirtual: "Kelas Virtual XI TKR 1",
    mapel: "Pemeliharaan Mesin Kendaraan Ringan",
    jurusan: "TKR",
    rombel: "XI TKR 1",
    totalBalasan: 6,
    belumDibaca: 0,
    terakhirOleh: "Guru: Bapak Budi",
    waktuTerakhir: "Kemarin",
  },
  {
    id: 3,
    jenis: "Diskusi",
    judul: "Pertanyaan Tekanan & Fluida – XI TMK 1",
    kelasVirtual: "Kelas Virtual XI TMK 1",
    mapel: "Sistem Hidrolik & Pneumatik",
    jurusan: "TMK",
    rombel: "XI TMK 1",
    totalBalasan: 9,
    belumDibaca: 1,
    terakhirOleh: "Siswa: Raka",
    waktuTerakhir: "2 jam yang lalu",
  },
  {
    id: 4,
    jenis: "Pengumuman Sekolah",
    judul: "Informasi Jadwal Ulangan Akhir Semester Ganjil",
    totalBalasan: 4,
    belumDibaca: 0,
    terakhirOleh: "Wakasek Kurikulum",
    waktuTerakhir: "3 hari yang lalu",
    pinned: true,
  },
];

const MESSAGES_MAP: Record<number, ForumMessage[]> = {
  1: [
    {
      id: 101,
      pengirim: "Guru: Bapak Budi",
      role: "Guru",
      waktu: "20 menit yang lalu",
      konten:
        "Silakan gunakan thread ini untuk bertanya jika ada yang belum jelas tentang prosedur servis berkala dan penerapan K3 di bengkel.",
      isGuru: true,
      isImportant: true,
    },
    {
      id: 102,
      pengirim: "Siswa: Andi",
      role: "Siswa",
      waktu: "10 menit yang lalu",
      konten:
        "Pak, untuk checklist poin pengecekan oli, apakah harus selalu dalam kondisi mesin dingin?",
    },
    {
      id: 103,
      pengirim: "Guru: Bapak Budi",
      role: "Guru",
      waktu: "Baru saja",
      konten:
        "Betul, pengecekan level oli sebaiknya dilakukan saat mesin dalam kondisi dingin agar pembacaan dipstick lebih akurat.",
      isGuru: true,
    },
  ],
  2: [
    {
      id: 201,
      pengirim: "Guru: Bapak Budi",
      role: "Guru",
      waktu: "Kemarin",
      konten:
        "Tugas Analisis Servis Berkala sudah dipublikasikan. Silakan unggah LK kalian paling lambat Jumat, 21 Nov 2025 pukul 23.59.",
      isGuru: true,
      isImportant: true,
    },
    {
      id: 202,
      pengirim: "Siswa: Siti",
      role: "Siswa",
      waktu: "Kemarin",
      konten:
        "Pak, apakah boleh mengerjakan secara berkelompok 2 orang untuk satu checklist?",
    },
  ],
  3: [
    {
      id: 301,
      pengirim: "Guru: Ibu Rina",
      role: "Guru",
      waktu: "2 jam yang lalu",
      konten:
        "Untuk pertanyaan terkait tekanan & fluida, silakan tuliskan di sini. Nanti Ibu akan rangkum untuk dibahas di pertemuan berikutnya.",
      isGuru: true,
    },
    {
      id: 302,
      pengirim: "Siswa: Raka",
      role: "Siswa",
      waktu: "2 jam yang lalu",
      konten:
        "Bu, bedanya tekanan dan gaya tekan itu apa ya? Saya masih bingung di contoh soal nomor 3.",
    },
  ],
  4: [
    {
      id: 401,
      pengirim: "Wakasek Kurikulum",
      role: "Wakasek",
      waktu: "3 hari yang lalu",
      konten:
        "Berikut informasi jadwal UAS Ganjil untuk seluruh jurusan TKR, TMK, dan TP. Mohon Bapak/Ibu Guru menyesuaikan Prota & Promes serta memberikan penguatan materi sebelum pelaksanaan.",
      isImportant: true,
    },
  ],
};

const ForumPengumumanPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(TOPICS[0].id);
  const [filterJenis, setFilterJenis] = useState<
    "ALL" | "Diskusi" | "Pengumuman"
  >("ALL");

  const selected = TOPICS.find((t) => t.id === selectedId) ?? TOPICS[0];
  const messages = MESSAGES_MAP[selected.id] ?? [];

  const filteredTopics = TOPICS.filter((t) => {
    if (filterJenis === "Diskusi" && t.jenis !== "Diskusi") return false;
    if (
      filterJenis === "Pengumuman" &&
      t.jenis !== "Pengumuman Kelas" &&
      t.jenis !== "Pengumuman Sekolah"
    )
      return false;
    return true;
  });

  React.useEffect(() => {
    if (!filteredTopics.some((t) => t.id === selectedId) && filteredTopics[0]) {
      setSelectedId(filteredTopics[0].id);
    }
  }, [filterJenis, filteredTopics, selectedId]);

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
              Forum &amp; Pengumuman
            </h2>
            <p className="text-xs text-zinc-500 dark:text-slate-400">
              {dateStr} · Diskusi terstruktur &amp; pengumuman terkonsolidasi per
              kelas dan jurusan
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition">
              <Megaphone size={16} />
              Buat Pengumuman
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
              <MessageCircle size={16} />
              Buat Topik Diskusi
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
          <span className="px-3 py-1.5 rounded-full bg-slate-900 text-slate-100 flex items-center gap-1">
            <Bell size={12} />
            Terkait Kelas Virtual &amp; Kalender Akademik
          </span>
          <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
            Jurusan: TKR • TMK • TP
          </span>
          <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
            Terhubung ke Materi, Tugas, &amp; Presensi
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              size={16}
            />
            <input
              placeholder="Cari topik, judul pengumuman, atau nama kelas..."
              className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-zinc-300 bg-white/80 dark:bg-slate-900/60 dark:border-slate-700 outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800">
            <Filter size={14} /> Filter Lanjut
          </button>
        </div>
      </section>

      {/* Tabs filter jenis */}
      <section className="px-6 pb-3 flex flex-wrap gap-2 text-xs">
        <FilterPill
          label="Semua"
          active={filterJenis === "ALL"}
          onClick={() => setFilterJenis("ALL")}
        />
        <FilterPill
          label="Diskusi"
          icon={<MessageCircle size={12} />}
          active={filterJenis === "Diskusi"}
          onClick={() => setFilterJenis("Diskusi")}
        />
        <FilterPill
          label="Pengumuman"
          icon={<Megaphone size={12} />}
          active={filterJenis === "Pengumuman"}
          onClick={() => setFilterJenis("Pengumuman")}
        />
      </section>

      {/* Grid utama */}
      <main className="px-6 pb-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Kolom kiri: daftar topik */}
        <aside className="xl:col-span-1 rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 flex flex-col text-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold">Daftar Topik &amp; Pengumuman</h3>
              <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                {filteredTopics.length} thread aktif / tersimpan
              </p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 mt-1">
            {filteredTopics.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedId(t.id)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition ${
                  t.id === selected.id
                    ? "border-cyan-500/70 bg-cyan-500/10"
                    : "border-zinc-200 bg-white/60 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5">
                    <JenisBadge jenis={t.jenis} />
                    {t.pinned && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 text-[9px]">
                        <Pin size={9} />
                        Pinned
                      </span>
                    )}
                  </div>
                  {t.belumDibaca > 0 && (
                    <span className="min-w-[18px] h-[18px] rounded-full bg-rose-500 text-[10px] text-white flex items-center justify-center">
                      {t.belumDibaca}
                    </span>
                  )}
                </div>
                <p className="font-semibold text-[13px] line-clamp-2">{t.judul}</p>
                {t.kelasVirtual && (
                  <p className="text-[11px] text-zinc-500 dark:text-slate-400 mt-0.5">
                    {t.kelasVirtual} • {t.mapel}
                  </p>
                )}
                {t.jurusan && t.rombel && (
                  <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                    {t.jurusan} • {t.rombel}
                  </p>
                )}
                <p className="mt-1 text-[11px] text-zinc-500 dark:text-slate-400 flex items-center justify-between">
                  <span>{t.terakhirOleh}</span>
                  <span>{t.waktuTerakhir}</span>
                </p>
              </button>
            ))}
          </div>
        </aside>

        {/* Kolom kanan: detail topik & pesan */}
        <section className="xl:col-span-2 space-y-4 text-xs">
          {/* Header topik */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <JenisBadge jenis={selected.jenis} />
                  {selected.kelasVirtual && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200 text-[11px]">
                      <Users size={12} />
                      {selected.kelasVirtual}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-1">{selected.judul}</h3>
                {selected.mapel && selected.jurusan && selected.rombel && (
                  <p className="text-xs text-zinc-400 dark:text-slate-400">
                    {selected.mapel} • {selected.jurusan} • {selected.rombel}
                  </p>
                )}
                <p className="mt-1 text-[11px] text-zinc-500 dark:text-slate-400">
                  {selected.totalBalasan} balasan •{" "}
                  {selected.belumDibaca > 0 ? (
                    <>
                      <span className="font-semibold">{selected.belumDibaca}</span>{" "}
                      belum dibaca
                    </>
                  ) : (
                    <>Semua sudah dibaca</>
                  )}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 text-xs">
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
                  <Calendar size={14} />
                  Tautkan ke Jadwal / Kelas
                </button>
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
                  <CheckCircle2 size={14} />
                  Tandai Semua Dibaca
                </button>
              </div>
            </div>

            <div className="mt-2 rounded-xl border border-dashed border-zinc-300 dark:border-slate-700 p-3 text-[11px]">
              <p className="font-semibold text-[12px] mb-1">
                Integrasi dengan Fitur Lain
              </p>
              <p className="text-zinc-600 dark:text-slate-300">
                • Thread diskusi materi akan muncul otomatis ketika guru membuat
                materi/tugas di halaman <span className="font-semibold">Materi &amp; Tugas</span>.
              </p>
              <p className="text-zinc-600 dark:text-slate-300">
                • Pengumuman kelas dapat muncul di ringkasan{" "}
                <span className="font-semibold">Dashboard Guru</span> dan di aplikasi siswa.
              </p>
              <p className="text-zinc-600 dark:text-slate-300">
                • Informasi penting (mis. jadwal UAS, UKK, dan PKL) dapat ditandai
                sebagai prioritas tinggi dan dikaitkan dengan{" "}
                <span className="font-semibold">Kalender Akademik</span>.
              </p>
            </div>
          </div>

          {/* Daftar pesan & composer */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 p-4 flex flex-col h-[480px]">
            {/* Messages list */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {messages.length === 0 ? (
                <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                  Belum ada pesan dalam topik ini (mockup).
                </p>
              ) : (
                messages.map((m) => (
                  <MessageBubble key={m.id} msg={m} />
                ))
              )}
            </div>

            {/* Composer */}
            <div className="pt-3 mt-3 border-t border-zinc-200 dark:border-slate-800">
              <p className="text-[11px] text-zinc-500 dark:text-slate-400 mb-1">
                Balas sebagai <span className="font-semibold">Guru</span> (mockup
                input — tidak benar-benar mengirim pesan)
              </p>
              <div className="flex items-end gap-2">
                <div className="flex-1 relative">
                  <textarea
                    rows={2}
                    className="w-full text-xs rounded-lg border border-zinc-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 px-3 py-2 pr-10 resize-none outline-none focus:ring-1 focus:ring-cyan-500"
                    placeholder="Tulis tanggapan, klarifikasi, atau instruksi tambahan untuk siswa..."
                  />
                  <button className="absolute right-2 bottom-2 p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-slate-800">
                    <Paperclip size={14} className="text-zinc-400" />
                  </button>
                </div>
                <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 text-xs">
                  <Send size={14} />
                  Kirim
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

function FilterPill({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon?: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs transition ${
        active
          ? "border-cyan-500 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300"
          : "border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function JenisBadge({ jenis }: { jenis: TopicType }) {
  if (jenis === "Diskusi") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/40 text-[10px]">
        <MessageCircle size={11} />
        Diskusi
      </span>
    );
  }
  if (jenis === "Pengumuman Kelas") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/40 text-[10px]">
        <Megaphone size={11} />
        Pengumuman Kelas
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/40 text-[10px]">
      <Megaphone size={11} />
      Pengumuman Sekolah
    </span>
  );
}

function MessageBubble({ msg }: { msg: ForumMessage }) {
  const isGuru = msg.isGuru || msg.role === "Guru" || msg.role === "Wakasek";
  return (
    <div
      className={`flex gap-2 ${
        isGuru ? "justify-end" : "justify-start"
      } text-[11px]`}
    >
      {!isGuru && (
        <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-semibold text-zinc-700 dark:text-slate-100">
          {msg.pengirim.charAt(0)}
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 border text-[11px] leading-relaxed ${
          isGuru
            ? "bg-slate-900 text-slate-50 border-slate-800"
            : "bg-zinc-50/80 text-zinc-800 border-zinc-200 dark:bg-slate-900/40 dark:text-slate-100 dark:border-slate-700"
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold">{msg.pengirim}</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full border border-white/30 bg-white/10">
              {msg.role}
            </span>
            {msg.isImportant && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-100 border border-amber-400/40">
                Penting
              </span>
            )}
          </div>
          <span className="text-[9px] opacity-70">{msg.waktu}</span>
        </div>
        <p>{msg.konten}</p>
      </div>
      {isGuru && (
        <div className="w-7 h-7 rounded-full bg-cyan-500 flex items-center justify-center text-[10px] font-semibold text-white">
          G
        </div>
      )}
    </div>
  );
}

export default ForumPengumumanPage;
