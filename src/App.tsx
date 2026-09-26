/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Wrench,
  CheckCircle2,
  ChevronDown,
  Star,
  Trash2,
  Send,
  Menu,
  X,
  Snowflake,
  Droplets,
  Volume2,
  AlertTriangle,
  Wind,
  Power,
  Thermometer,
  RotateCw,
  Home,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

// EXACT 4 IMAGES ONLY
import heroImg from './assets/images/hero_ac_technician_1790429084869.jpg';
import cleaningImg from './assets/images/ac_maintenance_cleaning_1790429099953.jpg';
import repairImg from './assets/images/ac_repair_troubleshoot_1790429112512.jpg';
import installImg from './assets/images/ac_installation_mounting_1790429124421.jpg';

interface CustomerReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Reviews stored in localStorage - Initial state is EMPTY (no fake reviews)
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem('ql_customer_reviews');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('ql_customer_reviews', JSON.stringify(reviews));
    } catch {
      // storage failed
    }
  }, [reviews]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    const newRev: CustomerReview = {
      id: Date.now().toString(),
      name: reviewName.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
      date: new Date().toLocaleDateString('vi-VN'),
    };

    setReviews([newRev, ...reviews]);
    setReviewName('');
    setReviewComment('');
    setReviewRating(5);
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 4000);
  };

  const handleDeleteReview = (id: string) => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans pb-24 md:pb-0">
      {/* =========================================================================
          01. HEADER (Fixed when scrolling)
          ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Brand name + 30 minutes commitment */}
            <div className="flex flex-col justify-center">
              <a href="#trang-chu" className="text-xl sm:text-2xl font-bold tracking-tight text-sky-950 uppercase hover:text-sky-800 transition-colors">
                Điện Lạnh Quang Cảnh
              </a>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-600 mt-0.5">
                <span style={{ fontSize: '11px' }}>⚡ THỢ CÓ MẶT SAU 30 PHÚT LIÊN HỆ</span>
              </div>
            </div>

            {/* Middle: Clean Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
              <button onClick={() => scrollToSection('trang-chu')} className="hover:text-sky-700 transition-colors cursor-pointer">
                Trang chủ
              </button>
              <button onClick={() => scrollToSection('dich-vu')} className="hover:text-sky-700 transition-colors cursor-pointer">
                Dịch vụ
              </button>
              <button onClick={() => scrollToSection('danh-gia')} className="hover:text-sky-700 transition-colors cursor-pointer">
                Đánh giá
              </button>
              <button onClick={() => scrollToSection('faq')} className="hover:text-sky-700 transition-colors cursor-pointer">
                FAQ
              </button>
              <button onClick={() => scrollToSection('lien-he')} className="hover:text-sky-700 transition-colors cursor-pointer">
                Liên hệ
              </button>
            </nav>

            {/* Right: Quick Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="tel:0965775972"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-sm hover:shadow transition-all active:scale-95"
              >
                <Phone className="w-4 h-4 fill-white" />
                <span>GỌI NGAY</span>
              </a>
              <a
                href="https://zalo.me/0329901465"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm shadow-sm hover:shadow transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>NHẮN ZALO</span>
              </a>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 sm:hidden">
              <a
                href="tel:0965775972"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold text-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>GỌI</span>
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Mở menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
              <a
                href="tel:0965775972"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-red-600 text-white font-semibold text-sm text-center"
              >
                <Phone className="w-4 h-4" />
                <span>GỌI NGAY</span>
              </a>
              <a
                href="https://zalo.me/0329901465"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-sky-600 text-white font-semibold text-sm text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>NHẮN ZALO</span>
              </a>
            </div>
            <div className="flex flex-col space-y-2 text-base font-medium text-slate-800">
              <button
                onClick={() => scrollToSection('trang-chu')}
                className="text-left py-2 px-3 rounded-md hover:bg-slate-50 transition-colors"
              >
                Trang chủ
              </button>
              <button
                onClick={() => scrollToSection('dich-vu')}
                className="text-left py-2 px-3 rounded-md hover:bg-slate-50 transition-colors"
              >
                Dịch vụ
              </button>
              <button
                onClick={() => scrollToSection('danh-gia')}
                className="text-left py-2 px-3 rounded-md hover:bg-slate-50 transition-colors"
              >
                Đánh giá
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-left py-2 px-3 rounded-md hover:bg-slate-50 transition-colors"
              >
                FAQ (Hỏi đáp)
              </button>
              <button
                onClick={() => scrollToSection('lien-he')}
                className="text-left py-2 px-3 rounded-md hover:bg-slate-50 transition-colors"
              >
                Liên hệ & Cơ sở
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* =========================================================================
            02. HERO (Single H1, Content, CTAs, Trust Points, IMAGE 1 on Right)
            ========================================================================= */}
        <section id="trang-chu" className="relative pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-sky-50/60 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Heading, description, action buttons, trust notes */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-sky-100/80 text-sky-900 text-xs sm:text-sm font-semibold tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>ĐIỆN LẠNH TẠI NHÀ HÀ NỘI — CÓ MẶT SAU 30 PHÚT</span>
                </div>

                {/* SINGLE H1 */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.2] text-center" style={{ textAlign: 'center' }}>
                  VỆ SINH – SỬA CHỮA – BẢO DƯỠNG – LẮP ĐẶT ĐIỀU HÒA
                </h1>

                <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
                  Điện Lạnh Quang Cảnh nhận vệ sinh, bảo dưỡng, sửa chữa và lắp đặt điều hòa tại nhà Hà Nội. Hỗ trợ nhanh, kiểm tra tận nơi, tư vấn rõ ràng.
                </p>

                {/* Primary CTAs */}
                <div className="pt-2 space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                    <a
                      href="tel:0965775972"
                      className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-base sm:text-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                    >
                      <Phone className="w-5 h-5 fill-white" />
                      <span>GỌI NGAY — 0965775972</span>
                    </a>
                    <a
                      href="https://zalo.me/0329901465"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-base sm:text-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>NHẮN ZALO — 0329901465</span>
                    </a>
                  </div>

                  {/* Zalo Guidance - Right below Zalo button */}
                  <p className="text-xs sm:text-sm text-slate-600 font-bold italic flex items-center gap-1.5 pt-1" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                    <span className="hidden sm:inline">📲 Gửi ảnh, video và mô tả tình trạng điều hòa qua Zalo để được tư vấn.</span>
                    <span className="inline sm:hidden">📲 Gửi ảnh/video tình trạng máy qua Zalo để được tư vấn.</span>
                  </p>
                </div>

                {/* 4 Trust Points */}
                <div className="pt-4 border-t border-slate-200/80 grid grid-cols-2 gap-3.5 sm:gap-4">
                  <div className="flex items-center gap-2 text-slate-800 text-sm font-medium">
                    <span className="text-amber-500 font-bold text-base">⚡</span>
                    <span>Báo giá trước khi làm</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-800 text-sm font-medium">
                    <span className="text-sky-600 font-bold text-base">🏠</span>
                    <span>Phục vụ tận nơi</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-800 text-sm font-medium">
                    <span className="text-slate-700 font-bold text-base">🔧</span>
                    <span>Kỹ thuật viên có kinh nghiệm</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-800 text-sm font-medium">
                    <span className="text-blue-600 font-bold text-base">💬</span>
                    <span>Tư vấn qua Zalo</span>
                  </div>
                </div>
              </div>

              {/* Right Column: IMAGE 1 */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white">
                  <img
                    src={heroImg}
                    alt="Kỹ thuật viên Điện Lạnh Quang Cảnh đang kiểm tra sửa chữa điều hòa tại nhà"
                    className="w-full h-auto aspect-4/3 object-cover"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent p-4 text-white">
                    <p className="text-sm font-semibold">Kỹ thuật viên Điện Lạnh Quang Cảnh</p>
                    <p className="text-xs text-slate-200">Kiểm tra tận nơi, phục vụ nhanh chóng tại các quận Hà Nội</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            03. TRUST BAR (No images, 4 short items)
            ========================================================================= */}
        <section className="bg-slate-900 text-white py-6 border-y border-slate-800 shadow-inner">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <span className="text-sm sm:text-base font-semibold leading-snug">Có mặt sau 30 phút liên hệ</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏠</span>
                <span className="text-sm sm:text-base font-semibold leading-snug">Hỗ trợ tận nơi</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔧</span>
                <span className="text-sm sm:text-base font-semibold leading-snug">Kiểm tra tình trạng máy</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">💬</span>
                <span className="text-sm sm:text-base font-semibold leading-snug">Tư vấn qua Zalo</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            04. DỊCH VỤ 1: VỆ SINH & BẢO DƯỠNG ĐIỀU HÒA (IMAGE 2)
            ========================================================================= */}
        <section id="dich-vu" className="py-14 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* IMAGE 2 */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                  <img
                    src={cleaningImg}
                    alt="Kỹ thuật viên đang vệ sinh và bảo dưỡng điều hòa tại nhà"
                    className="w-full h-auto aspect-4/3 object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Text content */}
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
                <div className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                  Dịch vụ 01
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  VỆ SINH & BẢO DƯỠNG ĐIỀU HÒA
                </h2>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                  Điều hòa lâu ngày không vệ sinh dễ bám bụi, làm lạnh kém, gió yếu và hoạt động ì hơn. Điện Lạnh Quang Cảnh nhận vệ sinh, bảo dưỡng điều hòa tại nhà, giúp máy sạch hơn, hoạt động ổn định, làm lạnh tốt hơn và duy trì không khí dễ chịu trong phòng.
                </p>

                {/* 3 short points */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Làm sạch bụi bẩn</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Kiểm tra tình trạng máy</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Bảo dưỡng tại nhà</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            05. DỊCH VỤ 2: SỬA CHỮA ĐIỀU HÒA (IMAGE 3) - SECTION NỔI BẬT NHẤT!
            ========================================================================= */}
        <section className="py-14 sm:py-20 bg-slate-100/70 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                Dịch vụ 02 — Sửa chữa điều hòa
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 mt-2 tracking-tight">
                ĐIỀU HÒA NHÀ BẠN ĐANG GẶP VẤN ĐỀ GÌ?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3">
                Kỹ thuật viên có mặt tận nơi kiểm tra chính xác, xử lý dứt điểm các sự cố phổ biến của các dòng máy lạnh.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Common Issues Cards */}
              <div className="lg:col-span-7 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-sky-300 hover:shadow-sm transition-all flex items-center gap-3">
                    <span className="text-2xl">❄️</span>
                    <span className="font-semibold text-slate-900 text-sm sm:text-base">Không mát, kém lạnh</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-sky-300 hover:shadow-sm transition-all flex items-center gap-3">
                    <span className="text-2xl">💧</span>
                    <span className="font-semibold text-slate-900 text-sm sm:text-base">Chảy nước</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-sky-300 hover:shadow-sm transition-all flex items-center gap-3">
                    <span className="text-2xl">🔊</span>
                    <span className="font-semibold text-slate-900 text-sm sm:text-base">Kêu to, rung</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-sky-300 hover:shadow-sm transition-all flex items-center gap-3">
                    <span className="text-2xl">⚠️</span>
                    <span className="font-semibold text-slate-900 text-sm sm:text-base">Báo lỗi, nháy đèn</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-sky-300 hover:shadow-sm transition-all flex items-center gap-3">
                    <span className="text-2xl">💨</span>
                    <span className="font-semibold text-slate-900 text-sm sm:text-base">Gió yếu, không lạnh</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-sky-300 hover:shadow-sm transition-all flex items-center gap-3">
                    <span className="text-2xl">🔌</span>
                    <span className="font-semibold text-slate-900 text-sm sm:text-base">Không hoạt động</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-sky-300 hover:shadow-sm transition-all flex items-center gap-3">
                    <span className="text-2xl">🌡️</span>
                    <span className="font-semibold text-slate-900 text-sm sm:text-base">Lạnh không đều</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-sky-300 hover:shadow-sm transition-all flex items-center gap-3">
                    <span className="text-2xl">🔄</span>
                    <span className="font-semibold text-slate-900 text-sm sm:text-base">Hoạt động chập chờn</span>
                  </div>
                </div>

                {/* Subtext Prompt */}
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-950">
                  <p className="text-sm sm:text-base font-medium leading-relaxed">
                    📲 Chưa biết máy bị lỗi gì? Gửi ảnh hoặc video tình trạng điều hòa qua Zalo, kèm mô tả tình trạng máy để được tư vấn miễn phí.
                  </p>
                </div>
              </div>

              {/* IMAGE 3 */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
                  <img
                    src={repairImg}
                    alt="Kỹ thuật viên đang kiểm tra hoặc sửa chữa điều hòa"
                    className="w-full h-auto aspect-4/3 object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            06. DỊCH VỤ 3: LẮP ĐẶT ĐIỀU HÒA (IMAGE 4)
            ========================================================================= */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* IMAGE 4 */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                  <img
                    src={installImg}
                    alt="Kỹ thuật viên đang lắp đặt điều hòa tại nhà"
                    className="w-full h-auto aspect-4/3 object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Text content */}
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
                <div className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                  Dịch vụ 03
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Lắp đặt điều hòa
                </h2>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                  Nhận lắp đặt điều hòa tại nhà, tư vấn vị trí lắp đặt phù hợp, thi công gọn gàng, chắc chắn, cẩn thận và kiểm tra vận hành kỹ trước khi bàn giao. Hỗ trợ lắp đặt nhiều dòng điều hòa, giúp máy hoạt động ổn định, làm lạnh hiệu quả và tiết kiệm điện năng.
                </p>

                {/* 4 short points */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Lắp đặt trọn gói</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Tư vấn vị trí phù hợp</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Điều hòa tiết kiệm điện</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Kiểm tra vận hành sau khi hoàn thiện</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            07. VÌ SAO CHỌN ĐIỆN LẠNH QUANG CẢNH? (No image, 5 small cards)
            ========================================================================= */}
        <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                VÌ SAO CHỌN ĐIỆN LẠNH QUANG CẢNH?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-sky-300 transition-all">
                <div className="text-3xl mb-2.5">⚡</div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Có mặt nhanh</h3>
                <p className="text-sm text-slate-600">Thợ có mặt sau 30 phút liên hệ.</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-sky-300 transition-all">
                <div className="text-3xl mb-2.5">🏠</div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Hỗ trợ tận nơi</h3>
                <p className="text-sm text-slate-600">Kiểm tra tình trạng điều hòa tại nhà.</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-sky-300 transition-all">
                <div className="text-3xl mb-2.5">🛠️</div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Làm việc cẩn thận</h3>
                <p className="text-sm text-slate-600">Gọn gàng, chuyên nghiệp.</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-sky-300 transition-all">
                <div className="text-3xl mb-2.5">💬</div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Tư vấn rõ ràng</h3>
                <p className="text-sm text-slate-600">Trao đổi và báo giá rõ trước khi sửa.</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-sky-300 transition-all sm:col-span-2 lg:col-span-1">
                <div className="text-3xl mb-2.5">📲</div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Hỗ trợ qua Zalo</h3>
                <p className="text-sm text-slate-600">Gửi ảnh/video để được tư vấn.</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            08. ĐÁNH GIÁ KHÁCH HÀNG (No fake reviews! Real interactive user form)
            ========================================================================= */}
        <section id="danh-gia" className="py-14 sm:py-20 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                KHÁCH HÀNG NÓI GÌ VỀ ĐIỆN LẠNH QUANG CẢNH?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                Khách hàng có thể để lại đánh giá sau khi sử dụng dịch vụ.
              </p>
            </div>

            {/* Reviews List */}
            <div className="mb-10">
              {reviews.length === 0 ? (
                <div className="py-10 px-6 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center text-slate-500">
                  <p className="text-base font-medium">Đánh giá của khách hàng sẽ được cập nhật tại đây.</p>
                  <p className="text-xs text-slate-400 mt-1">Hãy là người đầu tiên chia sẻ cảm nhận sau khi sử dụng dịch vụ bên dưới.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-5 rounded-xl bg-slate-50 border border-slate-200 relative group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900">{rev.name}</span>
                          <span className="text-xs text-slate-400">· {rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">{rev.comment}</p>

                      {/* Admin deletion affordance */}
                      <button
                        onClick={() => handleDeleteReview(rev.id)}
                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 p-1 transition-opacity text-xs flex items-center gap-1"
                        title="Xóa đánh giá"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Leave a review form */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span>Gửi đánh giá trải nghiệm dịch vụ</span>
              </h3>

              {reviewSuccess && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Cảm ơn bạn đã gửi đánh giá! Đánh giá của bạn đã được hiển thị.</span>
                </div>
              )}

              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="reviewer-name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Họ và tên của bạn
                    </label>
                    <input
                      id="reviewer-name"
                      type="text"
                      required
                      placeholder="Ví dụ: Anh Tuấn, Chị Lan..."
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Chọn số sao hài lòng
                    </label>
                    <div className="flex items-center gap-2 h-10">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setReviewRating(star)}
                          className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                          aria-label={`${star} sao`}
                        >
                          <Star
                            className={`w-6 h-6 ${star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                          />
                        </button>
                      ))}
                      <span className="text-xs text-slate-500 ml-2 font-medium">({reviewRating} / 5 sao)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="reviewer-comment" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Nội dung nhận xét
                  </label>
                  <textarea
                    id="reviewer-comment"
                    required
                    rows={3}
                    placeholder="Chia sẻ trải nghiệm của bạn về thời gian thợ có mặt, chất lượng máy sau khi làm..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi đánh giá</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* =========================================================================
            09. FAQ (Simple Accordion)
            ========================================================================= */}
        <section id="faq" className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                CÂU HỎI THƯỜNG GẶP
              </h2>
            </div>

            <div className="space-y-3">
              {/* FAQ 1 */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <button
                  onClick={() => toggleFaq(1)}
                  className="w-full px-5 py-4 text-left font-semibold text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-base">Bao lâu nên vệ sinh điều hòa một lần?</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${activeFaq === 1 ? 'rotate-180 text-sky-600' : ''}`} />
                </button>
                {activeFaq === 1 && (
                  <div className="px-5 pb-4 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    Nên vệ sinh điều hòa định kỳ từ 3 đến 6 tháng một lần tùy vào tần suất sử dụng và môi trường xung quanh để giúp máy làm lạnh sâu, tiết kiệm điện và duy trì không khí trong lành.
                  </div>
                )}
              </div>

              {/* FAQ 2 */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <button
                  onClick={() => toggleFaq(2)}
                  className="w-full px-5 py-4 text-left font-semibold text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-base">Điều hòa không mát thường do đâu?</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${activeFaq === 2 ? 'rotate-180 text-sky-600' : ''}`} />
                </button>
                {activeFaq === 2 && (
                  <div className="px-5 pb-4 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    Điều hòa không mát có thể do lưới lọc bám nhiều bụi bẩn cản gió, hao hụt môi chất làm lạnh (gas) hoặc quạt và lốc máy gặp trục trặc. Kỹ thuật viên sẽ kiểm tra trực tiếp tình trạng thực tế để xác định chính xác và xử lý triệt để.
                  </div>
                )}
              </div>

              {/* FAQ 3 */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <button
                  onClick={() => toggleFaq(3)}
                  className="w-full px-5 py-4 text-left font-semibold text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-base">Điều hòa chảy nước có cần kiểm tra không?</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${activeFaq === 3 ? 'rotate-180 text-sky-600' : ''}`} />
                </button>
                {activeFaq === 3 && (
                  <div className="px-5 pb-4 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    Có, nên kiểm tra sớm vì nước chảy thường do tắc đường ống thoát nước, máng nước bị bẩn hoặc thiếu gas đóng tuyết; xử lý sớm tránh làm hỏng sàn gỗ, tường nhà và linh kiện điện tử.
                  </div>
                )}
              </div>

              {/* FAQ 4 */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <button
                  onClick={() => toggleFaq(4)}
                  className="w-full px-5 py-4 text-left font-semibold text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-base">Có hỗ trợ sửa điều hòa tại nhà không?</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${activeFaq === 4 ? 'rotate-180 text-sky-600' : ''}`} />
                </button>
                {activeFaq === 4 && (
                  <div className="px-5 pb-4 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    Có. Điện Lạnh Quang Cảnh nhận hỗ trợ kiểm tra và sửa chữa điều hòa tại nhà.
                  </div>
                )}
              </div>

              {/* FAQ 5 */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <button
                  onClick={() => toggleFaq(5)}
                  className="w-full px-5 py-4 text-left font-semibold text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-base">Thợ có thể đến sau bao lâu?</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${activeFaq === 5 ? 'rotate-180 text-sky-600' : ''}`} />
                </button>
                {activeFaq === 5 && (
                  <div className="px-5 pb-4 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    Thợ có mặt sau 30 phút liên hệ.
                  </div>
                )}
              </div>

              {/* FAQ 6 */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <button
                  onClick={() => toggleFaq(6)}
                  className="w-full px-5 py-4 text-left font-semibold text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-base">Có thể gửi ảnh/video tình trạng máy qua Zalo không?</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${activeFaq === 6 ? 'rotate-180 text-sky-600' : ''}`} />
                </button>
                {activeFaq === 6 && (
                  <div className="px-5 pb-4 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    Có. Khách hàng có thể gửi ảnh, video và mô tả tình trạng điều hòa qua Zalo 0329901465 để được tư vấn nhanh.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            10. CTA CUỐI (Large, Prominent, 2 big buttons)
            ========================================================================= */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-sky-950 via-slate-900 to-sky-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs sm:text-sm font-semibold">
              <span>⚡ THỢ CÓ MẶT SAU 30 PHÚT LIÊN HỆ</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              ĐIỆN LẠNH QUANG CẢNH
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
              Hỗ trợ kiểm tra tận nơi nhanh chóng tại khắp các quận huyện Hà Nội. Báo giá minh bạch trước khi thực hiện.
            </p>

            {/* Hai nút lớn */}
            <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="tel:0965775972"
                className="w-full sm:w-auto min-w-[260px] flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
              >
                <Phone className="w-6 h-6 fill-white" />
                <div className="text-left">
                  <div className="text-xs uppercase font-medium tracking-wider">GỌI NGAY</div>
                  <div className="text-xl leading-none">0965775972</div>
                </div>
              </a>

              <a
                href="https://zalo.me/0329901465"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto min-w-[260px] flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
              >
                <MessageCircle className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs uppercase font-medium tracking-wider">NHẮN ZALO</div>
                  <div className="text-xl leading-none">0329901465</div>
                </div>
              </a>
            </div>

            {/* Subtext */}
            <p className="text-xs sm:text-sm text-slate-300 pt-2 font-medium">
              Gọi ngay hoặc gửi ảnh, video và mô tả tình trạng máy qua Zalo để được tư vấn
            </p>
          </div>
        </section>
      </main>

      {/* =========================================================================
          11. FOOTER (Brand, Hotline, Zalo, 3 Services, 15 Branches in Hanoi)
          ========================================================================= */}
      <footer id="lien-he" className="bg-slate-950 text-slate-300 pt-14 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
            {/* Brand Info */}
            <div className="md:col-span-6 space-y-4">
              <h3 className="text-2xl font-bold tracking-tight text-white uppercase">
                ĐIỆN LẠNH QUANG CẢNH
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                Vệ sinh, bảo dưỡng, sửa chữa và lắp đặt điều hòa tại nhà. Đội ngũ kỹ thuật viên lành nghề, hỗ trợ nhanh chóng tại nhà khắp Hà Nội.
              </p>
              <div className="space-y-2 pt-1 text-sm">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="font-semibold text-white">Hotline:</span>
                  <a href="tel:0965775972" className="text-slate-200 hover:text-white transition-colors">
                    0965775972
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="font-semibold text-white">Zalo:</span>
                  <a href="https://zalo.me/0329901465" target="_blank" rel="noreferrer" className="text-slate-200 hover:text-white transition-colors">
                    0329901465
                  </a>
                </div>
              </div>
            </div>

            {/* 3 Main Services */}
            <div className="md:col-span-6 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                Dịch vụ
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                  <span>Vệ sinh & bảo dưỡng điều hòa</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                  <span>Sửa chữa điều hòa</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                  <span>Lắp đặt điều hòa</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 15 Cơ sở phục vụ tại Hà Nội */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Hệ thống cơ sở phục vụ tại Hà Nội
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2.5 gap-x-6 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span><strong className="text-slate-200">CS1 – Hai Bà Trưng:</strong> Số 28 Đại Cồ Việt, Hà Nội</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span><strong className="text-slate-200">CS2 – Đống Đa:</strong> Số 116 Thái Hà, Hà Nội</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span><strong className="text-slate-200">CS3 – Cầu Giấy:</strong> Số 52 Trần Thái Tông, Hà Nội</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span><strong className="text-slate-200">CS4 – Thanh Xuân:</strong> Số 35 Nguyễn Trãi, Hà Nội</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span><strong className="text-slate-200">CS5 – Ba Đình:</strong> Số 74 Đào Tấn, Hà Nội</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span><strong className="text-slate-200">CS6 – Hoàn Kiếm:</strong> Số 21 Hàng Bông, Hà Nội</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span><strong className="text-slate-200">CS7 – Hoàng Mai:</strong> Số 88 Nguyễn An Ninh, Hà Nội</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span><strong className="text-slate-200">CS8 – Tây Hồ:</strong> Số 46 Âu Cơ, Hà Nội</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span><strong className="text-slate-200">CS9 – Long Biên:</strong> Số 63 Nguyễn Văn Cừ, Hà Nội</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span><strong className="text-slate-200">CS10 – Hà Đông:</strong> Số 19 Quang Trung, Hà Nội</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span><strong className="text-slate-200">CS11 – Thanh Trì:</strong> Số 28 Ngọc Hồi, Hà Nội</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span><strong className="text-slate-200">CS12 – Đông Anh:</strong> Số 56 Cao Lỗ, Hà Nội</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span><strong className="text-slate-200">CS13 – Đan Phượng:</strong> Số 38 Tây Sơn, Hà Nội</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span><strong className="text-slate-200">CS14 – Hoài Đức:</strong> Số 72 Trôi, Hà Nội</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span><strong className="text-slate-200">CS15 – Nam Từ Liêm:</strong> Số 68 Lê Quang Đạo, Hà Nội</span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-slate-900 text-center text-xs text-slate-500">
            © Điện Lạnh Quang Cảnh. Dịch vụ điều hòa tại nhà Hà Nội — Thợ có mặt sau 30 phút liên hệ.
          </div>
        </div>
      </footer>

      {/* =========================================================================
          17. STICKY CTA MOBILE (Two buttons + short note, fixed bottom)
          ========================================================================= */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl px-3 py-2">
        <p className="text-[11px] text-center text-slate-600 font-medium mb-1.5">
          Gửi ảnh/video tình trạng máy qua Zalo để được tư vấn.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <a
            href="tel:0965775972"
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-red-600 active:bg-red-700 text-white font-bold text-sm shadow-xs"
          >
            <Phone className="w-4 h-4 fill-white" />
            <span>📞 GỌI NGAY</span>
          </a>
          <a
            href="https://zalo.me/0329901465"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-sky-600 active:bg-sky-700 text-white font-bold text-sm shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>💬 NHẮN ZALO</span>
          </a>
        </div>
      </div>
    </div>
  );
}
