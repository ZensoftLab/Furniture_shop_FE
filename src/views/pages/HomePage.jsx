import TopNavbar from "../components/GlobalComponent/TopNavbar";
import HeroSection from "../components/HomePage/HeroSection";
import ReliabilitySection from "../components/HomePage/ReliabilitySection";
import Footer from "../components/GlobalComponent/Footer";
import Category from "../components/HomePage/Category";
import PopularChoice from "../components/HomePage/PopularChoice";
import NewProductList from "../components/HomePage/NewProductList";
import CustomerReview from "../components/HomePage/CustomerReview";

function HomePage() {
  return (
    <>
      {/* Keep navbar on top of hero; allow menus to overflow */}
      <div className="relative z-[60] overflow-visible lg:px-[60px]">
        <TopNavbar />
      </div>

      {/* Hero sits below the navbar in stacking order */}
      <HeroSection />

      <div className="lg:px-[60px] my-10">
        <ReliabilitySection />
      </div>

      <div className="lg:px-[60px]">
        <Category />
        <PopularChoice />
        <NewProductList />
        <CustomerReview />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
