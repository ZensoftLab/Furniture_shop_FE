import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './views/pages/HomePage';
import ItemDetailsPage from './views/pages/ItemDetailsPage';
import PopularChoice from './views/components/HomePage/PopularChoice';
import AboutUsPage from './views/pages/AboutUsPage';
import ContactUsPage from './views/pages/ContactUsPage';
import ListPage from './views/pages/ListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/popular-choice" element={<PopularChoice />} />
        <Route path="/item/:id" element={<ItemDetailsPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/view-list" element={<ListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
