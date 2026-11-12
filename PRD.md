# APA YANG AKAN DIBANGUN? (PRD: NabungNih)
PRD.md berisi problem statement, target pengguna, fitur utama, user flow, dan acceptance criteria untuk aplikasi pencatatan keuangan/tabungan pribadi.

## 1. Overview
Aplikasi web pencatatan keuangan pribadi dan kas (NabungNih) untuk membantu pengguna melacak pemasukan, pengeluaran, dan target tabungan secara sederhana, transparan, dan terorganisir.

## 2. Problem Statement
Pengguna sering kesulitan mengontrol pengeluaran harian, memantau sisa saldo kas secara akurat, dan merencanakan target tabungan masa depan karena pencatatan masih dilakukan secara manual atau terpisah-pisah.

## 3. Target Users
- Mahasiswa yang ingin mengelola uang saku.
- Pekerja atau karyawan pemula (first jobber).
- Freelancer dengan pemasukan yang tidak tetap.
- Siapa saja yang ingin mulai menabung secara teratur.

## 4. Core Features
### Authentication
- Register dan login akun pengguna.
- Logout sesi pengguna.
- Setiap pengguna hanya dapat melihat dan mengelola data keuangannya sendiri.
### Transaction Management (Pemasukan & Pengeluaran)
- Menambahkan catatan pemasukan baru (jumlah, sumber, tanggal, kategori).
- Menambahkan catatan pengeluaran baru (jumlah, keperluan, tanggal, kategori).
- Mengedit dan menghapus catatan transaksi.
### Savings / Target Management
- Membuat target tabungan (nama target, nominal yang ingin dicapai, deadline).
- Menambah atau menarik dana dari target tabungan tertentu.
### Dashboard & Summary
- Menampilkan total saldo saat ini (Total Pemasukan - Total Pengeluaran).
- Menampilkan riwayat transaksi terbaru.
- Menampilkan ringkasan visual progres target tabungan.

## 5. User Flow
1. Pengguna melakukan registrasi/login ke akun NabungNih.
2. Pengguna masuk ke halaman utama (Dashboard) untuk melihat ringkasan saldo.
3. Pengguna mencatat transaksi baru (pemasukan atau pengeluaran).
4. Pengguna memantau progres target tabungan atau melihat riwayat transaksi.
5. Pengguna mengelola, mengedit, atau menghapus data keuangan jika diperlukan.

## 6. Acceptance Criteria
- Pengguna dapat mencatat transaksi dengan nominal dan kategori yang valid.
- Saldo total pada dashboard otomatis ter-update setiap kali ada transaksi baru.
- Data keuangan hanya dapat diakses oleh pemilik akun yang bersangkutan.
- Sistem menampilkan pesan error jika form input wajib dikosongkan.

## 7. Out of Scope
- Integrasi otomatis dengan rekening bank (m-banking API).
- Fitur bagi hasil atau tabungan bersama (patungan/group wallet).
- Ekspor laporan ke PDF/Excel lanjutan.

## 8. Success Metrics
- Pengguna berhasil mencatat transaksi pemasukan dan pengeluaran.
- Pengguna dapat membuat dan memantau target tabungan mereka tanpa kendala.