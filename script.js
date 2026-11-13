
"use strict";

// ==========================================
// PENGATURAN USAHA NUSANTARA HANTARAN
// ==========================================

const BUSINESS_WHATSAPP = "6285269205243";

const BUSINESS_ADDRESS =
  "Dusun VII Sungai Krambil Desa Lubuk Rumbai Kecamatan Tuah Negeri Kabupaten Musi Rawas";

// ==========================================
// DATA PRODUK NUSANTARA HANTARAN
// ==========================================

const products = [
  {
    name: "Hantaran Rustic Elegance",
    category: "Lamaran",
    price: "Mulai Rp350.000",
    description: "Nuansa natural dengan detail pita dan bunga lembut.",
    image: "https://i0.wp.com/einvite.id/wp-content/uploads/seserahan-modern.jpg"
  },
  {
    name: "Seserahan Classic Gold",
    category: "Pernikahan",
    price: "Mulai Rp650.000",
    description: "Tampilan anggun dengan sentuhan warna emas.",
    image: "https://static.wixstatic.com/media/c328a8_d7393fa472f648948e5fbe7466d3a9fe~mv2.jpeg/v1/fill/w_1000,h_759,al_c,q_85,usm_0.66_1.00_0.01/c328a8_d7393fa472f648948e5fbe7466d3a9fe~mv2.jpeg"
  },
  {
    name: "Hantaran Floral",
    category: "Lamaran",
    price: "Mulai Rp400.000",
    description: "Dekorasi floral manis untuk hari penuh makna.",
    image: "https://sribulink.com/storage/uploads/blog/2025/09/tradisi-unik-seserahan-di-berbagai-daerah-indonesia-yang-jarang-dibahas-l.webp"
  },
  {
    name: "Gift Box Celebration",
    category: "Hadiah",
    price: "Mulai Rp175.000",
    description: "Kotak hadiah personal untuk orang tersayang.",
    image: "https://www.tangerangnews.com/assets/uploaded/photo/2023/08/12/87974b148a7dbb8d2eab116d54d7997d.jpg"
  },
  {
    name: "Hantaran Wisuda",
    category: "Wisuda",
    price: "Mulai Rp150.000",
    description: "Pilihan hadiah cantik untuk merayakan kelulusan.",
    image: "https://i.pinimg.com/736x/db/1a/21/db1a21005571a723057b7d2d32f26b0e.jpg"
  },
  {
    name: "Custom Tray Set",
    category: "Pernikahan",
    price: "Konsultasi harga",
    description: "Desain dan isi dapat disesuaikan dengan tema acara.",
    image: "https://i.pinimg.com/originals/86/65/a7/8665a79a40d52241f2d3769ddc9103f4.jpg"
  }
];

// ==========================================
// KONFIGURASI WHATSAPP
// ==========================================

const waNumber = BUSINESS_WHATSAPP;

const isConfigured = /^62\d{8,15}$/.test(waNumber);

function waLink(message) {
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
}

const waDisplay = document.getElementById("waDisplay");
const addressDisplay = document.getElementById("addressDisplay");

if (waDisplay) {
  waDisplay.textContent = isConfigured
    ? `+${waNumber}`
    : "Nomor belum diatur";
}

if (addressDisplay) {
  addressDisplay.textContent = BUSINESS_ADDRESS;
}

const defaultMessage =
  "Halo Nusantara Hantaran, saya ingin bertanya tentang layanan hantaran.";

// Tombol WhatsApp utama dan tombol mengambang

["contactWhatsApp", "floatingWhatsApp"].forEach(id => {
  const el = document.getElementById(id);

  if (!el) return;

  if (isConfigured) {
    el.href = waLink(defaultMessage);
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  } else {
    el.href = "#kontak";

    el.addEventListener("click", e => {
      e.preventDefault();
      alert("Silakan atur nomor WhatsApp usaha pada file script.js.");
    });
  }
});

// ==========================================
// FUNGSI KEAMANAN TEKS HTML
// ==========================================

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

// ==========================================
// MENAMPILKAN PRODUK
// ==========================================

const productGrid = document.getElementById("productGrid");

function renderProducts(filter = "Semua") {
  if (!productGrid) return;

  const list = products.filter(product =>
    filter === "Semua" || product.category === filter
  );

  productGrid.innerHTML = list.map(product => `
    <article class="product-card">

      <img
        src="${escapeHTML(product.image)}"
        alt="${escapeHTML(product.name)}"
        loading="lazy"
      >

      <div class="product-info">

        <span class="product-category">
          ${escapeHTML(product.category)}
        </span>

        <h3>${escapeHTML(product.name)}</h3>

        <p>${escapeHTML(product.description)}</p>

        <div class="product-bottom">

          <span class="product-price">
            ${escapeHTML(product.price)}
          </span>

          <button
            class="small-order"
            type="button"
            data-product="${escapeHTML(product.name)}"
          >
            Tanya produk ↗
          </button>

        </div>
      </div>

    </article>
  `).join("");

  // Tombol pemesanan setiap produk

  productGrid.querySelectorAll("[data-product]").forEach(btn => {
    btn.addEventListener("click", () => {

      const productName = btn.dataset.product;

      const message =
        `Halo Nusantara Hantaran, saya tertarik dengan ${productName}. Mohon informasi detail dan harganya.`;

      if (isConfigured) {
        window.open(
          waLink(message),
          "_blank",
          "noopener,noreferrer"
        );
      } else {
        alert("Nomor WhatsApp belum diatur.");
      }

    });
  });
}

renderProducts();

// ==========================================
// FILTER KATEGORI PRODUK
// ==========================================

const filters = document.getElementById("filters");

if (filters) {

  filters.addEventListener("click", e => {

    const btn = e.target.closest("[data-filter]");

    if (!btn) return;

    document.querySelectorAll(".filter").forEach(button => {

      button.classList.toggle("active", button === btn);

    });

    renderProducts(btn.dataset.filter);

  });

}

// ==========================================
// MENU NAVIGASI RESPONSIF
// ==========================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

  menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

  });

  document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

      navMenu.classList.remove("open");

    });

  });

}

// ==========================================
// TAHUN OTOMATIS
// ==========================================

const yearElement = document.getElementById("year");

if (yearElement) {

  yearElement.textContent = new Date().getFullYear();

}

// ==========================================
// SISTEM RATING BINTANG
// ==========================================

let selectedRating = 5;

const starButtons = [
  ...document.querySelectorAll("#starPicker button")
];

function paintStars() {

  starButtons.forEach(button => {

    button.classList.toggle(
      "selected",
      Number(button.dataset.star) <= selectedRating
    );

  });

}

paintStars();

starButtons.forEach(button => {

  button.addEventListener("click", () => {

    selectedRating = Number(button.dataset.star);

    paintStars();

  });

});

// ==========================================
// SISTEM ULASAN PELANGGAN
// ==========================================

const STORAGE_KEY = "nusantaraHantaranReviews";

function getReviews() {

  try {

    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

  } catch (error) {

    return [];

  }

}

function renderReviews() {

  const reviews = getReviews();

  const reviewCount = document.getElementById("reviewCount");
  const reviewList = document.getElementById("reviewList");

  if (reviewCount) {

    reviewCount.textContent = `${reviews.length} ulasan`;

  }

  if (reviewList) {

    reviewList.innerHTML = reviews
      .slice()
      .reverse()
      .map(review => `

        <article class="review-item">

          <strong>${escapeHTML(review.name)}</strong>

          <div class="review-stars">
            ${"★".repeat(Math.max(0, Math.min(5, Number(review.rating) || 0)))}
            ${"☆".repeat(5 - Math.max(0, Math.min(5, Number(review.rating) || 0)))}
          </div>

          <p>${escapeHTML(review.text)}</p>

        </article>

      `)
      .join("");

  }

}

renderReviews();

// ==========================================
// FORMULIR ULASAN
// ==========================================

const reviewForm = document.getElementById("reviewForm");

if (reviewForm) {

  reviewForm.addEventListener("submit", e => {

    e.preventDefault();

    const nameInput = document.getElementById("reviewName");
    const reviewInput = document.getElementById("reviewText");

    if (!nameInput || !reviewInput) return;

    const name = nameInput.value.trim();
    const review = reviewInput.value.trim();

    if (!name || !review) return;

    const reviews = getReviews();

    reviews.push({

      name: name,
      text: review,
      rating: selectedRating,
      date: new Date().toISOString()

    });

    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(reviews)
      );

    } catch (error) {

      alert("Ulasan tidak dapat disimpan pada browser ini.");
      return;

    }

    reviewForm.reset();

    selectedRating = 5;

    paintStars();

    renderReviews();

    const reviewMessage =
      document.getElementById("reviewMessage");

    if (reviewMessage) {

      reviewMessage.textContent =
        "Terima kasih! Ulasan Anda berhasil ditambahkan pada perangkat ini.";

    }

  });

}

// ==========================================
// FORMULIR PEMESANAN WHATSAPP
// ==========================================

const orderForm = document.getElementById("orderForm");

if (orderForm) {

  orderForm.addEventListener("submit", e => {

    e.preventDefault();

    if (!isConfigured) {

      alert(
        "Nomor WhatsApp belum diatur. Silakan periksa BUSINESS_WHATSAPP pada file script.js."
      );

      return;

    }

    const val = id => {

      const element = document.getElementById(id);

      return element ? element.value.trim() : "";

    };

    const message = [

      "Halo Nusantara Hantaran, saya ingin konsultasi/pemesanan.",

      `Nama: ${val("customerName")}`,

      `Nomor kontak: ${val("customerPhone")}`,

      `Jenis hantaran: ${val("eventType")}`,

      `Tanggal acara: ${val("eventDate") || "-"}`,

      `Detail pesanan: ${val("orderNotes") || "-"}`

    ].join("\n");

    window.open(
      waLink(message),
      "_blank",
      "noopener,noreferrer"
    );

  });

}

// ==========================================
// SCRIPT.JS NUSANTARA HANTARAN SELESAI
// ==========================================

    `Detail pesanan: ${val("orderNotes")||"-"}`
  ].join("\n");
  window.open(waLink(message),"_blank");
});
