import 'dotenv/config'; // <-- KUNCI UTAMA: Impor dan muat .env di baris paling atas.
import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Ambil data dari environment variables
  const username = process.env.APP_USERNAME;
  const password = process.env.APP_PASSWORD;
  const accountName = process.env.APP_ACCOUNT;

  // Pastikan variabel ada
  if (!username || !password || !accountName) {
    throw new Error('Username, password, atau account name tidak ditemukan di .env');
  }

  // Buka halaman login (menggunakan baseURL dari config)
  await page.goto('https://demo.sunfishhr.com/');

  // Isi form login dengan selector yang lebih user-centric
  await page.getByPlaceholder('User ID').fill(username);
  await page.getByLabel('Password').fill(password);
  //await page.getByLabel('Account Name').fill(accountName);
  await page.getByRole('button', { name: 'Login' }).click();

  // Verifikasi login berhasil dengan assertion yang andal
  // Asumsi nama 'Gordon' muncul sebagai heading di halaman dashboard
  //await expect(page).toHaveURL('https://workplaze.dataon.com/standard/home');
  //await expect(page.getByLabel('Gordon Enns')).toBeVisible();
  const locator = page.getByText('Gordon DEMO');
  await locator.waitFor({ state: 'visible', timeout: 15000 });
  await expect(locator).toBeVisible();


  // Simpan state otentikasi
  await page.context().storageState({ path: authFile });
});