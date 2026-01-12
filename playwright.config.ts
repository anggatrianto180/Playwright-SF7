// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

// Definisikan path ke file auth. 
// Ini adalah file yang SAMA dengan yang ada di auth.setup.ts
const AUTH_FILE = 'playwright/.auth/user.json';

export default defineConfig({
  // Tentukan folder tempat tes Anda berada
  testDir: './tests',



  /* Waktu maksimum untuk satu tes berjalan */
  timeout: 60 * 1000,

  /* Gagal jika ada 'expect()' di dalam 'test.describe.configure({ mode: 'parallel' })' */
  forbidOnly: !!process.env.CI,

  /* Coba lagi hanya pada CI */
  retries: process.env.CI ? 2 : 1,

  /* Jumlah worker untuk berjalan paralel */
  workers: process.env.CI ? 1 : 1,

  /* Reporter */
  /* Reporter */
  reporter: [
    ['html'],
    ['list'], // Agar log tetap muncul di terminal VS Code

    // --- MONOCART YANG BENAR ---
    ['monocart-reporter', {
      name: "Laporan Automation SF7",
      outputFile: './test-results/report.html',
      // Hapus inline: true karena kita sudah pakai ZIP folder
    }],

    // --- TELEGRAM REPORTER ---
    ['./telegram-reporter.ts']
  ],

  /* Konfigurasi Global untuk semua Proyek */
  use: {
    /* **PENTING: Set baseURL Anda di sini, diambil dari .env** */
    // Ini penting karena setup Anda menggunakan page.goto('/')
    baseURL: process.env.BASE_URL,
    // PENTING: Ini akan otomatis ambil screenshot kapanpun test GAGAL (di baris manapun)
    screenshot: 'on',
    // Opsional: Simpan video & trace untuk debugging lebih mudah
    video: 'retain-on-failure',

    /* Lacak jejak (trace) saat percobaan ulang pertama yang gagal */
    trace: 'on-first-retry',
    launchOptions: {
      args: ["--start-maximized"]
    }
  },

  /* ================================================================== */
  /* KONFIGURASI PROYEK (BAGIAN UTAMA)                                  */
  /* ================================================================== */
  projects: [
    // --- PROYEK 1: SETUP ---
    // Proyek ini HANYA menjalankan file setup otentikasi
    {
      name: 'setup',
      // Memberitahu Playwright untuk mencari file yang berakhiran .setup.ts
      // Ini akan menemukan tests/auth.setup.ts Anda
      testMatch: /.*\.setup\.ts/,
    },

    // --- PROYEK 2: TES UTAMA (CONTOH: CHROME) ---
    // Proyek ini akan menjalankan tes Anda yang sebenarnya
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],

        // **KUNCI:** Gunakan 'storageState' yang telah dibuat oleh proyek 'setup'
        storageState: AUTH_FILE,
      },

      // **KUNCI:** Tentukan bahwa proyek ini BERGANTUNG pada 'setup'
      // Ini memastikan 'setup' berjalan SEBELUM proyek 'chromium'
      dependencies: ['setup'],

      // Pastikan file setup tidak dijalankan lagi sebagai tes biasa
      testIgnore: /.*\.setup\.ts/,
    },

    // (Opsional) Tambahkan browser lain yang juga bergantung pada setup
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     storageState: AUTH_FILE,
    //   },
    //   dependencies: ['setup'],
    //   testIgnore: /.*\.setup\.ts/,
    // },
  ],
});