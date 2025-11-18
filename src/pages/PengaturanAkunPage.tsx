// src/pages/PengaturanAkunPage.tsx
import React, { useState } from "react";
import {
  User,
  Mail,
  Shield,
  KeyRound,
  Bell,
  Smartphone,
  Moon,
  Sun,
  Globe2,
  CheckCircle2,
} from "lucide-react";

type ThemePref = "system" | "light" | "dark";

const PengaturanAkunPage: React.FC = () => {
  const [themePref, setThemePref] = useState<ThemePref>("system");
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifApp, setNotifApp] = useState(true);
  const [notifAgenda, setNotifAgenda] = useState(true);

  return (
    <div className="h-full w-full bg-zinc-50 dark:bg-slate-950">
      {/* Topbar */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 dark:bg-slate-950/80 border-b border-zinc-200 dark:border-slate-800">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Pengaturan Akun
            </h2>
            <p className="text-xs text-zinc-500 dark:text-slate-400">
              Kelola profil guru, keamanan akun, dan preferensi tampilan LMS.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-zinc-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Globe2 size={12} />
              Bahasa: <span className="font-semibold">Indonesia</span>
            </span>
          </div>
        </div>
      </header>

      {/* Konten utama */}
      <main className="px-6 pb-8 pt-5 grid grid-cols-1 xl:grid-cols-3 gap-6 text-xs">
        {/* Kolom kiri: Profil + Keamanan */}
        <section className="xl:col-span-2 space-y-4">
          {/* Profil Guru */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 p-4">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-sm font-semibold text-white">
                  RG
                </div>
                <div>
                  <p className="text-[13px] font-semibold">
                    Rudi Gunawan
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                    Guru Produktif TKR • Wali Kelas XI TKR 1
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-300">
                    <CheckCircle2 size={11} />
                    Akun terverifikasi oleh admin sekolah
                  </p>
                </div>
              </div>
              <button className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 text-[11px] text-zinc-700 hover:bg-zinc-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800">
                Edit Profil
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <FieldGroup label="Nama Lengkap" icon={<User size={12} />}>
                <input
                  type="text"
                  defaultValue="Rudi Gunawan"
                  className="w-full text-[11px] px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
                />
              </FieldGroup>

              <FieldGroup label="Email Akun LMS" icon={<Mail size={12} />}>
                <input
                  type="email"
                  defaultValue="rudi.gunawan@smkkartek.sch.id"
                  className="w-full text-[11px] px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
                />
              </FieldGroup>

              <FieldGroup label="NIP / NUPTK">
                <input
                  type="text"
                  defaultValue="19820228 201001 1 001"
                  className="w-full text-[11px] px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
                />
              </FieldGroup>

              <FieldGroup label="Jurusan & Mapel Produktif">
                <input
                  type="text"
                  defaultValue="TKR • Pemeliharaan Mesin Kendaraan Ringan"
                  className="w-full text-[11px] px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
                />
              </FieldGroup>

              <FieldGroup label="Peran di LMS">
                <input
                  type="text"
                  defaultValue="Guru Produktif • Wali Kelas • Pembimbing Projek Profil"
                  className="w-full text-[11px] px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
                />
              </FieldGroup>

              <FieldGroup label="Nomor HP (untuk notifikasi)">
                <input
                  type="text"
                  defaultValue="0812-3456-7890"
                  className="w-full text-[11px] px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
                />
              </FieldGroup>
            </div>

            <div className="mt-3 flex justify-end">
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 text-[11px] text-white hover:bg-cyan-500">
                Simpan Perubahan Profil
              </button>
            </div>
          </div>

          {/* Keamanan & Password */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-slate-50 flex items-center justify-center dark:bg-slate-800">
                <Shield size={16} />
              </div>
              <div>
                <p className="text-[12px] font-semibold">
                  Keamanan &amp; Password
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                  Ganti password LMS secara berkala untuk menjaga keamanan akun.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-1">
                <p className="text-[11px] font-semibold mb-1">
                  Status Keamanan
                </p>
                <ul className="space-y-1 text-[10px] text-zinc-600 dark:text-slate-300">
                  <li>• Password terakhir diubah: 3 bulan lalu</li>
                  <li>• Autentikasi 2 langkah: <span className="font-semibold">Belum aktif</span></li>
                  <li>• Perangkat aktif: 2 (Laptop &amp; HP)</li>
                </ul>
              </div>

              <div className="md:col-span-2 space-y-2">
                <LabelSmall icon={<KeyRound size={12} />} text="Password Saat Ini" />
                <input
                  type="password"
                  className="w-full text-[11px] px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
                  placeholder="••••••••"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  <div>
                    <LabelSmall text="Password Baru" />
                    <input
                      type="password"
                      className="w-full text-[11px] px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
                      placeholder="Minimal 8 karakter"
                    />
                  </div>
                  <div>
                    <LabelSmall text="Konfirmasi Password Baru" />
                    <input
                      type="password"
                      className="w-full text-[11px] px-3 py-1.5 rounded-lg border border-zinc-300 bg-white/80 outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
                      placeholder="Ulangi password baru"
                    />
                  </div>
                </div>

                <div className="mt-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <p className="text-[10px] text-zinc-500 dark:text-slate-400">
                    Rekomendasi: gunakan kombinasi huruf besar, kecil, angka, dan
                    simbol. Jangan gunakan ulang password dari aplikasi lain.
                  </p>
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-[11px] text-slate-50 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700">
                    Simpan Password Baru
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kolom kanan: Preferensi & Notifikasi */}
        <section className="xl:col-span-1 space-y-4">
          {/* Preferensi Tampilan & Bahasa */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 p-4">
            <p className="text-[12px] font-semibold mb-2 flex items-center gap-2">
              <Sun size={14} />
              Preferensi Tampilan &amp; Bahasa
            </p>

            <div className="space-y-2 mb-3">
              <p className="text-[11px] text-zinc-500 dark:text-slate-400">
                Mode tampilan:
              </p>
              <div className="space-y-1.5 text-[11px]">
                <RadioRow
                  checked={themePref === "system"}
                  onChange={() => setThemePref("system")}
                  label="Otomatis (ikut pengaturan sistem)"
                  desc="LMS akan mengikuti mode terang/gelap dari perangkat Anda."
                  icon={<Smartphone size={12} />}
                />
                <RadioRow
                  checked={themePref === "light"}
                  onChange={() => setThemePref("light")}
                  label="Selalu Light Mode"
                  desc="Tampilan cerah, cocok untuk proyektor / ruang kelas terang."
                  icon={<Sun size={12} />}
                />
                <RadioRow
                  checked={themePref === "dark"}
                  onChange={() => setThemePref("dark")}
                  label="Selalu Dark Mode"
                  desc="Tampilan redup, nyaman untuk penggunaan malam hari."
                  icon={<Moon size={12} />}
                />
              </div>
              <p className="mt-2 text-[10px] text-zinc-500 dark:text-slate-400">
                Catatan: pada implementasi penuh, pilihan ini akan mengendalikan
                tema global LMS (bukan hanya mockup).
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-dashed border-zinc-200 dark:border-slate-800">
              <p className="text-[11px] text-zinc-500 dark:text-slate-400 mb-1">
                Bahasa antarmuka:
              </p>
              <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-zinc-300 bg-zinc-50/80 text-[11px] text-zinc-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200">
                <Globe2 size={12} />
                Bahasa Indonesia (default)
              </div>
              <p className="mt-1 text-[10px] text-zinc-500 dark:text-slate-500">
                Dukungan multi-bahasa (misalnya Inggris) bisa ditambahkan pada
                pengembangan tahap berikutnya.
              </p>
            </div>
          </div>

          {/* Notifikasi */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 p-4">
            <p className="text-[12px] font-semibold mb-2 flex items-center gap-2">
              <Bell size={14} />
              Notifikasi Guru
            </p>
            <p className="text-[11px] text-zinc-600 dark:text-slate-300 mb-2">
              Atur notifikasi yang ingin Anda terima dari LMS terkait kelas,
              tugas, dan agenda sekolah.
            </p>

            <div className="space-y-1.5 text-[11px]">
              <ToggleRow
                checked={notifEmail}
                onChange={() => setNotifEmail((v) => !v)}
                label="Email ringkasan aktivitas harian"
                desc="Rekap singkat tugas terkumpul, presensi kelas, dan pesan penting."
              />
              <ToggleRow
                checked={notifApp}
                onChange={() => setNotifApp((v) => !v)}
                label="Notifikasi di aplikasi LMS"
                desc="Popup di dashboard saat ada tugas baru, pengajuan izin, atau forum aktif."
              />
              <ToggleRow
                checked={notifAgenda}
                onChange={() => setNotifAgenda((v) => !v)}
                label="Pengingat agenda kalender akademik"
                desc="Pengingat H-1 untuk ujian, rapat guru, dan jadwal penting lain."
              />
            </div>

            <p className="mt-2 text-[10px] text-zinc-500 dark:text-slate-500">
              Integrasi notifikasi WhatsApp ke guru dan orang tua dapat ditambah
              pada fase pengembangan berikutnya bila sekolah menginginkan.
            </p>
          </div>

          {/* Perangkat Aktif */}
          <div className="rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 p-4">
            <p className="text-[12px] font-semibold mb-2 flex items-center gap-2">
              <Smartphone size={14} />
              Perangkat Aktif (Mockup)
            </p>
            <div className="space-y-1.5 text-[11px] text-zinc-700 dark:text-slate-200">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-semibold">Laptop Guru • Chrome</p>
                  <p className="text-[10px] text-zinc-500 dark:text-slate-400">
                    Terakhir aktif: hari ini, 09.20 • Ruang Guru
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200 dark:border-emerald-500/40 text-[10px]">
                  Utama
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-semibold">HP Android • Aplikasi LMS</p>
                  <p className="text-[10px] text-zinc-500 dark:text-slate-400">
                    Terakhir aktif: kemarin, 21.10 • Rumah
                  </p>
                </div>
                <button className="text-[10px] text-rose-500 hover:text-rose-600">
                  Putuskan sesi
                </button>
              </div>
            </div>
            <p className="mt-2 text-[10px] text-zinc-500 dark:text-slate-500">
              Pada implementasi penuh, admin dapat memantau login mencurigakan
              dan memaksa logout dari perangkat tertentu bila diperlukan.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

function FieldGroup({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] text-zinc-500 dark:text-slate-400 flex items-center gap-1.5">
        {icon && <span>{icon}</span>}
        <span>{label}</span>
      </p>
      {children}
    </div>
  );
}

function LabelSmall({
  text,
  icon,
}: {
  text: string;
  icon?: React.ReactNode;
}) {
  return (
    <p className="text-[11px] text-zinc-500 dark:text-slate-400 flex items-center gap-1.5 mb-1">
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </p>
  );
}

function RadioRow({
  checked,
  onChange,
  label,
  desc,
  icon,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  desc: string;
  icon?: React.ReactNode;
}) {
  return (
    <label className="flex items-start gap-2 cursor-pointer">
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 h-3 w-3 accent-cyan-600"
      />
      <div className="flex-1">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-700 dark:text-slate-100">
          {icon && <span>{icon}</span>}
          <span>{label}</span>
        </p>
        <p className="text-[10px] text-zinc-500 dark:text-slate-400">
          {desc}
        </p>
      </div>
    </label>
  );
}

function ToggleRow({
  checked,
  onChange,
  label,
  desc,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  desc: string;
}) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div>
        <p className="text-[11px] font-semibold text-zinc-700 dark:text-slate-100">
          {label}
        </p>
        <p className="text-[10px] text-zinc-500 dark:text-slate-400">
          {desc}
        </p>
      </div>
      <button
        type="button"
        onClick={onChange}
        className={`mt-0.5 inline-flex h-4 w-7 items-center rounded-full border transition ${
          checked
            ? "bg-cyan-600 border-cyan-600"
            : "bg-zinc-200 border-zinc-300 dark:bg-slate-800 dark:border-slate-700"
        }`}
      >
        <span
          className={`h-3 w-3 rounded-full bg-white shadow transform transition ${
            checked ? "translate-x-3.5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default PengaturanAkunPage;
