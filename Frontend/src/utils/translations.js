// translations.js
export const translations = {
    id: {
        // Navigation
        dashboard: 'Dashboard',
        products: 'Produk',
        transfers: 'Transfer',
        reports: 'Laporan',
        admins: 'Admin',
        profile: 'Profil',
        settings: 'Pengaturan',
        logout: 'Keluar',

        // Common
        save: 'Simpan',
        cancel: 'Batal',
        delete: 'Hapus',
        edit: 'Ubah',
        add: 'Tambah',
        search: 'Cari',
        loading: 'Memuat...',
        noData: 'Tidak ada data',

        // Settings
        settingsTitle: 'Pengaturan',
        notifications: 'Notifikasi',
        pushNotifications: 'Notifikasi Push',
        pushNotificationsDesc: 'Terima pembaruan real-time tentang pergerakan stok',
        emailAlerts: 'Alert Email',
        emailAlertsDesc: 'Terima notifikasi email untuk alert stok menipis',
        security: 'Keamanan',
        twoFactorAuth: 'Autentikasi Dua Faktor',
        twoFactorAuthDesc: 'Tambahkan lapisan keamanan ekstra untuk akun Anda',
        preferences: 'Preferensi',
        language: 'Bahasa',
        theme: 'Tema',
        light: 'Terang',
        dark: 'Gelap',
        saveSettings: 'Simpan Pengaturan',

        // Products
        manageProducts: 'Kelola Katalog Produk',
        addProduct: 'Tambah Produk',
        productName: 'Nama Produk',
        sku: 'SKU',
        category: 'Kategori',
        stock: 'Stok',
        price: 'Harga',
        description: 'Deskripsi',
        unit: 'Satuan',
        costPrice: 'Harga Modal',
        sellPrice: 'Harga Jual',

        // Transfers
        manageTransfers: 'Kelola Transfer Stok',
        createTransfer: 'Buat Transfer',
        fromStore: 'Dari Toko',
        toStore: 'Ke Toko',
        quantity: 'Jumlah',
        notes: 'Catatan',
        pending: 'Menunggu',
        approved: 'Disetujui',
        rejected: 'Ditolak',
        completed: 'Selesai',
    },
    en: {
        // Navigation
        dashboard: 'Dashboard',
        products: 'Products',
        transfers: 'Transfers',
        reports: 'Reports',
        admins: 'Admins',
        profile: 'Profile',
        settings: 'Settings',
        logout: 'Logout',

        // Common
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        add: 'Add',
        search: 'Search',
        loading: 'Loading...',
        noData: 'No data found',

        // Settings
        settingsTitle: 'Settings',
        notifications: 'Notifications',
        pushNotifications: 'Push Notifications',
        pushNotificationsDesc: 'Receive real-time updates about stock movements',
        emailAlerts: 'Email Alerts',
        emailAlertsDesc: 'Receive email notifications for low stock alerts',
        security: 'Security',
        twoFactorAuth: 'Two-Factor Authentication',
        twoFactorAuthDesc: 'Add an extra layer of security to your account',
        preferences: 'Preferences',
        language: 'Language',
        theme: 'Theme',
        light: 'Light',
        dark: 'Dark',
        saveSettings: 'Save Settings',

        // Products
        manageProducts: 'Manage Product Catalog',
        addProduct: 'Add Product',
        productName: 'Product Name',
        sku: 'SKU',
        category: 'Category',
        stock: 'Stock',
        price: 'Price',
        description: 'Description',
        unit: 'Unit',
        costPrice: 'Cost Price',
        sellPrice: 'Selling Price',

        // Transfers
        manageTransfers: 'Manage Stock Transfers',
        createTransfer: 'Create Transfer',
        fromStore: 'From Store',
        toStore: 'To Store',
        quantity: 'Quantity',
        notes: 'Notes',
        pending: 'Pending',
        approved: 'Approved',
        rejected: 'Rejected',
        completed: 'Completed',
    }
};

export const getTranslation = (key, lang = 'id') => {
    return translations[lang]?.[key] || translations.id[key] || key;
};