// src/components/GlobalComponent/TopNavbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { ShoppingBag, X, ArrowRight, Plus, Minus } from "lucide-react";

export default function TopNavbar() {
  // ========== SEARCH DRAWER ==========
  const [searchOpen, setSearchOpen] = useState(false);
  const onDrawerToggle = (e) => setSearchOpen(e.target.checked);
  const toggleSearchDrawer = () => setSearchOpen((v) => !v);

  useEffect(() => {
    if (searchOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [searchOpen]);

  // ========== DESKTOP DROPDOWNS ==========
  const [openDropdown, setOpenDropdown] = useState(null);
  const toggleDropdown = (index) =>
    setOpenDropdown((cur) => (cur === index ? null : index));

  // ========== CART STATE ==========
  const { items, totalCount, subtotal, inc, dec, remove } = useCart();

  // Controlled dropdown for cart (prevents DaisyUI auto-close on internal clicks)
  const cartRefMobile = useRef(null);
  const cartRefDesktop = useRef(null);
  const [cartOpenMobile, setCartOpenMobile] = useState(false);
  const [cartOpenDesktop, setCartOpenDesktop] = useState(false);

  // close when clicking outside each dropdown
  useEffect(() => {
    function onDocClick(e) {
      if (cartRefMobile.current && !cartRefMobile.current.contains(e.target)) {
        setCartOpenMobile(false);
      }
      if (cartRefDesktop.current && !cartRefDesktop.current.contains(e.target)) {
        setCartOpenDesktop(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // ===== MiniCart component (shared by mobile & desktop) =====
  const MiniCart = ({ keepOpen, close }) => (
    <div
      tabIndex={0}
      // Prevent focus-loss so DaisyUI doesn't auto-close
      onMouseDown={(e) => e.preventDefault()}
      onClick={(e) => {
        e.stopPropagation();
        keepOpen();
      }}
      className="
        dropdown-content z-50 mt-3 w-[420px] rounded-2xl
        border border-slate-200/70 bg-white/80 backdrop-blur-xl shadow-2xl
        overflow-hidden
      "
    >
      {/* Header */}
      <div className="px-5 py-4 bg-black text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/15 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-[15px] font-semibold">Your Cart</div>
              <div className="text-xs text-white/80">
                {totalCount} {totalCount === 1 ? "item" : "items"}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-white/80">Subtotal</div>
            <div className="text-lg font-bold">৳{subtotal.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="px-2 py-2">
        <div
          className="
            max-h-80 overflow-auto rounded-2xl border border-slate-200/70 bg-white/70
            divide-y divide-slate-200/80
          "
        >
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-10">
              <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center shadow-inner">
                <ShoppingBag className="h-6 w-6 text-slate-400" />
              </div>
              <p className="text-sm text-slate-500">Your cart is empty</p>
              <Link
                to="/view-list"
                className="btn btn-sm mt-1 rounded-xl bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98] transition"
                onClick={close}
              >
                Browse products
              </Link>
            </div>
          ) : (
            items.map((x) => (
              <div
                key={x.id}
                className="grid grid-cols-[64px_1fr_96px] items-stretch gap-3 p-3 hover:bg-slate-50/70 transition-colors"
              >
                {/* Image */}
                <img
                  src={x.imageUrl}
                  alt={x.name}
                  className="h-16 w-16 rounded-xl object-cover border border-slate-200"
                />

                {/* Middle: title + qty */}
                <div className="min-w-0 flex flex-col">
                  <p className="truncate text-[15px] font-semibold text-slate-900">
                    {x.name}
                  </p>
                  <div className="mt-1 text-xs text-slate-600">
                    ৳{Number(x.price).toFixed(2)} each
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:shadow-sm active:scale-95 transition"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={(e) => {
                        e.preventDefault();
                        dec(x.id);
                        keepOpen();
                      }}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>

                    <span className="px-2 py-1 rounded-lg border border-slate-200 bg-white text-xs shadow-inner">
                      {x.qty}
                    </span>

                    <button
                      type="button"
                      className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:shadow-sm active:scale-95 transition"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={(e) => {
                        e.preventDefault();
                        inc(x.id);
                        keepOpen();
                      }}
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right: X at top-right, line total bottom-right */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    type="button"
                    className="text-slate-400 hover:text-red-500 transition"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.preventDefault();
                      remove(x.id);
                      keepOpen();
                    }}
                    aria-label="Remove"
                    title="Remove"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="text-[15px] font-semibold text-slate-900">
                    ৳{(x.qty * Number(x.price)).toFixed(2)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 px-5 pb-5 pt-3 bg-white/80 backdrop-blur-xl">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm text-slate-600">Subtotal</span>
          <span className="text-lg font-bold text-slate-900">
            ৳{subtotal.toFixed(2)}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/checkout"
            className="btn rounded-xl border-slate-200 bg-white hover:bg-slate-50 hover:shadow-sm active:scale-[0.98] transition"
            onClick={close}
          >
            View cart
          </Link>
          <Link
            to="/checkout"
            className="btn group rounded-xl bg-black text-white hover:bg-gray-700 shadow-md hover:shadow-lg active:scale-[0.98] transition"
            onClick={close}
          >
            <span className="inline-flex items-center gap-2">
              Checkout
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ========== MOBILE / TABLET (non-desktop) ========== */}
      <div className="navbar lg:hidden relative z-65">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-70 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/">Homepage</Link>
              </li>
              <li>
                <Link to="/list">Shop</Link>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="navbar-center">
          <Link to="/" className="btn btn-ghost text-xl">
            Sohelia Furniture
          </Link>
        </div>

        <div className="navbar-end flex gap-3">
          {/* Search button */}
          <button
            aria-label="Open search tools"
            className="btn btn-ghost btn-circle ml-1"
            onClick={toggleSearchDrawer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Cart (MOBILE) */}
          <div
            ref={cartRefMobile}
            className={`dropdown dropdown-end ${cartOpenMobile ? "dropdown-open" : ""}`}
          >
            <button
              type="button"
              className="btn btn-ghost btn-circle"
              onClick={() => setCartOpenMobile((v) => !v)}
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">{totalCount}</span>
              </div>
            </button>

            <MiniCart
              keepOpen={() => setCartOpenMobile(true)}
              close={() => setCartOpenMobile(false)}
            />
          </div>

          {/* Profile */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="user avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ========== DRAWER (Search & Filters) ========== */}
      <div className={`drawer ${searchOpen ? "drawer-open" : ""} z-75 shadow-none`}>
        <input
          id="search-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={searchOpen}
          onChange={onDrawerToggle}
        />
        <div className="drawer-content" />
        <div className="drawer-side drawer-end">
          <label htmlFor="search-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="min-h-full w-[350px] bg-base-100 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Search & Filters</h3>
              <button className="btn btn-ghost btn-sm" onClick={toggleSearchDrawer}>
                Close
              </button>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Search products</span>
              </label>
              <div className="join w-full">
                <input
                  type="text"
                  placeholder="e.g. office chair"
                  className="input input-bordered join-item w-full"
                />
                <Link to="/list" className="btn join-item">
                  Go
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Quick Filters</h4>
              <div className="grid grid-cols-2 gap-3">
                <Link className="btn btn-outline btn-sm" to="/view-list?category=Chairs">
                  Chairs
                </Link>
                <Link className="btn btn-outline btn-sm" to="/view-list?category=Tables">
                  Tables
                </Link>
                <Link className="btn btn-outline btn-sm" to="/view-list?category=Sofas">
                  Sofas
                </Link>
                <Link className="btn btn-outline btn-sm" to="/view-list?category=Desks">
                  Desks
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Categories</h4>
              <ul className="menu bg-base-200 rounded-box p-2">
                <li>
                  <Link to="/view-list?category=Sofas">Living Room</Link>
                </li>
                <li>
                  <Link to="/view-list?category=Beds">Bedroom</Link>
                </li>
                <li>
                  <Link to="/view-list?category=Desks">Office</Link>
                </li>
                <li>
                  <Link to="/view-list?category=Outdoor">Outdoor</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ========== DESKTOP NAVBAR ========== */}
      <div className="hidden lg:block">
        <div className="navbar sticky top-0 z-65 bg-base-100/90 backdrop-blur py-5 border-b-0">
          <div className="navbar-start">
            <Link to="/" className="btn btn-ghost text-2xl">
              Sohelia Furniture
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {/* Home Furniture */}
              <li className="relative">
                <div className="text-xl font-bold" onClick={() => toggleDropdown(0)}>
                  Home Furniture
                  <ul
                    className={`absolute left-0 top-full mt-2 p-4 bg-base-100 rounded-box shadow z-70 w-64 h-fit ${openDropdown === 0 ? "block" : "hidden"
                      }`}
                  >
                    <li>
                      <Link to="/view-list?category=Tables">Tables</Link>
                    </li>
                    <li>
                      <Link to="/view-list?category=Chairs">Chairs</Link>
                    </li>
                    <li>
                      <Link to="/view-list?category=Sofas">Sofas</Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Office Furniture */}
              <li className="relative">
                <div className="text-xl font-bold" onClick={() => toggleDropdown(1)}>
                  Office Furniture
                  <ul
                    className={`absolute left-0 top-full mt-2 p-4 bg-base-100 rounded-box shadow z-70 w-64 h-fit ${openDropdown === 1 ? "block" : "hidden"
                      }`}
                  >
                    <li>
                      <Link to="/view-list?category=Desks">Desks</Link>
                    </li>
                    <li>
                      <Link to="/view-list?category=Chairs">Chairs</Link>
                    </li>
                    <li>
                      <Link to="/view-list?category=Shelves">Shelves</Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Academic Furniture */}
              <li className="relative">
                <div className="text-xl font-bold" onClick={() => toggleDropdown(2)}>
                  Academic Furniture
                  <ul
                    className={`absolute left-0 top-full mt-2 p-4 bg-base-100 rounded-box shadow z-70 w-64 h-fit ${openDropdown === 2 ? "block" : "hidden"
                      }`}
                  >
                    <li>
                      <Link to="/view-list?category=Desks">Desks</Link>
                    </li>
                    <li>
                      <Link to="/view-list?category=Chairs">Chairs</Link>
                    </li>
                    <li>
                      <Link to="/view-list?category=Tables">Tables</Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Restaurant Furniture */}
              <li className="relative">
                <div className="text-xl font-bold" onClick={() => toggleDropdown(3)}>
                  Restaurant Furniture
                  <ul
                    className={`absolute left-0 top-full mt-2 p-2 bg-base-100 rounded-box shadow z-70 w-64 h-fit ${openDropdown === 3 ? "block" : "hidden"
                      }`}
                  >
                    <li>
                      <Link to="/view-list?category=Tables">Tables</Link>
                    </li>
                    <li>
                      <Link to="/view-list?category=Sofas">Sofas</Link>
                    </li>
                    <li>
                      <Link to="/view-list?category=Chairs">Chairs</Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          <div className="navbar-end gap-5">
            <div className="lg:flex hidden">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-48 md:w-auto lg:w-auto shrink-2"
              />
            </div>

            {/* Cart (DESKTOP) */}
            <div
              ref={cartRefDesktop}
              className={`dropdown dropdown-end ${cartOpenDesktop ? "dropdown-open" : ""}`}
            >
              <button
                type="button"
                className="btn btn-ghost btn-circle"
                onClick={() => setCartOpenDesktop((v) => !v)}
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">{totalCount}</span>
                </div>
              </button>

              <MiniCart
                keepOpen={() => setCartOpenDesktop(true)}
                close={() => setCartOpenDesktop(false)}
              />
            </div>

            {/* Profile */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="user avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
