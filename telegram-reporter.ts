import { Reporter, FullResult, TestCase, TestResult } from '@playwright/test/reporter';
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import AdmZip from 'adm-zip';

// --- KONFIGURASI ---
const TELEGRAM_BOT_TOKEN = '8023659755:AAFoecOh1bozKAKqV32uliiCiUYnyVdkuxs';
const TELEGRAM_CHAT_ID = '-5105506507';

const TEST_RESULTS_FOLDER = './test-results';
const REPORT_ENTRY_FILE = './test-results/report.html';
const ZIP_OUTPUT_PATH = './laporan-automation.zip';
// -------------------

export default class TelegramReporter implements Reporter {

    // 1. Siapkan Variabel Penghitung (Counter)
    private passedCount = 0;
    private failedCount = 0;
    private flakyCount = 0;
    private skippedCount = 0;

    // 2. Fungsi ini jalan SETIAP KALI satu test selesai
    // Kita pakai untuk menghitung statusnya
    onTestEnd(test: TestCase, result: TestResult) {
        // test.outcome() memberikan status akhir yang akurat (termasuk handling retry)
        const outcome = test.outcome();

        if (outcome === 'expected') {
            this.passedCount++;
        } else if (outcome === 'unexpected') {
            this.failedCount++;
        } else if (outcome === 'flaky') {
            this.flakyCount++;
        } else if (outcome === 'skipped') {
            this.skippedCount++;
        }
    }

    async onEnd(result: FullResult) {
        console.log('🔄 Automation Selesai. Menyiapkan laporan Telegram...');

        // 3. Buat Pesan Ringkasan (Pakai variabel counter kita)
        const durationBtn = (result.duration / 1000).toFixed(0);

        // Tentukan emoji status global
        // Jika ada yang failed, maka status global Failed.
        const globalStatus = result.status === 'passed' ? 'PASSED' : 'FAILED';
        const statusEmoji = globalStatus === 'PASSED' ? '✅' : '❌';

        const summaryText = `
<b>📊 AUTOMATION REPORT</b>
--------------------------------
${statusEmoji} <b>Result: ${globalStatus}</b>
⏱ Duration: ${durationBtn}s
--------------------------------
✅ Passed: ${this.passedCount}
❌ Failed: ${this.failedCount}
⚠️ Flaky: ${this.flakyCount}
⏩ Skipped: ${this.skippedCount}
--------------------------------
<i>📂 Download file ZIP di bawah, Extract, lalu buka report.html</i>
    `;

        // 4. Kirim Pesan Text
        await this.sendMessage(summaryText);

        // 5. Proses ZIP Folder & Kirim
        if (fs.existsSync(REPORT_ENTRY_FILE)) {
            try {
                console.log('📦 Mengompres folder test-results menjadi ZIP...');
                const zip = new AdmZip();

                // Masukkan seluruh folder
                zip.addLocalFolder(TEST_RESULTS_FOLDER);
                zip.writeZip(ZIP_OUTPUT_PATH);
                console.log(`✅ File ZIP berhasil dibuat: ${ZIP_OUTPUT_PATH}`);

                // Kirim ke Telegram
                console.log('📤 Mengirim file ZIP ke Telegram...');
                await this.sendDocument(ZIP_OUTPUT_PATH, 'Laporan-Full-Evidence.zip');

            } catch (err) {
                console.error('❌ Gagal membuat atau mengirim ZIP:', err);
            }
        } else {
            console.log('⚠️ Folder report tidak ditemukan.');
        }
    }

    // --- Helper Send Message ---
    async sendMessage(text: string) {
        try {
            await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                chat_id: TELEGRAM_CHAT_ID,
                text: text,
                parse_mode: 'HTML'
            });
        } catch (e) {
            console.error('⚠️ Gagal kirim pesan text Telegram.');
        }
    }

    // --- Helper Send Document ---
    async sendDocument(filePath: string, fileName: string) {
        try {
            if (!fs.existsSync(filePath)) throw new Error("File ZIP tidak ditemukan.");

            const form = new FormData();
            form.append('chat_id', TELEGRAM_CHAT_ID);
            form.append('document', fs.createReadStream(filePath), fileName);
            form.append('caption', '📂 <b>Panduan:</b>\n1. Download File\n2. Extract/Unzip\n3. Buka file <code>report.html</code>');

            await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, form, {
                headers: form.getHeaders(),
                maxContentLength: 524288000,
                maxBodyLength: 524288000
            } as any); // <--- Tambahkan 'as any' di sini agar merahnya hilang
            console.log('✅ Laporan ZIP berhasil dikirim ke Telegram!');
        } catch (e: any) {
            const errorMsg = e.response ? JSON.stringify(e.response.data) : e.message;
            console.error('❌ Gagal kirim file ZIP ke Telegram:', errorMsg);
        }
    }
}