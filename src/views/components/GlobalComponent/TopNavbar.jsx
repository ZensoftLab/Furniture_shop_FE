import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function TopNavbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  // Sync drawer checkbox with state (so overlay click closes it)
  const onDrawerToggle = (e) => setSearchOpen(e.target.checked);
  const toggleSearchDrawer = () => setSearchOpen((v) => !v);

  // Prevent body scroll when drawer is open (nice UX)
  useEffect(() => {
    if (searchOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [searchOpen]);

  // State to track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState(null);

  // Handler to toggle the dropdown
  const toggleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null); // If the same dropdown is clicked, close it
    } else {
      setOpenDropdown(index); // Otherwise, open the clicked dropdown
    }
  };

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
              <li><a>Homepage</a></li>
              <li><a>Portfolio</a></li>
              <li><a>About</a></li>
            </ul>
          </div>
        </div>

        <div className="navbar-center">
          <Link to="/" className="btn btn-ghost text-xl">Sohelia Furniture</Link>
        </div>

        {/* ========== Search Button, Cart, and Profile added to navbar-end for mobile version ========== */}
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

          {/* Cart */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
            <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
              <div className="card-body">
                <span className="text-lg font-bold">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">View cart</button>
                </div>
              </div>
            </div>
          </div>

          {/* Profile */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
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
          <label
            htmlFor="search-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="min-h-full w-[350px] bg-base-100 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Search & Filters</h3>
              <button
                className="btn btn-ghost btn-sm"
                onClick={toggleSearchDrawer}
              >
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
                <button className="btn join-item">Go</button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Quick Filters</h4>
              <div className="grid grid-cols-2 gap-3">
                <button className="btn btn-outline btn-sm">New Arrivals</button>
                <button className="btn btn-outline btn-sm">On Sale</button>
                <button className="btn btn-outline btn-sm">Chairs</button>
                <button className="btn btn-outline btn-sm">Tables</button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Price Range</h4>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="input input-bordered input-sm w-24"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="input input-bordered input-sm w-24"
                />
                <button className="btn btn-sm">Apply</button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Categories</h4>
              <ul className="menu bg-base-200 rounded-box p-2">
                <li><a>Living Room</a></li>
                <li><a>Bedroom</a></li>
                <li><a>Office</a></li>
                <li><a>Outdoor</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ========== DESKTOP NAVBAR ========== */}
      <div className="hidden lg:block">
        <div className="navbar sticky top-0 z-65 bg-base-100/90 backdrop-blur py-5 border-b-0">
          <div className="navbar-start">
            <Link to="/" className="btn btn-ghost text-2xl">Sohelia Furniture</Link>
          </div>

          {/* Keep the original menu here */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {/* Each li is relative so submenu (absolute) positions correctly and stays above hero */}
              <li className="relative">
                <div
                  className="text-xl font-bold"
                  onClick={() => toggleDropdown(0)}
                >
                  Home Furniture
                  <ul className={`absolute left-0 top-full mt-2 p-4 bg-base-100 rounded-box shadow z-70 w-64 h-fit ${openDropdown === 0 ? "block" : "hidden"}`}>
                    <li><a>Table</a></li>
                    <li><a>Chair</a></li>
                  </ul>
                </div>
              </li>

              <li className="relative">
                <div
                  className="text-xl font-bold"
                  onClick={() => toggleDropdown(1)}
                >
                  Office Furniture
                  <ul className={`absolute left-0 top-full mt-2 p-4 bg-base-100 rounded-box shadow z-70 w-64 h-fit ${openDropdown === 1 ? "block" : "hidden"}`}>
                    <li><a>Bench</a></li>
                    <li><a>Office Chair</a></li>
                  </ul>
                </div>
              </li>

              <li className="relative">
                <div
                  className="text-xl font-bold"
                  onClick={() => toggleDropdown(2)}
                >
                  Academic Furniture
                  <ul className={`absolute left-0 top-full mt-2 p-4 bg-base-100 rounded-box shadow z-70 w-64 h-fit ${openDropdown === 2 ? "block" : "hidden"}`}>
                    <li><a>Combo Chair</a></li>
                    <li><a>Classroom sit</a></li>
                  </ul>
                </div>
              </li>

              <li className="relative">
                <div
                  className="text-xl font-bold"
                  onClick={() => toggleDropdown(3)}
                >
                  Restaurant Furniture
                  <ul className={`absolute left-0 top-full mt-2 p-2 bg-base-100 rounded-box shadow z-70 w-64 h-fit ${openDropdown === 3 ? "block" : "hidden"}`}>
                    <li><a>Dinning Table</a></li>
                    <li><a>Sofa</a></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          <div className="navbar-end gap-5">
            {/* Search input added to navbar-end in desktop mode */}
            <div className="lg:flex hidden">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-48 md:w-auto lg:w-auto shrink-2"
              />
            </div>

            {/* Cart */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </div>
              <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                <div className="card-body">
                  <span className="text-lg font-bold">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">View cart</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
