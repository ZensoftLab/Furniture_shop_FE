// // src/App.jsx
// import { useEffect } from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import HomePage from './views/pages/HomePage'
// import ItemDetailsPage from './views/pages/ItemDetailsPage'
// import PopularChoice from './views/components/HomePage/PopularChoice'
// import AboutUsPage from './views/pages/AboutUsPage'
// import ContactUsPage from './views/pages/ContactUsPage'
// import ListPage from './views/pages/ListPage'

// // One-time light enforcement (main.jsx already locks globally)
// function LightModeOnce() {
//   useEffect(() => {
//     const html = document.documentElement
//     html.classList.remove('dark')
//     html.setAttribute('data-theme', 'light')
//   }, [])
//   return null
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <LightModeOnce />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/popular-choice" element={<PopularChoice />} />
//         <Route path="/item/:id" element={<ItemDetailsPage />} />
//         <Route path="/about-us" element={<AboutUsPage />} />
//         <Route path="/contact-us" element={<ContactUsPage />} />
//         <Route path="/view-list" element={<ListPage />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }



import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './views/pages/HomePage'
import ItemDetailsPage from './views/pages/ItemDetailsPage'
import PopularChoice from './views/components/HomePage/PopularChoice'
import AboutUsPage from './views/pages/AboutUsPage'
import ContactUsPage from './views/pages/ContactUsPage'
import ListPage from './views/pages/ListPage'
import CheckoutPage from './views/pages/CheckoutPage'
import { CartProvider } from './views/components/Context/CartContext'
import PaymentPage from './views/pages/PaymentPage'


function LightModeOnce() {
  useEffect(() => {
    const html = document.documentElement
    html.classList.remove('dark')
    html.setAttribute('data-theme', 'light')
  }, [])
  return null
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <LightModeOnce />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/popular-choice" element={<PopularChoice />} />
          <Route path="/item/:id" element={<ItemDetailsPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/view-list" element={<ListPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}
