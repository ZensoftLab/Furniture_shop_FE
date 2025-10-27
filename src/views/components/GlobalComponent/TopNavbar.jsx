import React, { useState, useEffect } from "react";

export default function TopNavbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  // sync drawer checkbox with state (so overlay click closes it)
  const onDrawerToggle = (e) => setSearchOpen(e.target.checked);
  const toggleSearchDrawer = () => setSearchOpen((v) => !v);

  // prevent body scroll when drawer is open (nice UX)
  useEffect(() => {
    if (searchOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [searchOpen]);

  return (
    <>
      {/* ========== MOBILE / TABLET (non-desktop) ========== */}
      <div className="navbar lg:hidden relative z-[65]">
        <div className="navbar-start">
          {/* Mobile left: hamburger dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[70] mt-3 w-52 p-2 shadow"
            >
              <li><a>Homepage</a></li>
              <li><a>Portfolio</a></li>
              <li><a>About</a></li>
            </ul>
          </div>
        </div>

        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">Sohelia Furniture</a>
        </div>

        <div className="navbar-end">
          {/* Search button on mobile */}
          <button
            aria-label="Open search tools"
            className="btn btn-ghost btn-circle ml-1"
            onClick={toggleSearchDrawer}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* ========== DRAWER (Search & Filters) ========== */}
      <div className={`drawer ${searchOpen ? "drawer-open" : ""} z-[75] shadow-none`}>
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
              <button className="btn btn-ghost btn-sm" onClick={toggleSearchDrawer}>Close</button>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Search products</span>
              </label>
              <div className="join w-full">
                <input type="text" placeholder="e.g. office chair" className="input input-bordered join-item w-full" />
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
                <input type="number" placeholder="Min" className="input input-bordered input-sm w-24" />
                <span>-</span>
                <input type="number" placeholder="Max" className="input input-bordered input-sm w-24" />
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
        <div className="navbar sticky top-0 z-[65] bg-base-100/90 backdrop-blur py-5 border-b-0">
          <div className="navbar-start">
            <a className="btn btn-ghost text-2xl">Sohelia Furniture</a>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {/* Each li is relative so submenu (absolute) positions correctly and stays above hero */}
              <li className="relative">
                <details>
                  <summary className="text-xl font-bold">Home Furniture</summary>
                  <ul className="absolute left-0 top-full mt-2 p-2 bg-base-100 rounded-box shadow z-[70]">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                  </ul>
                </details>
              </li>

              <li className="relative">
                <details>
                  <summary className="text-xl font-bold">Office Furniture</summary>
                  <ul className="absolute left-0 top-full mt-2 p-2 bg-base-100 rounded-box shadow z-[70]">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                  </ul>
                </details>
              </li>

              <li className="relative">
                <details>
                  <summary className="text-xl font-bold">Academic Furniture</summary>
                  <ul className="absolute left-0 top-full mt-2 p-2 bg-base-100 rounded-box shadow z-[70]">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                  </ul>
                </details>
              </li>

              <li className="relative">
                <details>
                  <summary className="text-xl font-bold">Restaurant Furniture</summary>
                  <ul className="absolute left-0 top-full mt-2 p-2 bg-base-100 rounded-box shadow z-[70]">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>

          <div className="navbar-end gap-5">
            <button onClick={toggleSearchDrawer} className="btn btn-ghost btn-circle" aria-label="Open search tools">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
