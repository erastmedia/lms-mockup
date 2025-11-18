// src/pages/KalenderAkademikPage.tsx
import React, { useState } from "react";
import {
  Calendar,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  BookOpen,
  Users,
  Filter,
  Download,
  Bell, Sun
} from "lucide-react";

type Jurusan = "TKR" | "TMK" | "TP";

type EventKategori = "Ujian" | "Projek" | "PKL" | "Rapat" | "Libur";

type AcademicEvent = {
  id: number;
  tanggal: string; // YYYY-MM-DD
  label: string;
  kategori: EventKategori;
  jurusan?: Jurusan | "Semua";
  kelas?: string;
  lokasi?: string;
  waktu?: string;
  keterangan?: string;
};

// Dummy data kegiatan akademik
const EVENTS: AcademicEvent[] = [
  {
    id: 1,
    tanggal: "2025-07-15",
    label: "Penilaian Tengah Semester Ganjil",
    kategori: "Ujian",
    jurusan: "Semua",
    waktu: "07.30 – 11.30",
    lokasi: "Seluruh ruang kelas",
    keterangan: "Mapel produktif & normatif untuk semua jurusan.",
  },
  {
    id: 2,
    tanggal: "2025-07-20",
    label: "Kickoff Projek Profil: Bengkel Ramah Pelanggan",
    kategori: "Projek",
    jurusan: "TKR",
    kelas: "XI TKR 1 & 2",
    lokasi: "Bengkel TKR SMK Kartek",
    waktu: "08.00 – 10.00",
    keterangan: "Pengantar projek profil P5 dengan fokus layanan servis kendaraan.",
  },
  {
    id: 3,
    tanggal: "2025-07-25",
    label: "Rapat Koordinasi PKL",
    kategori: "Rapat",
    jurusan: "TMK",
    lokasi: "Ruang Guru TMK",
    waktu: "13.00 – 15.00",
    keterangan: "Pemantapan penempatan PKL untuk kelas XII TMK.",
  },
  {
    id: 4,
    tanggal: "2025-08-01",
    label: "Mulai PKL Gelombang 1",
    kategori: "PKL",
    jurusan: "TP",
    kelas: "XII TP 1",
    lokasi: "Industri mitra TP",
    waktu: "Sesuai jadwal industri",
    keterangan:
      "Siswa mulai melaksanakan PKL, data otomatis terhubung ke Portofolio & Rapor Projek.",
  },
  {
    id: 5,
    tanggal: "2025-08-17",
    label: "Libur Nasional: HUT RI",
    kategori: "Libur",
    jurusan: "Semua",
    lokasi: "Nasional",
    keterangan: "Kegiatan belajar mengajar diliburkan.",
  },
  {
    id: 6,
    tanggal: "2025-08-22",
    label: "Penilaian Akhir Projek Profil Fase E",
    kategori: "Projek",
    jurusan: "TMK",
    kelas: "XI TMK 1",
    lokasi: "Lab TMK & Aula",
    waktu: "08.00 – 12.00",
    keterangan:
      "Presentasi projek profil terkait sistem hidrolik dan penerapan Profil Pelajar Pancasila.",
  },
];

const DAYS_HEADER = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

type MonthConfig = {
  key: string; // "2025-07"
  label: string;
  firstWeekdayIndex: number; // 0 = Sen, 6 = Min
  totalDays: number;
};

const MONTHS: MonthConfig[] = [
  {
    key: "2025-07",
    label: "Juli 2025",
    firstWeekdayIndex: 0, // mulai Senin
    totalDays: 31,
  },
  {
    key: "2025-08",
    label: "Agustus 2025",
    firstWeekdayIndex: 4, // misal mulai Jumat (mock)
    totalDays: 31,
  },
];

const KalenderAkademikPage: React.FC = () => {
  const [monthIndex, setMonthIndex] = useState(0);
  const currentMonth = MONTHS[monthIndex];

  // Map tanggal => list event
  const eventsByDay = getEventsByDayForMonth(EVENTS, currentMonth.key);

  const handlePrev = () => {
    setMonthIndex((idx) => (idx === 0 ? idx : idx - 1));
  };

  const handleNext = () => {
    setMonthIndex((idx) => (idx === MONTHS.length - 1 ? idx : idx + 1));
  };

  const monthEvents = EVENTS.filter((e) =>
    e.tanggal.startsWith(currentMonth.key)
  );

  return (
    <div className="h-full w-full bg-zinc-50 dark:bg-slate-950">
      {/* Topbar */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 dark:bg-slate-950/80 border-b border-zinc-200 dark:border-slate-800">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Kalender Akademik
            </h2>
            <p className="text-xs text-zinc-500 dark:text-slate-400 flex flex-wrap items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1">
                <CalendarDays size={12} />
                Tahun Ajar 2025/2026
              </span>
              <span className="text-zinc-400 dark:text-slate-600">•</span>
              <span>Sinkron dengan Prota/Promes, Kelas Virtual, dan PKL.</span>
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-300 bg-white/80 text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
              <Filter size={14} />
              Filter Lanjut
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500">
              <Download size={14} />
              Export Kalender
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
          Semester: Ganjil
        </span>
        <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
          Jurusan: TKR • TMK • TP
        </span>
        <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200">
          Terhubung ke Prota &amp; Promes, PKL, Projek Profil
        </span>
      </section>

      {/* Grid utama */}
      <main className="px-6 pb-8 grid grid-cols-1 xl:grid-cols-3 gap-6 text-xs">
        {/* Kolom kiri: grid kalender + legenda */}
        <section className="xl:col-span-2 space-y-4">
          {/* Header bulan + navigasi */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                disabled={monthIndex === 0}
                className="p-1.5 rounded-full border border-zinc-200 bg-white/80 hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-default dark:border-slate-700 dark:bg-slate-900/60 dark:hover:bg-slate-800"
              >
                <ChevronLeft size={16} />
              </button>
              <div>
                <p className="text-[12px] text-zinc-500 dark:text-slate-400">
                  Bulan Akademik
                </p>
                <p className="text-[14px] font-semibold">
                  {currentMonth.label}
                </p>
              </div>
              <button
                type="button"
                onClick={handleNext}
                disabled={monthIndex === MONTHS.length - 1}
                className="p-1.5 rounded-full border border-zinc-200 bg-white/80 hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-default dark:border-slate-700 dark:bg-slate-900/60 dark:hover:bg-slate-800"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="hidden md:flex items-center gap-2 text-[11px] text-zinc-600 dark:text-slate-300">
              <span className="inline-flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Ujian / Penilaian
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                Projek / P5
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                PKL
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                Libur
              </span>
            </div>
          </div>

          {/* Grid kalender */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 p-4">
            {/* Header hari */}
            <div className="grid grid-cols-7 mb-2 text-[11px] font-semibold text-zinc-500 dark:text-slate-400">
              {DAYS_HEADER.map((d) => (
                <div
                  key={d}
                  className="flex items-center justify-center py-1.5 uppercase tracking-wide"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Isi tanggal */}
            <div className="grid grid-cols-7 gap-1 text-[11px]">
              {/* offset awal (kosong sebelum tanggal 1) */}
              {Array.from({ length: currentMonth.firstWeekdayIndex }).map(
                (_, idx) => (
                  <div key={`empty-${idx}`} className="h-16" />
                )
              )}

              {/* tanggal-tanggal */}
              {Array.from({ length: currentMonth.totalDays }).map((_, idx) => {
                const day = idx + 1;
                const events = eventsByDay[day] || [];
                const hasEvents = events.length > 0;

                const mainKategori = hasEvents ? events[0].kategori : undefined;
                const borderClass = getBorderClass(mainKategori);
                const badgeClass = getBadgeClass(mainKategori);

                return (
                  <div
                    key={day}
                    className={`h-16 rounded-xl border text-[11px] flex flex-col px-1.5 py-1.5 ${
                      hasEvents
                        ? borderClass
                        : "border-zinc-200 dark:border-slate-800"
                    } bg-white/80 dark:bg-slate-950/70`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] font-semibold text-zinc-700 dark:text-slate-100">
                        {day}
                      </span>
                      {hasEvents && (
                        <span
                          className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold ${badgeClass}`}
                        >
                          {events.length > 1
                            ? `${events.length} kegiatan`
                            : events[0].kategori}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      {hasEvents ? (
                        <ul className="space-y-0.5 text-[10px] text-zinc-600 dark:text-slate-300">
                          {events.slice(0, 2).map((e) => (
                            <li key={e.id} className="truncate">
                              • {e.label}
                            </li>
                          ))}
                          {events.length > 2 && (
                            <li className="text-[9px] text-zinc-500 dark:text-slate-400">
                              +{events.length - 2} lainnya
                            </li>
                          )}
                        </ul>
                      ) : (
                        <p className="text-[10px] text-zinc-400 dark:text-slate-600">
                          Tidak ada kegiatan
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-3 text-[10px] text-zinc-500 dark:text-slate-400">
              Pada implementasi penuh, guru dapat klik tanggal untuk menambah /
              mengedit kegiatan (ujian, projek, PKL, rapat, dsb) dan kalender
              akan otomatis tersinkron dengan jadwal kelas, Prota/Promes, dan
              portofolio siswa.
            </p>
          </div>
        </section>

        {/* Kolom kanan: agenda bulan ini */}
        <section className="xl:col-span-1 space-y-4">
          {/* Ringkasan agenda */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 p-4">
            <p className="font-semibold text-[12px] mb-1 flex items-center gap-2">
              <Calendar size={14} />
              Agenda Bulan Ini
            </p>
            <p className="text-[11px] text-zinc-600 dark:text-slate-300 mb-2">
              Daftar kegiatan utama pada{" "}
              <span className="font-semibold">{currentMonth.label}</span> untuk
              jurusan TKR, TMK, dan TP.
            </p>
            <p className="text-[11px] text-zinc-500 dark:text-slate-400 mb-2">
              Total kegiatan:{" "}
              <span className="font-semibold">{monthEvents.length}</span>
            </p>
          </div>

          {/* List agenda */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 p-4 space-y-2 max-h-[420px] overflow-y-auto">
            {monthEvents.length === 0 ? (
              <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                Belum ada kegiatan terjadwal di bulan ini (mockup).
              </p>
            ) : (
              monthEvents.map((e) => (
                <div
                  key={e.id}
                  className="rounded-xl border border-zinc-200 dark:border-slate-700 bg-zinc-50/80 dark:bg-slate-900/60 px-3 py-2 text-[11px]"
                >
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <div>
                      <p className="font-semibold">{e.label}</p>
                      <p className="text-[10px] text-zinc-500 dark:text-slate-400">
                        {formatTanggalSingkat(e.tanggal)} •{" "}
                        {e.kategori === "Ujian"
                          ? "Ujian / Penilaian"
                          : e.kategori === "Projek"
                          ? "Projek / P5"
                          : e.kategori === "PKL"
                          ? "PKL / Praktik Kerja"
                          : e.kategori === "Rapat"
                          ? "Rapat / Koordinasi"
                          : "Libur"}
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${getBadgeClass(e.kategori)}`}>
                      {e.kategori}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-[10px] text-zinc-600 dark:text-slate-300">
                    {e.jurusan && (
                      <span className="inline-flex items-center gap-1">
                        <BookOpen size={10} />
                        {e.jurusan === "Semua"
                          ? "Semua jurusan"
                          : `Jurusan ${e.jurusan}`}
                      </span>
                    )}
                    {e.kelas && (
                      <span className="inline-flex items-center gap-1">
                        <Users size={10} />
                        {e.kelas}
                      </span>
                    )}
                    {e.waktu && (
                      <span className="inline-flex items-center gap-1">
                        <Clock size={10} />
                        {e.waktu}
                      </span>
                    )}
                    {e.lokasi && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={10} />
                        {e.lokasi}
                      </span>
                    )}
                  </div>
                  {e.keterangan && (
                    <p className="mt-1 text-[10px] text-zinc-500 dark:text-slate-400">
                      {e.keterangan}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Catatan integrasi */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 p-4">
            <p className="font-semibold text-[12px] mb-1 flex items-center gap-2">
              Integrasi dengan Fitur Lain
            </p>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-zinc-700 dark:text-slate-200">
              <li>
                Jadwal ujian otomatis muncul pada menu{" "}
                <span className="font-semibold">Buku Nilai &amp; Analisis KD</span>.
              </li>
              <li>
                Projek Profil dan PKL terhubung ke{" "}
                <span className="font-semibold">Portofolio &amp; Refleksi</span>.
              </li>
              <li>
                Kegiatan kelas tertentu sinkron dengan{" "}
                <span className="font-semibold">Kelas Virtual</span> dan{" "}
                <span className="font-semibold">Materi &amp; Tugas</span>.
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

function getEventsByDayForMonth(
  events: AcademicEvent[],
  monthKey: string // "2025-07"
): Record<number, AcademicEvent[]> {
  const result: Record<number, AcademicEvent[]> = {};
  events.forEach((e) => {
    if (!e.tanggal.startsWith(monthKey)) return;
    const day = parseInt(e.tanggal.slice(8, 10), 10);
    if (!result[day]) result[day] = [];
    result[day].push(e);
  });
  return result;
}

function getBorderClass(kategori?: EventKategori) {
  if (!kategori) return "border-zinc-200 dark:border-slate-800";
  switch (kategori) {
    case "Ujian":
      return "border-emerald-400/80";
    case "Projek":
      return "border-sky-400/80";
    case "PKL":
      return "border-violet-400/80";
    case "Libur":
      return "border-rose-400/80";
    case "Rapat":
      return "border-amber-400/80";
    default:
      return "border-zinc-200 dark:border-slate-800";
  }
}

function getBadgeClass(kategori?: EventKategori) {
  if (!kategori)
    return "bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200";
  switch (kategori) {
    case "Ujian":
      return "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200 dark:border-emerald-500/40";
    case "Projek":
      return "bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-500/10 dark:text-sky-200 dark:border-sky-500/40";
    case "PKL":
      return "bg-violet-50 text-violet-700 border border-violet-200 dark:bg-violet-500/10 dark:text-violet-200 dark:border-violet-500/40";
    case "Libur":
      return "bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-200 dark:border-rose-500/40";
    case "Rapat":
      return "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-200 dark:border-amber-500/40";
    default:
      return "bg-zinc-100 text-zinc-700 dark:bg-slate-800 dark:text-slate-200";
  }
}

function formatTanggalSingkat(isoDate: string) {
  // iso: YYYY-MM-DD
  const [y, m, d] = isoDate.split("-");
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  return date.toLocaleDateString("id-ID", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
}

export default KalenderAkademikPage;
