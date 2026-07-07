import { useState, useEffect } from "react";
import {
  Search, ShoppingBag, Heart, User, Phone, Menu, X,
  ChevronDown, Star, Shield, Truck, RefreshCw, CreditCard,
  MapPin, Clock, Facebook, Instagram, Youtube, ArrowRight,
  Plus, Minus, Eye, Check, Package, Flame, BadgeCheck, MessageCircle,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
type Page =
  | "home"
  | "products"
  | "product"
  | "cart"
  | "checkout"
  | "about"
  | "contact"
  | "blog"
  | "blog-detail"
  | "wishlist"
  | "account"
  | "search"
  | "sale"
  | "size-guide"
  | "returns"
  | "warranty"
  | "shipping"
  | "terms"
  | "privacy";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  category: string;
  colors: string[];
}

// ── Data ────────────────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Giày Oxford Đen - Lịch sự cho gặp khách",
    price: 1290000,
    originalPrice: 1590000,
    rating: 5,
    reviews: 128,
    image: "/images/tuan-anh-products/giay-oxford-da-den.png",
    badge: "Bán chạy",
    category: "Oxford",
    colors: ["#8B5E3C", "#1B1B1B"],
  },
  {
    id: 2,
    name: "Giày Derby Đen - Dễ mang cho công sở",
    price: 1190000,
    rating: 5,
    reviews: 96,
    image: "https://images.unsplash.com/photo-1777987601426-c05a82045862?w=600&h=750&fit=crop&auto=format",
    badge: "Mới",
    category: "Derby",
    colors: ["#1B1B1B"],
  },
  {
    id: 3,
    name: "Giày Loafer Nâu - Gọn nhẹ cho smart casual",
    price: 1450000,
    originalPrice: 1750000,
    rating: 5,
    reviews: 73,
    image: "/images/tuan-anh-products/giay-loafer-da-nau.png",
    badge: "Sale",
    category: "Loafer",
    colors: ["#1B1B1B", "#6B4F3A"],
  },
  {
    id: 4,
    name: "Chelsea Boot Cognac - Phối jeans và chinos",
    price: 1690000,
    rating: 5,
    reviews: 54,
    image: "https://images.unsplash.com/photo-1638609348722-aa2a3a67db26?w=600&h=750&fit=crop&auto=format",
    badge: "Giới hạn",
    category: "Boot",
    colors: ["#8B5E3C"],
  },
  {
    id: 5,
    name: "Giày Oxford Cognac - Chỉn chu cho sự kiện",
    price: 1390000,
    originalPrice: 1590000,
    rating: 5,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1603191659812-ee978eeeef76?w=600&h=750&fit=crop&auto=format",
    badge: "Sale",
    category: "Oxford",
    colors: ["#8B5E3C", "#5C3A1E"],
  },
  {
    id: 6,
    name: "Giày Lười Da Nâu - Dễ dùng hằng ngày",
    price: 1250000,
    rating: 5,
    reviews: 112,
    image: "/images/tuan-anh-products/giay-luoi-da-nau.png",
    category: "Loafer",
    colors: ["#8B5E3C"],
  },
  {
    id: 7,
    name: "Dép Da Nâu - Thoải mái cho ngày thường",
    price: 1350000,
    rating: 4,
    reviews: 61,
    image: "/images/tuan-anh-products/dep-da-nau-gian-di.png",
    badge: "Mới",
    category: "Dép da",
    colors: ["#8B5E3C", "#1B1B1B"],
  },
  {
    id: 8,
    name: "Ví Da Nâu Gập Đôi - Gợi ý quà tặng nam",
    price: 1490000,
    rating: 5,
    reviews: 43,
    image: "/images/tuan-anh-products/vi-da-nau-gap-doi.png",
    badge: "Mới",
    category: "Ví da",
    colors: ["#8B5E3C", "#1B1B1B"],
  },
];

const CATEGORIES = [
  { name: "Oxford", desc: "Công sở, gặp khách, sự kiện", image: "/images/tuan-anh-products/giay-oxford-da-den.png" },
  { name: "Derby", desc: "Dễ mang cho đi làm hằng ngày", image: "https://images.unsplash.com/photo-1777987601426-c05a82045862?w=400&h=500&fit=crop&auto=format" },
  { name: "Loafer", desc: "Không dây, tiện, smart casual", image: "/images/tuan-anh-products/giay-loafer-da-nau.png" },
  { name: "Chelsea Boot", desc: "Cá tính, hợp jeans và chinos", image: "https://images.unsplash.com/photo-1638609348722-aa2a3a67db26?w=400&h=500&fit=crop&auto=format" },
  { name: "Dép da nam", desc: "Thoải mái cho ngày thường", image: "/images/tuan-anh-products/dep-da-nau-quai-hau.png" },
  { name: "Ví & thắt lưng", desc: "Phụ kiện da dễ làm quà", image: "/images/tuan-anh-products/combo-vi-da-that-lung-nau.png" },
];

const BRAND_NAME = "Tuấn Anh Shop";
const BRAND_SEO_NAME = "Tuấn Anh Shop - Giày Đà Nẵng";
const BRAND_TAGLINE = "Giày da & phụ kiện da tại Đà Nẵng";
const BRAND_DESCRIPTION = "Chuyên giày da, ví da, thắt lưng da và phụ kiện da tại Đà Nẵng.";
const BRAND_PHONE = "090 554 08 35";
const BRAND_TEL = "0905540835";
const BRAND_FACEBOOK = "https://www.facebook.com/shopgiaydadn";
const BRAND_LOCATIONS = [
  "741 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng",
  "755 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng",
  "120 Đống Đa, Hải Châu, Đà Nẵng",
];

const REVIEWS = [
  {
    name: "Đi làm hằng ngày",
    role: "Ưu tiên dễ mang",
    avatar: "VP",
    rating: 5,
    date: "Nhu cầu sử dụng",
    text: "Ưu tiên form dễ chịu, màu dễ phối và không quá cứng chân khi mang nhiều giờ. Derby hoặc Loafer thường là lựa chọn dễ bắt đầu.",
    product: "Gợi ý: Derby, Loafer",
  },
  {
    name: "Gặp khách hàng",
    role: "Cần vẻ ngoài chỉn chu",
    avatar: "QA",
    rating: 5,
    date: "Nhu cầu sử dụng",
    text: "Nên chọn giày có phom gọn, màu an toàn và dễ phối với quần tây, sơ mi hoặc blazer nhẹ để tổng thể lịch sự hơn.",
    product: "Gợi ý: Oxford, Derby",
  },
  {
    name: "Dự tiệc / cưới hỏi",
    role: "Cần trang trọng hơn",
    avatar: "DT",
    rating: 5,
    date: "Nhu cầu sử dụng",
    text: "Các dịp cần hình ảnh chỉn chu nên ưu tiên Oxford hoặc những mẫu giày da có đường nét gọn, màu hợp với bộ đồ sẽ mặc.",
    product: "Gợi ý: Oxford",
  },
  {
    name: "Dễ mang mỗi ngày",
    role: "Cần tiện và linh hoạt",
    avatar: "DN",
    rating: 5,
    date: "Nhu cầu sử dụng",
    text: "Nếu muốn một đôi gọn, dễ xỏ và dùng được với nhiều trang phục, Loafer hoặc dép da nam sẽ phù hợp hơn các mẫu quá trang trọng.",
    product: "Gợi ý: Loafer, dép da",
  },
];

const FAQS = [
  {
    q: "Shop có tư vấn size trước khi đặt không?",
    a: `Có. Bạn có thể gọi/Zalo ${BRAND_PHONE}, gửi chiều dài bàn chân hoặc size thường mang để shop tư vấn trước theo từng mẫu.`,
  },
  {
    q: "Giày nào phù hợp đi làm hằng ngày?",
    a: "Nếu cần đi làm hằng ngày, Derby hoặc Loafer thường dễ dùng hơn vì vừa lịch sự vừa không quá trang trọng. Màu đen, nâu hoặc cognac sẽ dễ phối với quần tây và chinos.",
  },
  {
    q: "Oxford và Derby khác nhau thế nào?",
    a: "Oxford thường gọn và trang trọng hơn, hợp gặp khách hàng hoặc sự kiện. Derby có phần buộc dây mở nên dễ mang hơn, phù hợp người mới mua giày da hoặc dùng đi làm hằng ngày.",
  },
  {
    q: "Không vừa size có đổi được không?",
    a: "Shop sẽ tư vấn thông tin hỗ trợ đổi size theo điều kiện của từng đơn hàng. Trước khi đặt, bạn nên hỏi kỹ size, form giày và điều kiện hỗ trợ để hạn chế đổi trả.",
  },
  {
    q: "Có thể ghé cửa hàng xem trực tiếp không?",
    a: `Có. Tuấn Anh Shop có 3 cơ sở: ${BRAND_LOCATIONS.join("; ")}. Bạn có thể gọi/Zalo ${BRAND_PHONE} trước khi ghé để hỏi mẫu quan tâm.`,
  },
  {
    q: "Ngoài giày da nam, shop có phụ kiện không?",
    a: "Có. Tuấn Anh Shop có ví da, thắt lưng da và phụ kiện da cho nam, phù hợp để phối cùng giày hoặc chọn làm quà tặng.",
  },
];

const BLOG_POSTS = [
  {
    title: "Mua giày da nam Đà Nẵng: nên thử trực tiếp những gì?",
    excerpt: "Trước khi quyết định, hãy kiểm tra độ ôm mũi chân, độ rộng mu bàn chân, màu da dưới ánh sáng thật và cách phối với trang phục thường mặc.",
    category: "Kiến thức",
    date: "28/06/2025",
    readTime: "4 phút",
    image: "https://images.unsplash.com/photo-1653868251002-dbeae91e1960?w=600&h=380&fit=crop&auto=format",
  },
  {
    title: "Oxford, Derby hay Loafer: chọn theo dịp sử dụng",
    excerpt: "Một đôi để đi làm hằng ngày sẽ khác đôi dùng khi gặp khách hàng hoặc dự tiệc. Cách chọn đúng là bắt đầu từ hoàn cảnh bạn mang nhiều nhất.",
    category: "Phong cách",
    date: "20/06/2025",
    readTime: "6 phút",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&h=380&fit=crop&auto=format",
  },
  {
    title: "Chọn ví da và thắt lưng da làm quà cho nam",
    excerpt: "Khi mua quà, nên ưu tiên màu dễ dùng, kiểu dáng gọn, kích thước phù hợp thói quen mang theo và có thể phối cùng giày da đang sử dụng.",
    category: "Quà tặng",
    date: "12/06/2025",
    readTime: "5 phút",
    image: "/images/tuan-anh-products/bo-phu-kien-da-nam.png",
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────────
function fmt(price: number) {
  return price.toLocaleString("vi-VN") + "đ";
}

const pageLabel: Record<Page, string> = {
  home: "Trang chủ",
  products: "Sản phẩm",
  product: "Chi tiết sản phẩm",
  cart: "Giỏ hàng",
  checkout: "Thanh toán",
  about: "Giới thiệu",
  contact: "Liên hệ",
  blog: "Blog",
  "blog-detail": "Bài viết",
  wishlist: "Yêu thích",
  account: "Tài khoản",
  search: "Tìm kiếm",
  sale: "Khuyến mãi",
  "size-guide": "Hướng dẫn chọn size",
  returns: "Chính sách đổi trả",
  warranty: "Chính sách bảo hành",
  shipping: "Chính sách giao hàng",
  terms: "Điều khoản sử dụng",
  privacy: "Chính sách bảo mật",
};

const pagePaths: Record<Page, string> = {
  home: "/",
  products: "/san-pham",
  product: "/san-pham/oxford-cognac-classic",
  cart: "/gio-hang",
  checkout: "/thanh-toan",
  about: "/gioi-thieu",
  contact: "/lien-he",
  blog: "/blog",
  "blog-detail": "/blog/cach-phan-biet-da-that",
  wishlist: "/yeu-thich",
  account: "/tai-khoan",
  search: "/tim-kiem",
  sale: "/khuyen-mai",
  "size-guide": "/huong-dan-chon-size",
  returns: "/chinh-sach-doi-tra",
  warranty: "/chinh-sach-bao-hanh",
  shipping: "/chinh-sach-giao-hang",
  terms: "/dieu-khoan-su-dung",
  privacy: "/chinh-sach-bao-mat",
};

function pageFromPath(pathname: string): Page {
  const match = (Object.entries(pagePaths) as [Page, string][]).find(([, path]) => path === pathname);
  return match?.[0] ?? "home";
}

function Breadcrumb({ current, onNavigate }: { current: string; onNavigate: (p: Page) => void }) {
  return (
    <nav className="text-[12px] text-gray-400 mb-6 sm:mb-8">
      <button className="hover:text-[#8B5E3C]" onClick={() => onNavigate("home")}>
        Trang chủ
      </button>
      <span className="mx-2">/</span>
      <span className="text-[#1B1B1B]">{current}</span>
    </nav>
  );
}

function PageHero({
  eyebrow,
  title,
  text,
  image,
  action,
  onAction,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <section className="relative overflow-hidden rounded-none bg-[#1B1B1B] text-white -mx-4 sm:-mx-6 lg:-mx-10 mb-10 sm:mb-14">
      <div className="absolute inset-0">
        <img src={image} alt="" className="w-full h-full object-cover opacity-[0.34]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B1B1B] via-[#1B1B1B]/78 to-[#1B1B1B]/28" />
      </div>
      <div className="relative px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 max-w-3xl">
        <span className="inline-flex text-[10px] tracking-[0.28em] uppercase text-[#CFA27A] border border-white/12 rounded-full px-4 py-2 mb-5">
          {eyebrow}
        </span>
        <h1 className="text-[34px] sm:text-5xl lg:text-6xl font-extrabold leading-[1.04] tracking-normal mb-4">
          {title}
        </h1>
        <p className="text-white/70 text-[14px] sm:text-[15px] leading-relaxed max-w-xl">{text}</p>
        {action && onAction && (
          <button
            className="mt-7 bg-[#8B5E3C] text-white font-bold text-[13px] px-6 py-3.5 rounded-full hover:bg-[#7A5232] transition-colors"
            onClick={onAction}
          >
            {action}
          </button>
        )}
      </div>
    </section>
  );
}

function Stars({ n, size = 13 }: { n: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={s <= n ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
        />
      ))}
    </div>
  );
}

// ── ProductCard ────────────────────────────────────────────────────────────────
function ProductCard({
  product,
  onView,
  onAdd,
}: {
  product: Product;
  onView: () => void;
  onAdd: () => void;
}) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const disc = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <article
      className="group relative bg-card rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_12px_48px_rgba(27,27,27,0.12)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onView}
    >
      <div className="relative aspect-[4/5] bg-[#F5F0EB] overflow-hidden">
        <img
          src={product.image}
          alt={`Giày da nam ${product.name} – ${BRAND_SEO_NAME}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          loading="lazy"
          style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
        />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider ${
              product.badge === "Sale" ? "bg-red-500 text-white" : "bg-[#1B1B1B] text-white"
            }`}
          >
            {product.badge}
          </span>
        )}
        {disc > 0 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
            -{disc}%
          </span>
        )}
        <div
          className={`absolute inset-x-0 bottom-0 p-3 flex gap-2 transition-all duration-300 opacity-100 translate-y-0 sm:opacity-0 sm:translate-y-3 ${
            hovered ? "sm:opacity-100 sm:translate-y-0" : ""
          }`}
        >
          <button
            className="w-10 sm:w-auto sm:flex-1 bg-[#1B1B1B] text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-[#8B5E3C] transition-colors flex items-center justify-center gap-1.5"
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            aria-label="Thêm vào giỏ"
          >
            <ShoppingBag size={14} />
            <span className="hidden sm:inline">Thêm vào giỏ</span>
          </button>
          <button
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-[#FAF7F4] transition-colors shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
          >
            <Heart
              size={15}
              className={liked ? "fill-red-500 text-red-500" : "text-[#1B1B1B]"}
            />
          </button>
          <button
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-[#FAF7F4] transition-colors shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              onView();
            }}
          >
            <Eye size={15} className="text-[#1B1B1B]" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[10px] text-[#8B5E3C] font-semibold uppercase tracking-[0.15em] mb-1">
          {product.category}
        </p>
        <h3 className="text-[#1B1B1B] font-semibold text-sm leading-snug mb-2">{product.name}</h3>
        <div className="flex items-center gap-1.5 mb-3">
          <Stars n={product.rating} size={11} />
          <span className="text-[11px] text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-2">
          <span className="text-[#1B1B1B] font-bold text-sm sm:text-base">{fmt(product.price)}</span>
          {product.originalPrice && (
            <span className="text-gray-400 text-xs line-through">{fmt(product.originalPrice)}</span>
          )}
        </div>
        <div className="flex gap-1.5">
          {product.colors.map((c) => (
            <div
              key={c}
              className="w-3.5 h-3.5 rounded-full border border-gray-200 shadow-sm"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

// ── Header ─────────────────────────────────────────────────────────────────────
function Header({
  onNavigate,
  cartCount,
}: {
  onNavigate: (p: Page) => void;
  cartCount: number;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const subCats = [
    "Giày công sở",
    "Giày Oxford",
    "Giày Derby",
    "Loafer",
    "Boot",
    "Phụ kiện",
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-[0_2px_24px_rgba(27,27,27,0.09)]"
          : "bg-white/96 backdrop-blur-sm"
      }`}
    >
      {/* Announcement bar */}
      <div className="bg-[#1B1B1B] text-white text-[11px] text-center py-2 px-4 tracking-wide">
        {BRAND_NAME}&nbsp;·&nbsp; {BRAND_TAGLINE} &nbsp;·&nbsp; 3 cơ sở tại Liên Chiểu & Hải Châu
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center h-[68px] gap-6">
          {/* Logo */}
          <button
            className="flex-shrink-0 flex items-center"
            onClick={() => onNavigate("home")}
            aria-label="Về trang chủ Tuấn Anh Shop"
          >
            <img
              src="/logo-tuan-anh-shop.png"
              alt={`${BRAND_NAME} - ${BRAND_TAGLINE}`}
              className="h-12 sm:h-14 w-auto max-w-[178px] sm:max-w-[220px] object-contain"
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7 flex-1 justify-center">
            <button
              className="text-[13px] font-medium text-[#1B1B1B] hover:text-[#8B5E3C] transition-colors"
              onClick={() => onNavigate("home")}
            >
              Trang chủ
            </button>

            {/* Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropOpen(true)}
              onMouseLeave={() => setDropOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-[13px] font-medium text-[#1B1B1B] hover:text-[#8B5E3C] transition-colors"
                onClick={() => onNavigate("products")}
              >
                Sản phẩm
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}
                />
              </button>
              {dropOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white rounded-2xl shadow-[0_12px_48px_rgba(27,27,27,0.14)] p-2 z-50">
                  {subCats.map((c) => (
                    <button
                      key={c}
                      className="w-full text-left text-[13px] text-[#1B1B1B] hover:text-[#8B5E3C] hover:bg-[#FAF7F4] px-4 py-2.5 rounded-xl transition-colors"
                      onClick={() => onNavigate("products")}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {[
              { label: "Khuyến mãi", page: "sale" as Page },
              { label: "Giới thiệu", page: "about" as Page },
              { label: "Blog", page: "blog" as Page },
              { label: "Liên hệ", page: "contact" as Page },
            ].map(({ label, page }) => (
              <button
                key={label}
                className="text-[13px] font-medium text-[#1B1B1B] hover:text-[#8B5E3C] transition-colors"
                onClick={() => onNavigate(page)}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-auto lg:ml-0">
            {searchOpen ? (
              <div className="flex items-center bg-[#F5F0EB] rounded-full px-4 py-2 gap-2 w-48">
                <Search size={14} className="text-[#8B5E3C] shrink-0" />
                <input
                  autoFocus
                  placeholder="Tìm kiếm..."
                  className="bg-transparent text-[13px] outline-none w-full text-[#1B1B1B] placeholder-gray-400"
                  onBlur={() => setSearchOpen(false)}
                />
              </div>
            ) : (
              <button
                className="p-2.5 hover:bg-[#F5F0EB] rounded-full transition-colors"
                onClick={() => {
                  setSearchOpen(true);
                  onNavigate("search");
                }}
              >
                <Search size={17} className="text-[#1B1B1B]" />
              </button>
            )}
            <button
              className="hidden sm:flex p-2.5 hover:bg-[#F5F0EB] rounded-full transition-colors"
              onClick={() => onNavigate("account")}
            >
              <User size={17} className="text-[#1B1B1B]" />
            </button>
            <button
              className="hidden sm:flex p-2.5 hover:bg-[#F5F0EB] rounded-full transition-colors"
              onClick={() => onNavigate("wishlist")}
            >
              <Heart size={17} className="text-[#1B1B1B]" />
            </button>
            <button
              className="relative p-2.5 hover:bg-[#F5F0EB] rounded-full transition-colors"
              onClick={() => onNavigate("cart")}
            >
              <ShoppingBag size={17} className="text-[#1B1B1B]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#8B5E3C] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <a
              href={`tel:${BRAND_TEL}`}
              className="hidden md:flex items-center gap-1.5 bg-[#8B5E3C] text-white text-[12px] font-semibold px-4 py-2 rounded-full hover:bg-[#7A5232] transition-colors ml-1"
            >
              <Phone size={12} />
              {BRAND_PHONE}
            </a>
            <button className="lg:hidden p-2.5 ml-1" onClick={() => setMobileOpen(true)}>
              <Menu size={19} className="text-[#1B1B1B]" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100]" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-6 py-5 border-b border-[#F0E9E1]">
              <span className="text-[#1B1B1B] font-bold text-sm">Menu</span>
              <button onClick={() => setMobileOpen(false)}>
                <X size={18} className="text-[#1B1B1B]" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {[
                { label: "Trang chủ", page: "home" as Page },
                { label: "Sản phẩm", page: "products" as Page },
                { label: "Giày công sở", page: "products" as Page },
                { label: "Giày Oxford", page: "products" as Page },
                { label: "Giày Derby", page: "products" as Page },
                { label: "Loafer", page: "products" as Page },
                { label: "Boot", page: "products" as Page },
                { label: "Khuyến mãi", page: "sale" as Page },
                { label: "Giới thiệu", page: "about" as Page },
                { label: "Blog", page: "blog" as Page },
                { label: "Liên hệ", page: "contact" as Page },
                { label: "Tài khoản", page: "account" as Page },
                { label: "Yêu thích", page: "wishlist" as Page },
              ].map(({ label, page }) => (
                <button
                  key={label}
                  className="w-full text-left px-6 py-3.5 text-sm text-[#1B1B1B] border-b border-[#F5F0EB] hover:text-[#8B5E3C] hover:bg-[#FAF7F4] transition-colors"
                  onClick={() => {
                    setMobileOpen(false);
                    onNavigate(page);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="p-6">
              <a
                href={`tel:${BRAND_TEL}`}
                className="flex items-center justify-center gap-2 bg-[#8B5E3C] text-white py-3.5 rounded-xl font-semibold text-sm"
              >
                <Phone size={15} />
                Gọi shop: {BRAND_PHONE}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────
function Hero({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <section className="relative min-h-screen flex items-center bg-[#1B1B1B] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/tuan-anh-products/giay-loafer-den-nau.png"
          alt="Giày da nam Tuấn Anh Shop"
          className="w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B1B1B] via-[#1B1B1B]/72 to-[#1B1B1B]/22" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 w-full pt-32 pb-20">
        <div className="max-w-[560px]">
          <div className="inline-flex items-center gap-2 border border-[#8B5E3C]/50 text-[#8B5E3C] text-[10px] font-bold tracking-[0.35em] uppercase px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5E3C] animate-pulse" />
            {BRAND_NAME} · Giày da nam & phụ kiện da
          </div>

          <h1 className="text-white text-[44px] sm:text-[56px] lg:text-[64px] font-extrabold leading-[1.05] tracking-tight mb-5">
            Giày da nam<br />
            <span className="text-[#8B5E3C]">lịch lãm</span><br />
            cho công sở
          </h1>

          <p className="text-white/65 text-[15px] sm:text-[17px] leading-relaxed mb-10 max-w-[440px]">
            Tuấn Anh Shop tuyển chọn các mẫu giày da nam dễ mang, dễ phối và phù hợp với nhu cầu
            đi làm, gặp khách hàng, dự tiệc hoặc sử dụng hằng ngày.
          </p>

          <div className="flex flex-wrap gap-3 mb-14">
            <button
              className="bg-[#8B5E3C] text-white font-bold px-8 py-4 rounded-full hover:bg-[#7A5232] transition-all hover:shadow-[0_8px_32px_rgba(139,94,60,0.45)] text-[14px] tracking-wide"
              onClick={() => onNavigate("products")}
            >
              Xem sản phẩm
            </button>
            <button
              className="border border-white/30 text-white font-medium px-8 py-4 rounded-full hover:bg-white/10 transition-all text-[14px] backdrop-blur-sm"
              onClick={() => onNavigate("size-guide")}
            >
              Tư vấn chọn size →
            </button>
          </div>

          <div className="flex gap-10 pt-8 border-t border-white/10">
            {[
              { val: "Oxford", label: "Gặp khách, sự kiện" },
              { val: "Derby", label: "Đi làm hằng ngày" },
              { val: "Loafer", label: "Dễ mang, smart casual" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-white font-extrabold text-xl">{s.val}</div>
                <div className="text-white/45 text-[12px] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── USP Strip ──────────────────────────────────────────────────────────────────
function USPStrip() {
  const items = [
    { icon: BadgeCheck, title: "Tư Vấn Theo Nhu Cầu", desc: "Đi làm, gặp khách, dự tiệc" },
    { icon: Shield, title: "Hỗ Trợ Chọn Size", desc: "Hỏi form trước khi đặt" },
    { icon: RefreshCw, title: "Gợi Ý Màu Dễ Phối", desc: "Đen, nâu, cognac" },
    { icon: Truck, title: "Có Thể Ghé Thử", desc: "3 cơ sở tại Đà Nẵng" },
    { icon: CreditCard, title: "Phối Phụ Kiện", desc: "Ví da, thắt lưng da" },
    { icon: Package, title: "Hỗ Trợ Sau Mua", desc: "Theo từng đơn hàng" },
  ];
  return (
    <section className="bg-white border-y border-[#F0E9E1] py-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF7F4] flex items-center justify-center mb-3 group-hover:bg-[#8B5E3C] transition-colors duration-300">
                <Icon
                  size={19}
                  className="text-[#8B5E3C] group-hover:text-white transition-colors duration-300"
                />
              </div>
              <p className="text-[#1B1B1B] font-semibold text-[13px] leading-snug">{title}</p>
              <p className="text-gray-400 text-[11px] mt-0.5">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Categories ─────────────────────────────────────────────────────────────────
function Categories({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <section className="py-20 bg-[#FAF7F4]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-12">
          <span className="text-[#8B5E3C] text-[10px] font-bold tracking-[0.35em] uppercase">Danh mục</span>
          <h2 className="text-[#1B1B1B] text-3xl sm:text-4xl font-extrabold mt-2">Chọn giày theo kiểu dáng</h2>
          <p className="text-gray-500 text-[13px] mt-2">Mỗi kiểu giày phù hợp với một hoàn cảnh sử dụng khác nhau</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ aspectRatio: "3/4" }}
              onClick={() => onNavigate("products")}
            >
              <img
                src={cat.image}
                alt={`${cat.name} – ${BRAND_SEO_NAME}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B]/85 via-[#1B1B1B]/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-bold text-[13px] leading-snug">{cat.name}</p>
                <p className="text-white/55 text-[11px]">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Best Sellers ───────────────────────────────────────────────────────────────
function BestSellers({
  onNavigate,
  onAdd,
}: {
  onNavigate: (p: Page) => void;
  onAdd: () => void;
}) {
  const [tab, setTab] = useState<"best" | "new">("best");
  const shown =
    tab === "best"
      ? PRODUCTS
      : PRODUCTS.filter((_, i) => [1, 2, 5, 6, 7, 0, 3, 4].includes(i));

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <span className="text-[#8B5E3C] text-[10px] font-bold tracking-[0.35em] uppercase">Nổi bật</span>
            <h2 className="text-[#1B1B1B] text-3xl sm:text-4xl font-extrabold mt-1">Mẫu giày được quan tâm</h2>
            <p className="text-gray-500 text-[13px] mt-2 max-w-xl">
              Tên sản phẩm được viết theo nhu cầu sử dụng để khách dễ hiểu mẫu nào hợp đi làm, gặp khách, dự tiệc hoặc dùng hằng ngày.
            </p>
          </div>
          <div className="flex bg-[#F5F0EB] rounded-full p-1 gap-1">
            {(["best", "new"] as const).map((t) => (
              <button
                key={t}
                className={`px-5 py-2 rounded-full text-[12px] font-semibold transition-all ${
                  tab === t ? "bg-[#1B1B1B] text-white" : "text-[#1B1B1B] hover:bg-white/70"
                }`}
                onClick={() => setTab(t)}
              >
                {t === "best" ? "Đang quan tâm" : "Dễ bắt đầu"}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} onView={() => onNavigate("product")} onAdd={onAdd} />
          ))}
        </div>
        <div className="text-center mt-10">
          <button
            className="inline-flex items-center gap-2 border-2 border-[#1B1B1B] text-[#1B1B1B] font-semibold px-8 py-3.5 rounded-full hover:bg-[#1B1B1B] hover:text-white transition-all text-[13px]"
            onClick={() => onNavigate("products")}
          >
            Xem thêm mẫu phù hợp <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Flash Sale ─────────────────────────────────────────────────────────────────
function FlashSale({
  onNavigate,
  onAdd,
}: {
  onNavigate: (p: Page) => void;
  onAdd: () => void;
}) {
  const [t, setT] = useState({ h: 5, m: 43, s: 21 });

  useEffect(() => {
    const id = setInterval(() => {
      setT((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const sale = PRODUCTS.filter((p) => p.originalPrice).slice(0, 4);

  return (
    <section className="py-20 bg-[#1B1B1B]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame size={16} className="text-orange-400" />
              <span className="text-orange-400 text-[10px] font-bold tracking-[0.35em] uppercase">Gợi ý mua tốt</span>
            </div>
            <h2 className="text-white text-3xl font-extrabold">Mẫu đang được quan tâm</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/50 text-[13px]">Cập nhật sau:</span>
            <div className="flex items-center gap-2">
              {[pad(t.h), pad(t.m), pad(t.s)].map((v, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="bg-[#8B5E3C] text-white w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-xl tabular-nums">
                    {v}
                  </div>
                  {i < 2 && <span className="text-[#8B5E3C] font-bold text-lg">:</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {sale.map((p) => (
            <ProductCard key={p.id} product={p} onView={() => onNavigate("product")} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Production Process ─────────────────────────────────────────────────────────
function Production() {
  const steps = [
    { num: "01", title: "Bắt đầu từ hoàn cảnh sử dụng", desc: "Đi làm hằng ngày, gặp khách hàng, dự tiệc hay cần một đôi dễ mang thường xuyên." },
    { num: "02", title: "Chọn kiểu giày phù hợp", desc: "Oxford chỉn chu hơn, Derby dễ tiếp cận hơn, Loafer tiện hơn, Chelsea Boot nổi bật hơn." },
    { num: "03", title: "Ưu tiên màu dễ phối", desc: "Đen phù hợp môi trường lịch sự; nâu hoặc cognac trẻ hơn và dễ phối với chinos, jeans." },
    { num: "04", title: "Kiểm tra form và size", desc: "Cùng một size nhưng từng kiểu giày có thể ôm khác nhau ở mũi chân, mu bàn chân và gót." },
    { num: "05", title: "Hỏi chính sách trước khi mua", desc: "Trước khi đặt, nên xác nhận size, tình trạng sản phẩm và điều kiện hỗ trợ sau mua." },
  ];

  return (
    <section className="py-20 bg-[#FAF7F4]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl">
          <span className="text-[#8B5E3C] text-[10px] font-bold tracking-[0.35em] uppercase">Cách chọn</span>
          <h2 className="text-[#1B1B1B] text-3xl sm:text-4xl font-extrabold mt-2 mb-4 leading-tight">
            Chưa biết chọn mẫu nào? Bắt đầu từ nhu cầu sử dụng
          </h2>
          <p className="text-gray-500 text-[14px] leading-relaxed mb-10">
            Nếu cần giày đi làm hằng ngày, Derby hoặc Loafer thường dễ dùng hơn. Nếu cần sự chỉn chu
            khi gặp khách hàng hoặc dự tiệc, Oxford là lựa chọn phù hợp hơn. Nếu muốn phong cách cá tính,
            Chelsea Boot có thể là điểm nhấn tốt.
          </p>
          <div className="space-y-6">
            {steps.map(({ num, title, desc }) => (
              <div key={num} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-[#8B5E3C]/20 flex items-center justify-center shadow-sm">
                  <span className="text-[#8B5E3C] text-[11px] font-extrabold">{num}</span>
                </div>
                <div className="pt-1.5">
                  <p className="text-[#1B1B1B] font-bold text-[14px]">{title}</p>
                  <p className="text-gray-500 text-[12px] mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Reviews ────────────────────────────────────────────────────────────────────
function Reviews() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-12">
          <span className="text-[#8B5E3C] text-[10px] font-bold tracking-[0.35em] uppercase">Nhu cầu sử dụng</span>
          <h2 className="text-[#1B1B1B] text-3xl sm:text-4xl font-extrabold mt-2">Bạn cần giày cho dịp nào?</h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Stars n={5} size={15} />
            <span className="text-[#1B1B1B] font-bold text-[14px]">Chọn theo hoàn cảnh</span>
            <span className="text-gray-400 text-[13px]">· Đi làm, gặp khách, dự tiệc</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="bg-[#FAF7F4] rounded-2xl p-5 hover:shadow-[0_8px_32px_rgba(27,27,27,0.08)] transition-shadow"
            >
              <Stars n={r.rating} size={13} />
              <p className="text-[#1B1B1B] text-[13px] leading-relaxed mt-3 mb-4">
                {r.text}
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-[#EEE8E0]">
                <div className="w-9 h-9 rounded-full bg-[#8B5E3C] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[10px] font-extrabold">{r.avatar}</span>
                </div>
                <div>
                  <p className="text-[#1B1B1B] font-bold text-[12px]">{r.name}</p>
                  <p className="text-gray-400 text-[11px]">{r.role}</p>
                </div>
              </div>
              <p className="text-[#8B5E3C] text-[11px] mt-3 font-medium">→ {r.product}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href={BRAND_FACEBOOK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-[#8B5E3C] transition-colors"
          >
            Nhắn Facebook để hỏi mẫu trước khi ghé <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Instagram Gallery ──────────────────────────────────────────────────────────
function InstagramGallery() {
  const imgs = [
    "https://images.unsplash.com/photo-1653868250398-8efc756b601d?w=400&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1625357165350-bdbcb6d7d524?w=400&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1603191659812-ee978eeeef76?w=400&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1641893843833-a006778dc00b?w=400&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1653868251002-dbeae91e1960?w=400&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1637689810282-4692c7677feb?w=400&h=400&fit=crop&auto=format",
  ];
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-10">
          <span className="text-[#8B5E3C] text-[10px] font-bold tracking-[0.35em] uppercase">Gợi ý phối đồ</span>
          <h2 className="text-[#1B1B1B] text-3xl font-extrabold mt-2">Giày da trong đời sống hằng ngày</h2>
          <p className="text-gray-400 text-[13px] mt-1">Một vài cảm hứng phối giày da, ví da và thắt lưng da cho nam</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {imgs.map((src, i) => (
            <div
              key={i}
              className="aspect-square overflow-hidden rounded-2xl group cursor-pointer relative bg-[#F5F0EB]"
            >
              <img
                src={src}
                alt={`${BRAND_SEO_NAME} hình ảnh ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#1B1B1B]/0 group-hover:bg-[#1B1B1B]/30 transition-colors flex items-center justify-center">
                <Instagram
                  size={20}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Blog ───────────────────────────────────────────────────────────────────────
function Blog() {
  return (
    <section className="py-20 bg-[#FAF7F4]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-[#8B5E3C] text-[10px] font-bold tracking-[0.35em] uppercase">Blog</span>
            <h2 className="text-[#1B1B1B] text-3xl sm:text-4xl font-extrabold mt-1">Tư vấn trước khi mua</h2>
          </div>
          <button className="text-[13px] text-[#8B5E3C] font-semibold hover:underline hidden sm:block">
            Xem tất cả →
          </button>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.title}
              className="bg-white rounded-2xl overflow-hidden group cursor-pointer hover:shadow-[0_8px_32px_rgba(27,27,27,0.08)] transition-shadow"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#F5F0EB]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold text-[#8B5E3C] bg-[#FAF7F4] px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-gray-400 text-[11px]">{post.readTime} đọc</span>
                </div>
                <h3 className="text-[#1B1B1B] font-bold text-[14px] leading-snug mb-2 group-hover:text-[#8B5E3C] transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-[12px] leading-relaxed">{post.excerpt}</p>
                <p className="text-gray-300 text-[11px] mt-3">{post.date}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ────────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <span className="text-[#8B5E3C] text-[10px] font-bold tracking-[0.35em] uppercase">FAQ</span>
            <h2 className="text-[#1B1B1B] text-3xl sm:text-4xl font-extrabold mt-2 mb-4">
              Câu hỏi<br />thường gặp
            </h2>
            <p className="text-gray-500 text-[14px] leading-relaxed mb-8">
              Nếu bạn chưa chắc nên chọn Oxford, Derby, Loafer hay phụ kiện da,
              hãy bắt đầu từ size, dịp sử dụng và cơ sở thuận tiện nhất để ghé thử.
            </p>
            <div className="bg-[#FAF7F4] rounded-2xl p-6">
              <p className="text-[#1B1B1B] font-bold text-[14px] mb-1.5">Còn câu hỏi khác?</p>
              <p className="text-gray-500 text-[12px] mb-4">
                Gọi hoặc nhắn Zalo/Facebook để hỏi mẫu, size và địa chỉ cửa hàng phù hợp
              </p>
              <a
                href={`tel:${BRAND_TEL}`}
                className="inline-flex items-center gap-2 bg-[#8B5E3C] text-white text-[13px] font-semibold px-5 py-3 rounded-full hover:bg-[#7A5232] transition-colors"
              >
                <Phone size={14} />
                {BRAND_PHONE}
              </a>
            </div>
          </div>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-[#F0E9E1] rounded-2xl overflow-hidden">
                <button
                  className="w-full flex justify-between items-center text-left px-5 py-4 hover:bg-[#FAF7F4] transition-colors"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="text-[#1B1B1B] font-semibold text-[13px] pr-4">{faq.q}</span>
                  <ChevronDown
                    size={15}
                    className={`flex-shrink-0 text-[#8B5E3C] transition-transform duration-200 ${
                      open === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {open === i && (
                  <div className="px-5 pb-5 pt-1 text-gray-600 text-[13px] leading-relaxed border-t border-[#F0E9E1]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Local SEO ──────────────────────────────────────────────────────────────────
function LocalSEO() {
  const districts = ["Liên Chiểu", "Hải Châu", "Đà Nẵng"];
  const [activeMap, setActiveMap] = useState(0);
  const maps = [
    {
      label: "Cơ sở 1",
      address: BRAND_LOCATIONS[0],
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.886111576379!2d108.14778647615968!3d16.07139868460833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218d63c79743d%3A0xc35eb8083a17f76d!2zNzQxIFTDtG4gxJDhu6ljIFRo4bqvbmcsIExpw6puIENoaeG7g3UsIMSQw6AgTuG6tW5nIDU1MDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1783421843952!5m2!1svi!2s",
    },
    {
      label: "Cơ sở 2",
      address: BRAND_LOCATIONS[1],
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.886111576379!2d108.14778647615968!3d16.07139868460833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218d63e3f18cf%3A0xe945b452ef970c2c!2zNzU1IFTDtG4gxJDhu6ljIFRo4bqvbmcsIExpw6puIENoaeG7g3UsIMSQw6AgTuG6tW5nIDU1MDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1783421827106!5m2!1svi!2s",
    },
    {
      label: "Cơ sở 3",
      address: BRAND_LOCATIONS[2],
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.7110135759476!2d108.2185328887615!3d16.0804791947673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142183937ede301%3A0x4653572851c8d1e9!2zMTIwIMSQ4buRbmcgxJBhLCBI4bqjaSBDaMOidSwgxJDDoCBO4bq1bmcgNTUwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1783421809471!5m2!1svi!2s",
    },
  ];

  return (
    <section className="py-16 bg-[#FAF7F4] border-t border-[#EEE8E0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#8B5E3C] text-[10px] font-bold tracking-[0.35em] uppercase">Showroom</span>
            <h2 className="text-[#1B1B1B] text-2xl sm:text-3xl font-extrabold mt-2 mb-6">
              {BRAND_NAME} tại Đà Nẵng
            </h2>
            <p className="text-gray-500 text-[14px] leading-relaxed mb-6">
              {BRAND_SEO_NAME} là shop giày da tại Đà Nẵng dành cho khách muốn xem sản phẩm trực tiếp
              trước khi mua. Hai cơ sở trên Tôn Đức Thắng thuận tiện cho khu vực Liên Chiểu, còn cơ sở
              Đống Đa phù hợp khách ở Hải Châu và trung tâm thành phố.
            </p>
            <p className="text-gray-500 text-[14px] leading-relaxed mb-6">
              Khi cần giày da nam Đà Nẵng để đi làm, ví da Đà Nẵng làm quà hoặc thắt lưng da Đà Nẵng
              để phối cùng trang phục công sở, bạn có thể gọi/Zalo trước để hỏi mẫu đang quan tâm rồi
              ghé cơ sở gần nhất.
            </p>
            <div className="space-y-4 mb-7">
              {[
                ...BRAND_LOCATIONS.map((location, index) => ({
                  icon: MapPin,
                  main: `Cơ sở ${index + 1}: ${location}`,
                  sub: index < 2 ? "Cửa hàng giày da Liên Chiểu" : "Cửa hàng giày da Hải Châu",
                })),
                {
                  icon: Phone,
                  main: `SĐT/Zalo: ${BRAND_PHONE}`,
                  sub: "Tư vấn chọn size và mẫu phù hợp",
                },
              ].map(({ icon: Icon, main, sub }) => (
                <div key={main} className="flex gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#8B5E3C]/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={15} className="text-[#8B5E3C]" />
                  </div>
                  <div>
                    <p className="text-[#1B1B1B] font-semibold text-[14px]">{main}</p>
                    <p className="text-gray-400 text-[12px] mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-3 font-medium">
                Khu vực cửa hàng
              </p>
              <div className="flex flex-wrap gap-2">
                {districts.map((d) => (
                  <span
                    key={d}
                    className="text-[12px] border border-[#E8E0D8] text-[#1B1B1B] px-3 py-1 rounded-full bg-white"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-[0_12px_44px_rgba(27,27,27,0.06)] border border-[#F0E9E1]">
            <div className="h-72 lg:h-80 bg-[#E8E0D8]">
              <iframe
                title={`${BRAND_NAME} ${maps[activeMap].label}`}
                src={maps[activeMap].src}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <div className="p-4 sm:p-5">
              <div className="flex flex-wrap gap-2 mb-3">
                {maps.map((map, index) => (
                  <button
                    key={map.label}
                    className={`text-[12px] font-bold px-3 py-2 rounded-full border transition-colors ${
                      activeMap === index
                        ? "bg-[#1B1B1B] text-white border-[#1B1B1B]"
                        : "bg-[#FAF7F4] text-[#1B1B1B] border-[#E8E0D8] hover:border-[#8B5E3C]"
                    }`}
                    onClick={() => setActiveMap(index)}
                  >
                    {map.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <MapPin size={16} className="text-[#8B5E3C] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#1B1B1B] font-extrabold text-[13px]">{maps[activeMap].label}</p>
                  <p className="text-gray-500 text-[12px] leading-relaxed mt-0.5">{maps[activeMap].address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Newsletter ─────────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="py-20 bg-[#1B1B1B]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
        <span className="text-[#8B5E3C] text-[10px] font-bold tracking-[0.35em] uppercase">Newsletter</span>
        <h2 className="text-white text-3xl sm:text-4xl font-extrabold mt-2 mb-3">
          Cần shop tư vấn trước?
        </h2>
        <p className="text-white/50 text-[14px] mb-9 max-w-md mx-auto">
          Để lại email nếu muốn lưu lại mẫu quan tâm. Khi vận hành thật, form này có thể kết nối CRM
          hoặc chuyển sang nút nhắn Zalo/Facebook.
        </p>
        {done ? (
          <div className="flex items-center justify-center gap-2 text-[#8B5E3C] font-semibold">
            <Check size={18} />
            Cảm ơn! Shop sẽ phản hồi thông tin tư vấn sớm nhất.
          </div>
        ) : (
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setDone(true);
            }}
          >
            <input
              type="text"
              placeholder="Email hoặc ghi chú liên hệ..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/10 border border-white/15 rounded-full px-5 py-3.5 text-white placeholder-white/35 text-[13px] outline-none focus:border-[#8B5E3C] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#8B5E3C] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#7A5232] transition-colors text-[13px] whitespace-nowrap"
            >
              Gửi thông tin
            </button>
          </form>
        )}
        <p className="text-white/25 text-[11px] mt-4">Bạn cũng có thể liên hệ nhanh qua số điện thoại/Zalo hoặc Facebook của shop.</p>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <footer className="bg-[#0F0F0F] text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <div className="inline-flex bg-white rounded-xl p-2">
                <img
                  src="/logo-tuan-anh-shop.png"
                  alt={`${BRAND_NAME} - ${BRAND_TAGLINE}`}
                  className="h-16 w-auto max-w-[220px] object-contain"
                />
              </div>
            </div>
            <p className="text-white/40 text-[12px] leading-relaxed mb-5">
              Tuấn Anh Shop chuyên giày da, ví da, thắt lưng da và phụ kiện da tại Đà Nẵng.
            </p>
            <div className="flex gap-2">
              {[{ icon: Facebook, href: BRAND_FACEBOOK }, { icon: Instagram, href: BRAND_FACEBOOK }, { icon: Youtube, href: BRAND_FACEBOOK }].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center hover:bg-[#8B5E3C] transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <p className="font-bold text-[13px] mb-4 text-white">Sản phẩm</p>
            {["Giày da", "Giày da nam", "Ví da", "Thắt lưng da", "Phụ kiện da", "Khuyến mãi"].map((l) => (
              <button
                key={l}
                className="block text-white/40 text-[12px] py-1.5 hover:text-[#8B5E3C] transition-colors text-left"
                onClick={() => onNavigate("products")}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Support */}
          <div>
            <p className="font-bold text-[13px] mb-4 text-white">Hỗ trợ</p>
            {[
              { label: "Hướng dẫn chọn size", page: "size-guide" as Page },
              { label: "Chính sách đổi trả", page: "returns" as Page },
              { label: "Chính sách bảo hành", page: "warranty" as Page },
              { label: "Chính sách giao hàng", page: "shipping" as Page },
              { label: "Điều khoản sử dụng", page: "terms" as Page },
              { label: "Chính sách bảo mật", page: "privacy" as Page },
            ].map(({ label, page }) => (
              <button
                key={label}
                className="block text-white/40 text-[12px] py-1.5 hover:text-[#8B5E3C] transition-colors text-left"
                onClick={() => onNavigate(page)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Contact + NAP (Local SEO) */}
          <div>
            <p className="font-bold text-[13px] mb-4 text-white">Liên hệ & Showroom</p>
            <address className="not-italic space-y-3 text-[12px] text-white/45">
              {BRAND_LOCATIONS.map((location, index) => (
                <div key={location} className="flex gap-2.5">
                  <MapPin size={13} className="text-[#8B5E3C] flex-shrink-0 mt-0.5" />
                  <span>Cơ sở {index + 1}: {location}</span>
                </div>
              ))}
              <div className="flex gap-2.5">
                <Phone size={13} className="text-[#8B5E3C] flex-shrink-0 mt-0.5" />
                <a href={`tel:${BRAND_TEL}`} className="hover:text-[#8B5E3C] transition-colors">
                  SĐT/Zalo: {BRAND_PHONE}
                </a>
              </div>
              <div className="flex gap-2.5">
                <Facebook size={13} className="text-[#8B5E3C] flex-shrink-0 mt-0.5" />
                <a href={BRAND_FACEBOOK} target="_blank" rel="noopener noreferrer" className="hover:text-[#8B5E3C] transition-colors">
                  Facebook Tuấn Anh Shop
                </a>
              </div>
            </address>
            <div className="mt-5">
              <p className="text-[10px] text-white/25 uppercase tracking-widest mb-2">Khu vực khách thường ghé</p>
              <div className="flex flex-wrap gap-1">
                {["Liên Chiểu", "Hải Châu", "Đà Nẵng"].map(
                  (q) => (
                    <span
                      key={q}
                      className="text-[10px] text-white/30 border border-white/10 px-2 py-0.5 rounded-full"
                    >
                      {q}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-white/25">
          <p>© 2025 {BRAND_NAME}. Tất cả các quyền được bảo lưu.</p>
          <div className="flex items-center gap-2">
            <span>Liên hệ:</span>
            {["Gọi shop", "Zalo", "Facebook"].map((m) => (
              <span key={m} className="border border-white/10 px-2 py-0.5 rounded text-[10px]">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Products Page ──────────────────────────────────────────────────────────────
function ProductsPage({
  onNavigate,
  onAdd,
}: {
  onNavigate: (p: Page) => void;
  onAdd: () => void;
}) {
  const [sizes, setSizes] = useState<string[]>([]);
  const [sort, setSort] = useState("newest");
  const allSizes = ["38", "39", "40", "41", "42", "43", "44"];
  const cats = ["Oxford", "Derby", "Loafer", "Boot", "Công sở"];

  return (
    <div className="min-h-screen bg-white pt-[108px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 pb-20">
        <nav className="text-[12px] text-gray-400 mb-8">
          <button className="hover:text-[#8B5E3C]" onClick={() => onNavigate("home")}>
            Trang chủ
          </button>
          <span className="mx-2">/</span>
          <span className="text-[#1B1B1B]">Sản phẩm</span>
        </nav>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-[108px]">
              <h3 className="font-extrabold text-[#1B1B1B] mb-6 text-[15px]">Bộ lọc</h3>

              <div className="mb-7">
                <p className="text-[#1B1B1B] font-bold text-[13px] mb-3">Size</p>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map((s) => (
                    <button
                      key={s}
                      className={`w-10 h-10 rounded-xl text-[13px] font-semibold border-2 transition-all ${
                        sizes.includes(s)
                          ? "bg-[#1B1B1B] text-white border-[#1B1B1B]"
                          : "border-[#E8E0D8] text-[#1B1B1B] hover:border-[#8B5E3C]"
                      }`}
                      onClick={() =>
                        setSizes((p) =>
                          p.includes(s) ? p.filter((x) => x !== s) : [...p, s]
                        )
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-7">
                <p className="text-[#1B1B1B] font-bold text-[13px] mb-3">Kiểu dáng</p>
                {cats.map((c) => (
                  <label key={c} className="flex items-center gap-2.5 py-2 cursor-pointer group">
                    <div className="w-4 h-4 rounded border-2 border-[#E8E0D8] group-hover:border-[#8B5E3C] transition-colors" />
                    <span className="text-[13px] text-gray-600 group-hover:text-[#8B5E3C] transition-colors">
                      {c}
                    </span>
                  </label>
                ))}
              </div>

              <div>
                <p className="text-[#1B1B1B] font-bold text-[13px] mb-3">Giá</p>
                <div className="text-[12px] text-gray-400 mb-2 flex justify-between">
                  <span>800.000đ</span>
                  <span>2.000.000đ</span>
                </div>
                <input
                  type="range"
                  min={800000}
                  max={2000000}
                  step={50000}
                  defaultValue={2000000}
                  className="w-full accent-[#8B5E3C]"
                />
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">
              <div>
                <h1 className="text-[#1B1B1B] text-2xl sm:text-4xl font-extrabold">Giày da nam & phụ kiện da</h1>
                <p className="text-[13px] text-gray-500 mt-2 max-w-2xl">
                  Lọc nhanh theo size, kiểu dáng và nhu cầu sử dụng. Nếu phân vân giữa Oxford, Derby, Loafer hoặc phụ kiện da, bạn có thể gọi/Zalo để hỏi trước khi ghé cửa hàng.
                </p>
                <p className="text-[12px] text-gray-400 mt-2">{PRODUCTS.length} gợi ý sản phẩm</p>
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-[13px] border border-[#E8E0D8] rounded-xl px-3 py-2.5 outline-none focus:border-[#8B5E3C] bg-white text-[#1B1B1B] cursor-pointer"
              >
                <option value="newest">Mới nhất</option>
                <option value="bestseller">Bán chạy nhất</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
              </select>
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {PRODUCTS.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onView={() => onNavigate("product")}
                  onAdd={onAdd}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Product Detail ─────────────────────────────────────────────────────────────
function ProductDetail({
  onNavigate,
  onAdd,
}: {
  onNavigate: (p: Page) => void;
  onAdd: () => void;
}) {
  const p = PRODUCTS[0];
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"info" | "review" | "faq">("info");
  const [liked, setLiked] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const imgs = [p.image, PRODUCTS[1].image, PRODUCTS[2].image, PRODUCTS[3].image];
  const sizes = ["38", "39", "40", "41", "42", "43", "44"];

  return (
    <div className="min-h-screen bg-white pt-[108px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 pb-20">
        <nav className="text-[12px] text-gray-400 mb-8">
          <button className="hover:text-[#8B5E3C]" onClick={() => onNavigate("home")}>Trang chủ</button>
          <span className="mx-2">/</span>
          <button className="hover:text-[#8B5E3C]" onClick={() => onNavigate("products")}>Sản phẩm</button>
          <span className="mx-2">/</span>
          <span className="text-[#1B1B1B]">{p.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Gallery */}
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-[#F5F0EB] mb-3 cursor-zoom-in">
              <img
                src={imgs[activeImg]}
                alt={`Giày da nam ${p.name} – ảnh ${activeImg + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="grid grid-cols-4 gap-2.5">
              {imgs.map((src, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    activeImg === i ? "border-[#8B5E3C]" : "border-transparent hover:border-[#8B5E3C]/30"
                  }`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <span className="text-[10px] text-[#8B5E3C] font-bold uppercase tracking-[0.3em]">{p.category}</span>
            <h1 className="text-[#1B1B1B] text-2xl sm:text-3xl font-extrabold mt-1.5 mb-3 leading-tight">
              {p.name}
            </h1>
            <div className="flex items-center gap-3 mb-6">
              <Stars n={5} size={14} />
              <span className="text-[13px] text-gray-500">Gợi ý cho khách cần giày da dễ phối</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5 pb-5 border-b border-[#F0E9E1]">
              <span className="text-3xl font-extrabold text-[#1B1B1B]">{fmt(p.price)}</span>
              {p.originalPrice && (
                <>
                  <span className="text-gray-400 text-lg line-through">{fmt(p.originalPrice)}</span>
                  <span className="bg-red-50 text-red-500 text-[11px] font-bold px-2.5 py-1 rounded-full">
                    -{Math.round((1 - p.price / p.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Promotions */}
            <div className="bg-[#FAF7F4] rounded-2xl p-4 mb-6 space-y-2">
              {[
                "Tư vấn chọn size trước khi mua",
                "Có thể xem mẫu tại 3 cơ sở ở Đà Nẵng",
                "Liên hệ SĐT/Zalo để được hỗ trợ sản phẩm",
              ].map((promo) => (
                <div key={promo} className="flex items-center gap-2 text-[13px] text-[#1B1B1B]">
                  <Check size={13} className="text-[#8B5E3C] flex-shrink-0" />
                  {promo}
                </div>
              ))}
            </div>

            {/* Size */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <p className="font-bold text-[#1B1B1B] text-[14px]">Chọn size</p>
                <button className="text-[#8B5E3C] text-[12px] underline">Hướng dẫn chọn size</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    className={`w-12 h-12 rounded-xl text-[14px] font-semibold border-2 transition-all ${
                      size === s
                        ? "bg-[#1B1B1B] text-white border-[#1B1B1B]"
                        : "border-[#E8E0D8] text-[#1B1B1B] hover:border-[#8B5E3C]"
                    }`}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-5 mb-6">
              <p className="font-bold text-[#1B1B1B] text-[14px]">Số lượng</p>
              <div className="flex items-center border-2 border-[#E8E0D8] rounded-xl overflow-hidden">
                <button
                  className="w-10 h-10 flex items-center justify-center hover:bg-[#FAF7F4] transition-colors"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-[14px] font-bold">{qty}</span>
                <button
                  className="w-10 h-10 flex items-center justify-center hover:bg-[#FAF7F4] transition-colors"
                  onClick={() => setQty(qty + 1)}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3 mb-7">
              <button
                className="flex-1 bg-[#8B5E3C] text-white font-bold py-4 rounded-2xl hover:bg-[#7A5232] transition-colors text-[14px]"
                onClick={() => {
                  onAdd();
                  onNavigate("checkout");
                }}
              >
                Mua ngay
              </button>
              <button
                className="flex-1 bg-[#1B1B1B] text-white font-bold py-4 rounded-2xl hover:bg-[#333] transition-colors text-[14px]"
                onClick={() => {
                  onAdd();
                  onNavigate("cart");
                }}
              >
                Thêm vào giỏ
              </button>
              <button
                className="w-14 h-14 border-2 border-[#E8E0D8] rounded-2xl flex items-center justify-center hover:border-red-400 transition-colors"
                onClick={() => setLiked(!liked)}
              >
                <Heart size={18} className={liked ? "fill-red-500 text-red-500" : ""} />
              </button>
            </div>

            {/* Info tabs */}
            <div className="border border-[#F0E9E1] rounded-2xl overflow-hidden">
              <div className="flex border-b border-[#F0E9E1]">
                {(["info", "review", "faq"] as const).map((t) => (
                  <button
                    key={t}
                    className={`flex-1 py-3.5 text-[12px] font-bold transition-colors ${
                      tab === t ? "text-[#8B5E3C] bg-[#FAF7F4]" : "text-gray-400 hover:bg-[#FAF7F4]/50"
                    }`}
                    onClick={() => setTab(t)}
                  >
                    {t === "info" ? "Thông tin" : t === "review" ? "Tư vấn" : "FAQ"}
                  </button>
                ))}
              </div>
              <div className="p-5">
                {tab === "info" && (
                  <dl className="space-y-3">
                    {[
                      ["Ngành hàng", "Giày da, ví da, thắt lưng da và phụ kiện da"],
                      ["Tư vấn", "Hỗ trợ chọn size và form theo nhu cầu sử dụng"],
                      ["Cửa hàng", "3 cơ sở tại Liên Chiểu & Hải Châu, Đà Nẵng"],
                      ["Liên hệ", `SĐT/Zalo ${BRAND_PHONE}`],
                      ["Facebook", BRAND_FACEBOOK],
                    ].map(([k, v]) => (
                      <div key={k} className="flex gap-3">
                        <dt className="text-[#1B1B1B] font-bold text-[12px] w-28 flex-shrink-0">{k}:</dt>
                        <dd className="text-gray-500 text-[12px]">{v}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {tab === "review" && (
                  <div className="space-y-4">
                    {REVIEWS.slice(0, 2).map((r) => (
                      <div key={r.name} className="pb-4 border-b border-[#F0E9E1] last:border-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Stars n={r.rating} size={11} />
                          <span className="text-[#1B1B1B] font-bold text-[12px]">{r.name}</span>
                          <span className="text-gray-300 text-[11px]">{r.date}</span>
                        </div>
                        <p className="text-gray-500 text-[12px] leading-relaxed">{r.text}</p>
                      </div>
                    ))}
                  </div>
                )}
                {tab === "faq" && (
                  <div className="space-y-4">
                    {FAQS.slice(0, 3).map((faq, i) => (
                      <div key={i}>
                        <p className="font-bold text-[#1B1B1B] text-[13px]">{faq.q}</p>
                        <p className="text-gray-500 text-[12px] mt-1 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        <div>
          <h2 className="text-[#1B1B1B] text-2xl font-extrabold mb-6">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {PRODUCTS.slice(1, 5).map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onView={() => onNavigate("product")}
                onAdd={onAdd}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Cart Page ──────────────────────────────────────────────────────────────────
function CartPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [items, setItems] = useState([
    { ...PRODUCTS[0], qty: 1, size: "41" },
    { ...PRODUCTS[2], qty: 1, size: "42" },
  ]);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F4] pt-[108px] pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <h1 className="text-2xl font-extrabold text-[#1B1B1B] mb-8">
          Giỏ hàng ({items.length} sản phẩm)
        </h1>
        <div className="grid lg:grid-cols-3 gap-7">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 flex gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F5F0EB] flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#1B1B1B] font-bold text-[14px] truncate">{item.name}</p>
                  <p className="text-gray-400 text-[12px] mt-0.5">Size: {item.size}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#E8E0D8] rounded-xl overflow-hidden">
                      <button
                        className="w-8 h-8 flex items-center justify-center text-sm hover:bg-[#FAF7F4]"
                        onClick={() =>
                          setItems((p) =>
                            p.map((it, idx) =>
                              idx === i ? { ...it, qty: Math.max(1, it.qty - 1) } : it
                            )
                          )
                        }
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-[13px] font-bold">{item.qty}</span>
                      <button
                        className="w-8 h-8 flex items-center justify-center text-sm hover:bg-[#FAF7F4]"
                        onClick={() =>
                          setItems((p) =>
                            p.map((it, idx) => (idx === i ? { ...it, qty: it.qty + 1 } : it))
                          )
                        }
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <p className="text-[#1B1B1B] font-extrabold text-[15px]">
                      {fmt(item.price * item.qty)}
                    </p>
                  </div>
                </div>
                <button
                  className="text-gray-300 hover:text-red-400 transition-colors self-start"
                  onClick={() => setItems((p) => p.filter((_, idx) => idx !== i))}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl p-6 h-fit">
            <h3 className="text-[#1B1B1B] font-extrabold text-[15px] mb-5">Tóm tắt đơn hàng</h3>
            <div className="space-y-3 text-[13px] mb-5">
              <div className="flex justify-between">
                <span className="text-gray-500">Tạm tính</span>
                <span className="text-[#1B1B1B]">{fmt(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phí vận chuyển</span>
                <span className="text-[#1B1B1B] font-semibold">Liên hệ shop</span>
              </div>
            </div>
            <div className="flex gap-2 mb-5">
              <input
                placeholder="Mã giảm giá..."
                className="flex-1 border border-[#E8E0D8] rounded-xl px-3 py-2.5 text-[13px] outline-none focus:border-[#8B5E3C] transition-colors"
              />
              <button className="bg-[#1B1B1B] text-white px-4 py-2.5 rounded-xl text-[12px] font-bold">
                Áp dụng
              </button>
            </div>
            <div className="border-t border-[#F0E9E1] pt-4 mb-5">
              <div className="flex justify-between font-extrabold">
                <span className="text-[#1B1B1B]">Tổng cộng</span>
                <span className="text-[#8B5E3C] text-[18px]">{fmt(total)}</span>
              </div>
            </div>
            <button
              className="w-full bg-[#8B5E3C] text-white font-bold py-4 rounded-2xl hover:bg-[#7A5232] transition-colors text-[14px]"
              onClick={() => onNavigate("checkout")}
            >
              Tiến hành thanh toán →
            </button>
            <button
              className="w-full text-center text-[13px] text-gray-400 mt-3 hover:text-[#8B5E3C] transition-colors"
              onClick={() => onNavigate("products")}
            >
              ← Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Checkout Page ──────────────────────────────────────────────────────────────
function CheckoutPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [pay, setPay] = useState("cod");
  const [done, setDone] = useState(false);
  const total = PRODUCTS[0].price + PRODUCTS[2].price;

  if (done) {
    return (
      <div className="min-h-screen bg-[#FAF7F4] flex items-center justify-center pt-[108px]">
        <div className="text-center p-10 bg-white rounded-3xl shadow-sm max-w-sm mx-auto">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <Check size={28} className="text-green-500" />
          </div>
          <h2 className="text-[#1B1B1B] text-xl font-extrabold mb-2">Đặt hàng thành công!</h2>
          <p className="text-gray-500 text-[13px] leading-relaxed mb-7">
            Chúng tôi sẽ gọi xác nhận trong 30 phút.
            Tuấn Anh Shop sẽ liên hệ xác nhận thông tin đơn hàng.
          </p>
          <button
            className="bg-[#8B5E3C] text-white px-8 py-3.5 rounded-full font-bold text-[14px]"
            onClick={() => onNavigate("home")}
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F4] pt-[108px] pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-extrabold text-[#1B1B1B] mb-8">Thanh toán</h1>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-5">
              <h3 className="font-bold text-[#1B1B1B] text-[14px] mb-4">Thông tin giao hàng</h3>
              <div className="space-y-3">
                {[
                  { p: "Họ và tên *", t: "text" },
                  { p: "Số điện thoại *", t: "tel" },
                  { p: "Email", t: "email" },
                  { p: "Địa chỉ giao hàng *", t: "text" },
                  { p: "Quận/Huyện", t: "text" },
                ].map(({ p, t }) => (
                  <input
                    key={p}
                    type={t}
                    placeholder={p}
                    className="w-full border border-[#E8E0D8] rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#8B5E3C] transition-colors"
                  />
                ))}
                <textarea
                  placeholder="Ghi chú đơn hàng..."
                  rows={2}
                  className="w-full border border-[#E8E0D8] rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#8B5E3C] transition-colors resize-none"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5">
              <h3 className="font-bold text-[#1B1B1B] text-[14px] mb-4">Phương thức thanh toán</h3>
              <div className="space-y-2">
                {[
                  { id: "cod", label: "COD – Thanh toán khi nhận hàng" },
                  { id: "bank", label: "Chuyển khoản ngân hàng" },
                  { id: "vnpay", label: "VNPay" },
                  { id: "momo", label: "Ví MoMo" },
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer border-2 transition-colors ${
                      pay === m.id ? "border-[#8B5E3C] bg-[#FAF7F4]" : "border-[#F0E9E1]"
                    }`}
                    onClick={() => setPay(m.id)}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        pay === m.id ? "border-[#8B5E3C]" : "border-gray-300"
                      }`}
                    >
                      {pay === m.id && (
                        <div className="w-2 h-2 rounded-full bg-[#8B5E3C]" />
                      )}
                    </div>
                    <span className="text-[13px] text-[#1B1B1B]">{m.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl p-5 mb-4">
              <h3 className="font-bold text-[#1B1B1B] text-[14px] mb-4">Đơn hàng của bạn</h3>
              {[PRODUCTS[0], PRODUCTS[2]].map((prod) => (
                <div key={prod.id} className="flex gap-3 mb-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#F5F0EB] flex-shrink-0">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#1B1B1B] text-[12px] font-bold truncate">{prod.name}</p>
                    <p className="text-gray-400 text-[11px] mt-0.5">Size 41 · x1</p>
                    <p className="text-[#8B5E3C] text-[13px] font-extrabold mt-0.5">{fmt(prod.price)}</p>
                  </div>
                </div>
              ))}
              <div className="border-t border-[#F0E9E1] pt-3 space-y-2 text-[13px]">
                <div className="flex justify-between text-gray-500">
                  <span>Tạm tính</span>
                  <span>{fmt(total)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Vận chuyển</span>
                  <span className="text-[#1B1B1B] font-semibold">Liên hệ shop</span>
                </div>
                <div className="flex justify-between font-extrabold text-[#1B1B1B] pt-1 border-t border-[#F0E9E1]">
                  <span>Tổng</span>
                  <span className="text-[#8B5E3C] text-[17px]">{fmt(total)}</span>
                </div>
              </div>
            </div>
            <button
              className="w-full bg-[#8B5E3C] text-white font-extrabold py-4 rounded-2xl hover:bg-[#7A5232] transition-colors text-[15px]"
              onClick={() => setDone(true)}
            >
              Xác nhận đặt hàng
            </button>
            <p className="text-center text-[11px] text-gray-400 mt-3 flex items-center justify-center gap-1">
              <Shield size={11} />
              Thanh toán được mã hóa SSL an toàn
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Marketing Pages ───────────────────────────────────────────────────────────
function AboutPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const customerGroups = [
    "Nam giới đi làm văn phòng",
    "Người thường gặp khách hàng",
    "Người cần giày dự tiệc / cưới hỏi",
    "Người mới bắt đầu mua giày da",
    "Người cần ví da, thắt lưng da hoặc phụ kiện da làm quà",
  ];
  const consultSteps = [
    { icon: BadgeCheck, title: "Hỏi nhu cầu sử dụng", text: "Đi làm hằng ngày, gặp khách hàng, dự tiệc hay cần một đôi dễ mang thường xuyên." },
    { icon: Package, title: "Gợi ý kiểu giày", text: "Oxford, Derby, Loafer, Chelsea Boot hoặc dép da nam tùy hoàn cảnh sử dụng." },
    { icon: RefreshCw, title: "Tư vấn màu dễ phối", text: "Đen cho sự lịch sự, nâu/cognac cho phong cách trẻ hơn và dễ phối smart casual." },
    { icon: Shield, title: "Kiểm tra size và form", text: "Cùng một size nhưng từng kiểu giày có thể ôm khác nhau ở mũi, mu bàn chân và gót." },
  ];
  const productFocus = [
    { name: "Oxford", text: "Cho công sở, gặp khách và sự kiện cần hình ảnh chỉn chu.", image: "/images/tuan-anh-products/giay-oxford-da-den.png" },
    { name: "Derby", text: "Dễ mang hơn, phù hợp đi làm hằng ngày và người mới mua giày da.", image: "https://images.unsplash.com/photo-1777987601426-c05a82045862?w=500&h=600&fit=crop&auto=format" },
    { name: "Loafer", text: "Không dây, tiện, gọn và hợp phong cách smart casual.", image: "/images/tuan-anh-products/giay-loafer-da-nau.png" },
    { name: "Ví & thắt lưng", text: "Phụ kiện da dễ phối cùng giày hoặc chọn làm quà tặng nam.", image: "/images/tuan-anh-products/combo-vi-da-that-lung-nau.png" },
  ];
  const priorities = [
    "Tư vấn rõ trước khi mua",
    "Không cố gợi ý mẫu không phù hợp nhu cầu",
    "Hỗ trợ chọn size theo từng form giày",
    "Thông tin sản phẩm và giá hiển thị rõ ràng",
    "Hỗ trợ sau mua theo từng đơn hàng cụ thể",
  ];

  return (
    <div className="min-h-screen bg-white pt-[108px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 pb-20">
        <Breadcrumb current="Giới thiệu" onNavigate={onNavigate} />
        <PageHero
          eyebrow="Về Tuấn Anh Shop"
          title="Giày da nam dễ mang, dễ phối và được tư vấn đúng nhu cầu."
          text="Tuấn Anh Shop tập trung vào giày da nam, ví da, thắt lưng da và phụ kiện da phù hợp với nhu cầu đi làm, gặp khách hàng, dự tiệc hoặc sử dụng hằng ngày."
          image="/images/tuan-anh-products/giay-loafer-den-nau.png"
          action="Xem sản phẩm phù hợp"
          onAction={() => onNavigate("products")}
        />

        <section className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-12 items-center mb-14 sm:mb-20">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#F5F0EB]">
            <img
              src="/images/tuan-anh-products/bo-phu-kien-da-nam.png"
              alt="Giày da và phụ kiện da nam Tuấn Anh Shop"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-[10px] text-[#8B5E3C] font-bold uppercase tracking-[0.3em]">
              Shop dành cho ai?
            </span>
            <h2 className="text-[#1B1B1B] text-3xl sm:text-4xl font-extrabold leading-tight mt-3 mb-5">
              Chúng tôi bán cho những khách hàng cần sự chỉn chu mỗi ngày.
            </h2>
            <p className="text-gray-500 text-[14px] leading-relaxed mb-6">
              {BRAND_NAME} phù hợp với nam giới cần một đôi giày chỉn chu cho công việc,
              gặp khách hàng, sự kiện hoặc những dịp cần hình ảnh lịch sự hơn. Các mẫu sản phẩm
              được định hướng theo tính ứng dụng: dễ phối, dễ dùng và không quá cầu kỳ.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {customerGroups.map((item) => (
                <div key={item} className="bg-[#FAF7F4] rounded-2xl p-4 flex items-start gap-3">
                  <Check size={15} className="text-[#8B5E3C] flex-shrink-0 mt-0.5" />
                  <p className="text-[#1B1B1B] font-bold text-[13px] leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14 sm:mb-20">
          <div className="max-w-3xl mb-8">
            <span className="text-[10px] text-[#8B5E3C] font-bold uppercase tracking-[0.3em]">
              Cách shop tư vấn
            </span>
            <h2 className="text-[#1B1B1B] text-3xl sm:text-4xl font-extrabold leading-tight mt-3 mb-4">
              Một đôi giày đẹp chưa chắc đã phù hợp với tất cả mọi người.
            </h2>
            <p className="text-gray-500 text-[14px] leading-relaxed">
              Vì vậy, Tuấn Anh Shop tư vấn dựa trên nhu cầu sử dụng, dáng chân, màu sắc thường mặc
              và hoàn cảnh khách cần dùng giày. Khách có thể hỏi trước qua điện thoại/Zalo hoặc ghé
              trực tiếp cửa hàng để xem mẫu và thử form.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {consultSteps.map(({ icon: Icon, title, text }) => (
              <article key={title} className="bg-[#FAF7F4] rounded-2xl p-5 sm:p-6">
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center mb-4">
                  <Icon size={18} className="text-[#8B5E3C]" />
                </div>
                <h3 className="text-[#1B1B1B] font-extrabold text-[15px] mb-2">{title}</h3>
                <p className="text-gray-500 text-[13px] leading-relaxed">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] text-[#8B5E3C] font-bold uppercase tracking-[0.3em]">
                Sản phẩm tập trung
              </span>
              <h2 className="text-[#1B1B1B] text-3xl sm:text-4xl font-extrabold leading-tight mt-3">
                Giày da nam và phụ kiện da dễ ứng dụng.
              </h2>
            </div>
            <p className="text-gray-500 text-[13px] leading-relaxed max-w-lg">
              Website demo tập trung vào các nhóm sản phẩm có nhu cầu thực tế: giày da nam,
              dép da nam, ví da, thắt lưng da và phụ kiện da.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {productFocus.map((item) => (
              <article key={item.name} className="group bg-white border border-[#F0E9E1] rounded-2xl overflow-hidden">
                <div className="aspect-[4/3] bg-[#F5F0EB] overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.name} - ${BRAND_NAME}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-[#1B1B1B] font-extrabold text-[15px] mb-2">{item.name}</h3>
                  <p className="text-gray-500 text-[13px] leading-relaxed">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-8 mb-14 sm:mb-20">
          <div className="bg-[#1B1B1B] text-white rounded-2xl p-6 sm:p-8">
            <span className="text-[10px] text-[#CFA27A] font-bold uppercase tracking-[0.3em]">
              Thông tin cửa hàng
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mt-3 mb-4">
              Có thể ghé cửa hàng để xem sản phẩm trực tiếp.
            </h2>
            <p className="text-white/55 text-[14px] leading-relaxed mb-6">
              {BRAND_NAME} có 3 cơ sở tại Liên Chiểu và Hải Châu, Đà Nẵng. Khách có thể gọi/Zalo
              trước để hỏi mẫu, size hoặc cơ sở thuận tiện trước khi ghé.
            </p>
            <div className="space-y-3">
              {BRAND_LOCATIONS.map((location, index) => (
                <div key={location} className="flex gap-3 text-[13px] text-white/75">
                  <MapPin size={15} className="text-[#CFA27A] flex-shrink-0 mt-0.5" />
                  <span>Cơ sở {index + 1}: {location}</span>
                </div>
              ))}
              <div className="flex gap-3 text-[13px] text-white/75">
                <Phone size={15} className="text-[#CFA27A] flex-shrink-0 mt-0.5" />
                <a href={`tel:${BRAND_TEL}`} className="hover:text-[#CFA27A] transition-colors">
                  SĐT/Zalo: {BRAND_PHONE}
                </a>
              </div>
              <div className="flex gap-3 text-[13px] text-white/75">
                <Facebook size={15} className="text-[#CFA27A] flex-shrink-0 mt-0.5" />
                <a href={BRAND_FACEBOOK} target="_blank" rel="noopener noreferrer" className="hover:text-[#CFA27A] transition-colors">
                  Facebook: {BRAND_FACEBOOK}
                </a>
              </div>
            </div>
          </div>
          <div className="bg-[#FAF7F4] rounded-2xl p-6 sm:p-8">
            <span className="text-[10px] text-[#8B5E3C] font-bold uppercase tracking-[0.3em]">
              Ưu tiên khi tư vấn
            </span>
            <h2 className="text-[#1B1B1B] text-2xl sm:text-3xl font-extrabold leading-tight mt-3 mb-5">
              Rõ ràng trước khi khách quyết định mua.
            </h2>
            <div className="space-y-3">
              {priorities.map((item) => (
                <div key={item} className="flex gap-3">
                  <Check size={15} className="text-[#8B5E3C] flex-shrink-0 mt-0.5" />
                  <p className="text-[#1B1B1B] text-[13px] font-semibold leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#FAF7F4] rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <span className="text-[10px] text-[#8B5E3C] font-bold uppercase tracking-[0.3em]">
              Bắt đầu chọn giày
            </span>
            <h2 className="text-[#1B1B1B] text-2xl sm:text-3xl font-extrabold leading-tight mt-3 mb-2">
              Chưa chắc nên chọn mẫu nào?
            </h2>
            <p className="text-gray-500 text-[13px] leading-relaxed max-w-xl">
              Xem sản phẩm theo kiểu dáng hoặc liên hệ Tuấn Anh Shop để được tư vấn size,
              màu sắc và mẫu phù hợp với nhu cầu sử dụng.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="bg-[#1B1B1B] text-white font-bold px-6 py-3.5 rounded-full text-[13px] hover:bg-[#333] transition-colors"
              onClick={() => onNavigate("products")}
            >
              Xem sản phẩm phù hợp
            </button>
            <button
              className="bg-[#8B5E3C] text-white font-bold px-6 py-3.5 rounded-full text-[13px] hover:bg-[#7A5232] transition-colors"
              onClick={() => onNavigate("contact")}
            >
              Liên hệ tư vấn size
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function ContactPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div className="min-h-screen bg-white pt-[108px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 pb-20">
        <Breadcrumb current="Liên hệ" onNavigate={onNavigate} />
        <PageHero
          eyebrow="Showroom & tư vấn"
          title={`${BRAND_NAME} - giày da & phụ kiện da tại Đà Nẵng.`}
          text="Bạn có thể gọi/Zalo trước để hỏi mẫu, size và cơ sở gần nhất, sau đó ghé trực tiếp để xem giày da, ví da, thắt lưng da và phụ kiện da."
          image="https://images.unsplash.com/photo-1775903961719-af9e79063146?w=1600&h=1000&fit=crop&auto=format"
        />

        <section className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-8">
          <div className="bg-[#FAF7F4] rounded-2xl p-5 sm:p-7">
            <h2 className="text-[#1B1B1B] text-2xl font-extrabold mb-5">Thông tin showroom</h2>
            <p className="text-gray-500 text-[13px] leading-relaxed mb-5">
              Chọn cơ sở thuận đường nhất, hoặc nhắn trước mẫu bạn đang quan tâm để shop tư vấn size và tình trạng sản phẩm trước khi ghé.
            </p>
            <div className="space-y-4">
              {[
                ...BRAND_LOCATIONS.map((location, index) => ({
                  icon: MapPin,
                  title: `Cơ sở ${index + 1}`,
                  text: location,
                })),
                { icon: Phone, title: "SĐT/Zalo", text: BRAND_PHONE },
                { icon: Facebook, title: "Facebook", text: BRAND_FACEBOOK },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#8B5E3C]" />
                  </div>
                  <div>
                    <p className="text-[#1B1B1B] font-bold text-[13px]">{title}</p>
                    <p className="text-gray-500 text-[13px] mt-0.5">{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href={`tel:${BRAND_TEL}`}
              className="mt-7 flex items-center justify-center gap-2 bg-[#8B5E3C] text-white py-4 rounded-2xl font-bold text-[14px]"
            >
              <Phone size={15} />
              Gọi shop
            </a>
          </div>

          <form className="bg-white border border-[#F0E9E1] rounded-2xl p-5 sm:p-7 shadow-[0_12px_44px_rgba(27,27,27,0.06)]">
            <h2 className="text-[#1B1B1B] text-2xl font-extrabold mb-2">Tư vấn chọn size</h2>
            <p className="text-gray-500 text-[13px] leading-relaxed mb-5">
              Điền nhu cầu sử dụng, size thường mang và khu vực thuận tiện. Tuấn Anh Shop sẽ có đủ dữ liệu để tư vấn mẫu giày da, ví da, thắt lưng da hoặc phụ kiện da phù hợp hơn.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {["Họ và tên", "Số điện thoại", "Dòng giày quan tâm", "Thời gian ghé showroom"].map((p) => (
                <input
                  key={p}
                  placeholder={p}
                  className="w-full border border-[#E8E0D8] rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#8B5E3C] transition-colors"
                />
              ))}
            </div>
            <textarea
              placeholder="Ghi chú thêm về size, màu, dịp sử dụng..."
              rows={4}
              className="w-full border border-[#E8E0D8] rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#8B5E3C] transition-colors resize-none mt-3"
            />
            <button className="w-full sm:w-auto mt-4 bg-[#1B1B1B] text-white font-bold px-7 py-4 rounded-2xl text-[14px]">
              Gửi yêu cầu tư vấn
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

function BlogPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div className="min-h-screen bg-white pt-[108px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 pb-20">
        <Breadcrumb current="Blog" onNavigate={onNavigate} />
        <PageHero
          eyebrow="Kiến thức giày da"
          title="Chọn đúng, phối đẹp và chăm giày bền hơn."
          text="Các bài viết ngắn giúp khách đang tìm giày da Đà Nẵng, ví da Đà Nẵng hoặc thắt lưng da Đà Nẵng biết nên hỏi gì trước khi mua."
          image="https://images.unsplash.com/photo-1653868250398-8efc756b601d?w=1600&h=1000&fit=crop&auto=format"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BLOG_POSTS.concat(BLOG_POSTS).map((post, i) => (
            <article key={`${post.title}-${i}`} className="group bg-[#FAF7F4] rounded-2xl overflow-hidden">
              <button className="block aspect-[4/3] overflow-hidden" onClick={() => onNavigate("blog-detail")}>
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </button>
              <div className="p-5">
                <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-3">
                  <span className="text-[#8B5E3C] font-bold">{post.category}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <button onClick={() => onNavigate("blog-detail")} className="text-left">
                  <h2 className="text-[#1B1B1B] font-extrabold text-[17px] leading-snug group-hover:text-[#8B5E3C] transition-colors">
                    {post.title}
                  </h2>
                </button>
                <p className="text-gray-500 text-[13px] leading-relaxed mt-3">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function BlogDetailPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const post = BLOG_POSTS[0];
  return (
    <div className="min-h-screen bg-white pt-[108px]">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-20">
        <Breadcrumb current={post.title} onNavigate={onNavigate} />
        <header className="mb-8">
          <span className="text-[10px] text-[#8B5E3C] font-bold uppercase tracking-[0.3em]">{post.category}</span>
          <h1 className="text-[#1B1B1B] text-3xl sm:text-5xl font-extrabold leading-tight mt-3 mb-4">
            {post.title}
          </h1>
          <p className="text-gray-500 text-[14px] leading-relaxed">{post.excerpt}</p>
          <div className="flex items-center gap-2 text-[12px] text-gray-400 mt-4">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </header>
        <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-[#F5F0EB] mb-8">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
        <div className="prose prose-neutral max-w-none">
          {[
            "Khi chọn giày da nam, đừng bắt đầu bằng mẫu đẹp nhất trên ảnh. Hãy bắt đầu từ hoàn cảnh bạn mang nhiều nhất: đi làm mỗi ngày, gặp khách, dự tiệc hay phối cùng quần jeans cuối tuần.",
            "Sau đó kiểm tra form chân. Một đôi giày nhìn đẹp nhưng bó mũi, lỏng gót hoặc cấn mu sẽ khó dùng lâu. Nếu ở Đà Nẵng, việc ghé thử trực tiếp giúp quyết định chắc hơn rất nhiều.",
            "Khách đang tìm shop giày da tại Đà Nẵng có thể ghé Tuấn Anh Shop tại Liên Chiểu hoặc Hải Châu để xem giày da, ví da, thắt lưng da và phụ kiện da thực tế.",
            `Nếu chưa chắc size, hãy gọi/Zalo ${BRAND_PHONE} hoặc ghé cơ sở gần nhất để được tư vấn trước khi đặt mua.`,
          ].map((p) => (
            <p key={p} className="text-gray-600 text-[15px] leading-8 mb-5">{p}</p>
          ))}
        </div>
        <div className="mt-10 bg-[#FAF7F4] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-[#1B1B1B] font-extrabold">Muốn chọn size chắc hơn?</p>
            <p className="text-gray-500 text-[13px] mt-1">Xem hướng dẫn đo chân trước khi đặt hàng.</p>
          </div>
          <button
            className="bg-[#8B5E3C] text-white font-bold px-6 py-3 rounded-full text-[13px]"
            onClick={() => onNavigate("size-guide")}
          >
            Xem hướng dẫn
          </button>
        </div>
      </article>
    </div>
  );
}

function SalePage({ onNavigate, onAdd }: { onNavigate: (p: Page) => void; onAdd: () => void }) {
  const deals = PRODUCTS.filter((p) => p.originalPrice);
  return (
    <div className="min-h-screen bg-white pt-[108px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 pb-20">
        <Breadcrumb current="Khuyến mãi" onNavigate={onNavigate} />
        <PageHero
          eyebrow="Ưu đãi giới hạn"
          title={`Khuyến mãi tại ${BRAND_NAME}.`}
          text="Khu vực tập hợp các mẫu đang được giới thiệu nổi bật để khách dễ so sánh trước khi ghé thử hoặc gọi/Zalo hỏi size."
          image="https://images.unsplash.com/photo-1603191659812-ee978eeeef76?w=1600&h=1000&fit=crop&auto=format"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {deals.map((p) => (
            <ProductCard key={p.id} product={p} onView={() => onNavigate("product")} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchPage({ onNavigate, onAdd }: { onNavigate: (p: Page) => void; onAdd: () => void }) {
  const [query, setQuery] = useState("");
  const results = PRODUCTS.filter((p) =>
    `${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF7F4] pt-[108px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 pb-20">
        <Breadcrumb current="Tìm kiếm" onNavigate={onNavigate} />
        <div className="bg-white rounded-2xl p-5 sm:p-7 mb-6">
          <h1 className="text-[#1B1B1B] text-2xl sm:text-4xl font-extrabold mb-4">Tìm đôi giày phù hợp</h1>
          <p className="text-gray-500 text-[13px] leading-relaxed mb-4">
            Tìm theo kiểu dáng hoặc nhu cầu: đi làm, gặp khách, dự tiệc, Loafer, Oxford, Derby.
            Nếu chưa chắc từ khóa, hãy nhắn shop để được gợi ý nhanh hơn.
          </p>
          <div className="flex items-center gap-3 bg-[#F5F0EB] rounded-2xl px-4 py-3">
            <Search size={18} className="text-[#8B5E3C] flex-shrink-0" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Oxford, Derby, Loafer..."
              className="bg-transparent outline-none w-full text-[14px] text-[#1B1B1B] placeholder-gray-400"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {(query ? results : PRODUCTS).map((p) => (
            <ProductCard key={p.id} product={p} onView={() => onNavigate("product")} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </div>
  );
}

function WishlistPage({ onNavigate, onAdd }: { onNavigate: (p: Page) => void; onAdd: () => void }) {
  return (
    <div className="min-h-screen bg-[#FAF7F4] pt-[108px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 pb-20">
        <Breadcrumb current="Yêu thích" onNavigate={onNavigate} />
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[#1B1B1B] text-2xl sm:text-4xl font-extrabold">Danh sách yêu thích</h1>
            <p className="text-gray-500 text-[13px] mt-2">Lưu nhanh các mẫu khách thường hỏi để tư vấn lại dễ hơn.</p>
          </div>
          <button className="bg-[#1B1B1B] text-white px-5 py-3 rounded-full text-[13px] font-bold" onClick={() => onNavigate("products")}>
            Xem thêm sản phẩm
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {PRODUCTS.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} onView={() => onNavigate("product")} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AccountPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div className="min-h-screen bg-[#FAF7F4] pt-[108px]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-20">
        <Breadcrumb current="Tài khoản" onNavigate={onNavigate} />
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-5">
          <div className="bg-[#1B1B1B] text-white rounded-2xl p-6 sm:p-8">
            <div className="w-16 h-16 rounded-full bg-[#8B5E3C] flex items-center justify-center mb-5">
              <User size={26} />
            </div>
            <h1 className="text-3xl font-extrabold mb-3">Khu vực khách hàng</h1>
            <p className="text-white/55 text-[14px] leading-relaxed">
              Theo dõi thông tin đơn hàng, địa chỉ nhận hàng và các yêu cầu hỗ trợ sau mua.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-5 sm:p-7">
            <h2 className="text-[#1B1B1B] text-xl font-extrabold mb-4">Đăng nhập nhanh</h2>
            <div className="space-y-3">
              <input placeholder="Số điện thoại hoặc email" className="w-full border border-[#E8E0D8] rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#8B5E3C]" />
              <input placeholder="Mật khẩu" type="password" className="w-full border border-[#E8E0D8] rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#8B5E3C]" />
              <button className="w-full bg-[#8B5E3C] text-white font-bold py-4 rounded-2xl text-[14px]">Đăng nhập</button>
            </div>
            <div className="grid sm:grid-cols-3 gap-3 mt-6">
              {["Đơn hàng", "Địa chỉ", "Hỗ trợ"].map((item) => (
                <div key={item} className="bg-[#FAF7F4] rounded-2xl p-4 text-center">
                  <p className="text-[#1B1B1B] font-extrabold text-[14px]">{item}</p>
                  <p className="text-gray-400 text-[11px] mt-1">Đang cập nhật</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PolicyPage({ page, onNavigate }: { page: Page; onNavigate: (p: Page) => void }) {
  const content: Record<string, { title: string; eyebrow: string; intro: string; points: string[] }> = {
    "size-guide": {
      title: "Hướng dẫn chọn size",
      eyebrow: "Đo chân tại nhà",
      intro: "Đo đúng size giúp giày ôm vừa, không đau mũi chân và giữ form đẹp hơn sau thời gian sử dụng.",
      points: ["Đo chiều dài bàn chân vào cuối ngày.", "Cộng thêm khoảng 0.5cm nếu thích đi thoải mái.", "Bàn chân bè hoặc mu cao nên nhắn shop để tư vấn form.", `Liên hệ SĐT/Zalo ${BRAND_PHONE} để được tư vấn chọn size.`],
    },
    returns: {
      title: "Chính sách đổi trả",
      eyebrow: "Thông tin hỗ trợ",
      intro: "Thông tin đổi trả cần được Tuấn Anh Shop tư vấn theo từng sản phẩm và từng đơn hàng cụ thể.",
      points: [`Liên hệ SĐT/Zalo ${BRAND_PHONE} để hỏi chính sách áp dụng cho đơn hàng của bạn.`, "Giữ hóa đơn hoặc thông tin mua hàng để shop hỗ trợ tra cứu.", "Mang sản phẩm đến cơ sở gần nhất nếu cần kiểm tra trực tiếp.", "Không tự ý gửi hàng khi chưa liên hệ shop xác nhận."],
    },
    warranty: {
      title: "Chính sách bảo hành",
      eyebrow: "Thông tin hỗ trợ sau mua",
      intro: "Thông tin hỗ trợ sau mua sẽ được Tuấn Anh Shop tư vấn trực tiếp theo từng sản phẩm.",
      points: [`Liên hệ SĐT/Zalo ${BRAND_PHONE} để được kiểm tra thông tin đơn hàng.`, "Giữ hóa đơn hoặc thông tin mua hàng để shop hỗ trợ nhanh hơn.", "Có thể ghé một trong 3 cơ sở để được tư vấn trực tiếp.", "Nội dung chi tiết sẽ được cập nhật khi shop cung cấp chính sách chính thức."],
    },
    shipping: {
      title: "Chính sách giao hàng",
      eyebrow: "Thông tin nhận hàng",
      intro: "Khách có thể liên hệ shop để được tư vấn hình thức nhận hàng phù hợp theo khu vực.",
      points: ["Có 3 cơ sở tại Liên Chiểu và Hải Châu để khách ghé xem sản phẩm.", `Gọi/Zalo ${BRAND_PHONE} để hỏi tình trạng sản phẩm trước khi ghé.`, "Thông tin giao hàng cụ thể sẽ được shop xác nhận theo từng đơn.", "Nội dung chi tiết sẽ được cập nhật khi shop cung cấp chính sách chính thức."],
    },
    terms: {
      title: "Điều khoản sử dụng",
      eyebrow: "Minh bạch khi mua hàng",
      intro: "Các nội dung trên website dùng để giới thiệu sản phẩm, thông tin cửa hàng và kênh liên hệ chính thức của Tuấn Anh Shop.",
      points: ["Khách nên kiểm tra lại thông tin sản phẩm, size và tình trạng hàng trước khi đặt mua.", `Mọi tư vấn chính thức vui lòng liên hệ SĐT/Zalo ${BRAND_PHONE}.`, "Thông tin về đổi trả, bảo hành và giao hàng sẽ được shop xác nhận theo từng đơn hàng.", "Không tự ý gửi sản phẩm hoặc chuyển khoản khi chưa được shop xác nhận."],
    },
    privacy: {
      title: "Chính sách bảo mật",
      eyebrow: "Dữ liệu khách hàng",
      intro: "Thông tin khách hàng chỉ nên được dùng cho mục đích tư vấn, xử lý đơn hàng và hỗ trợ sau mua.",
      points: ["Không chia sẻ số điện thoại/email cho bên thứ ba khi chưa có đồng ý.", "Chỉ lưu dữ liệu cần thiết để xử lý nhu cầu mua hàng.", "Khách có thể yêu cầu shop kiểm tra hoặc cập nhật thông tin liên hệ khi cần.", `Kênh liên hệ chính thức: ${BRAND_PHONE} và ${BRAND_FACEBOOK}.`],
    },
  };
  const data = content[page] || content.terms;

  return (
    <div className="min-h-screen bg-white pt-[108px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-20">
        <Breadcrumb current={data.title} onNavigate={onNavigate} />
        <section className="bg-[#FAF7F4] rounded-2xl p-6 sm:p-9 mb-6">
          <span className="text-[10px] text-[#8B5E3C] font-bold uppercase tracking-[0.3em]">{data.eyebrow}</span>
          <h1 className="text-[#1B1B1B] text-3xl sm:text-5xl font-extrabold leading-tight mt-3 mb-4">
            {data.title}
          </h1>
          <p className="text-gray-500 text-[14px] leading-relaxed">{data.intro}</p>
        </section>
        <div className="space-y-3">
          {data.points.map((point, i) => (
            <div key={point} className="bg-white border border-[#F0E9E1] rounded-2xl p-5 flex gap-4">
              <span className="w-8 h-8 rounded-full bg-[#8B5E3C] text-white flex items-center justify-center text-[12px] font-bold flex-shrink-0">
                {i + 1}
              </span>
              <p className="text-[#1B1B1B] text-[14px] leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Home ───────────────────────────────────────────────────────────────────────
function Home({
  onNavigate,
  onAdd,
}: {
  onNavigate: (p: Page) => void;
  onAdd: () => void;
}) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <USPStrip />
      <Categories onNavigate={onNavigate} />
      <BestSellers onNavigate={onNavigate} onAdd={onAdd} />
      <FlashSale onNavigate={onNavigate} onAdd={onAdd} />
      <Production />
      <Reviews />
      <InstagramGallery />
      <Blog />
      <FAQ />
      <LocalSEO />
      <Newsletter />
    </>
  );
}

function FloatingCTA() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      <a
        href={`tel:${BRAND_TEL}`}
        aria-label="Gọi shop"
        title="Gọi shop"
        className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#1B1B1B] text-white shadow-[0_12px_28px_rgba(27,27,27,0.24)] transition-all hover:-translate-y-0.5 hover:bg-[#8B5E3C] focus:outline-none focus:ring-2 focus:ring-[#CFA27A] focus:ring-offset-2 sm:h-14 sm:w-14"
      >
        <Phone size={20} strokeWidth={2.2} />
        <span className="sr-only">Gọi shop</span>
      </a>
      <a
        href={`https://zalo.me/${BRAND_TEL}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nhắn Zalo"
        title="Nhắn Zalo"
        className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#8B5E3C] text-white shadow-[0_12px_28px_rgba(139,94,60,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#1B1B1B] focus:outline-none focus:ring-2 focus:ring-[#CFA27A] focus:ring-offset-2 sm:h-14 sm:w-14"
      >
        <MessageCircle size={21} strokeWidth={2.2} />
        <span className="sr-only">Nhắn Zalo</span>
      </a>
    </div>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>(() => pageFromPath(window.location.pathname));
  const [cart, setCart] = useState(0);

  useEffect(() => {
    const syncPage = () => setPage(pageFromPath(window.location.pathname));
    window.addEventListener("popstate", syncPage);
    return () => window.removeEventListener("popstate", syncPage);
  }, []);

  useEffect(() => {
    document.title =
      page === "home"
        ? "Tuấn Anh Shop - Giày Da, Ví Da, Thắt Lưng Da Đà Nẵng"
        : `${pageLabel[page]} | ${BRAND_SEO_NAME}`;
  }, [page]);

  const go = (p: Page) => {
    const nextPath = pagePaths[p];
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, pageLabel[p], nextPath);
    }
    document.title = `${pageLabel[p]} | ${BRAND_SEO_NAME}`;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const add = () => setCart((c) => c + 1);

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }} className="bg-background text-foreground">
      <Header onNavigate={go} cartCount={cart} />
      <main>
        {page === "home" && <Home onNavigate={go} onAdd={add} />}
        {page === "products" && <ProductsPage onNavigate={go} onAdd={add} />}
        {page === "product" && <ProductDetail onNavigate={go} onAdd={add} />}
        {page === "cart" && <CartPage onNavigate={go} />}
        {page === "checkout" && <CheckoutPage onNavigate={go} />}
        {page === "about" && <AboutPage onNavigate={go} />}
        {page === "contact" && <ContactPage onNavigate={go} />}
        {page === "blog" && <BlogPage onNavigate={go} />}
        {page === "blog-detail" && <BlogDetailPage onNavigate={go} />}
        {page === "sale" && <SalePage onNavigate={go} onAdd={add} />}
        {page === "search" && <SearchPage onNavigate={go} onAdd={add} />}
        {page === "wishlist" && <WishlistPage onNavigate={go} onAdd={add} />}
        {page === "account" && <AccountPage onNavigate={go} />}
        {["size-guide", "returns", "warranty", "shipping", "terms", "privacy"].includes(page) && (
          <PolicyPage page={page} onNavigate={go} />
        )}
      </main>
      <FloatingCTA />
      <Footer onNavigate={go} />
    </div>
  );
}
