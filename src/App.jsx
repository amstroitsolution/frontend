import { Routes, Route, useLocation } from "react-router-dom";


// Pages Import
import Home from "./pages/Home/Home";
import Kids from "./pages/Kids/Kids";

// Other pages
import Dresses from "./pages/Dresses/Dresses";
import GownAndDresses from "./pages/Dresses/GownAndDresses";
import InstaSarees from "./pages/Dresses/InstaSarees";
import Jumpsuits from "./pages/Dresses/Jumpsuits";

import Sets from "./pages/Sets/Sets";
import TwoPcsKurtaSets from "./pages/Sets/TwoPcsKurtaSets";
import ThreePcsKurtaSets from "./pages/Sets/ThreePcsKurtaSets";
import AnarkaliSets from "./pages/Sets/AnarkaliSets";
import ALineSets from "./pages/Sets/ALineSets";
import StraightSuitSets from "./pages/Sets/StraightSuitSets";
import ShararaSets from "./pages/Sets/ShararaSets";
import CoordSets from "./pages/Sets/CoordSets";
import PlusSizeSuitSets from "./pages/Sets/PlusSizeSuitSets";

import Bottoms from "./pages/Bottoms/Bottoms";
import TrouserPants from "./pages/Bottoms/TrouserPants";
import SalwarLeggings from "./pages/Bottoms/SalwarLeggings";
import PalazzosCulottes from "./pages/Bottoms/PalazzosCulottes";
import Sharara from "./pages/Bottoms/Sharara";
import Skirts from "./pages/Bottoms/Skirts";
import Jeggings from "./pages/Bottoms/Jeggings";
import PlusSizeBottoms from "./pages/Bottoms/PlusSizeBottoms";

import Kurtas from "./pages/Kurtas/Kurtas";
import ALineKurta from "./pages/Kurtas/ALineKurta";
import StraightKurtas from "./pages/Kurtas/StraightKurtas";
import FlaredKurtas from "./pages/Kurtas/FlaredKurtas";
import AsymmetricalKurta from "./pages/Kurtas/AsymmetricalKurta";
import WinterKurta from "./pages/Kurtas/WinterKurta";
import PlusSizeKurta from "./pages/Kurtas/PlusSizeKurta";

import Wedding from "./pages/Wedding/Wedding";
import BridalLehengas from "./pages/Wedding/BridalLehengas";
import SilkSarees from "./pages/Wedding/SilkSarees";
import CottonSarees from "./pages/Wedding/CottonSarees";
import DesignerSarees from "./pages/Wedding/DesignerSarees";
import PartyWearLehengas from "./pages/Wedding/PartyWearLehengas";

import About from "./pages/About/About";
import Gallery from "./pages/Gallery/Gallery";
import Contact from "./pages/Contact/Contact";

// Components
import Navbar from "./components/Navbar/Navbar";
import KidsNav from "./components/Kids/KidsNav";
import Footer from "./components/Footer/Footer";
import KidsEthinics from "./pages/KidsEthinic/KidsEthinics";
import SareeAnarkali from "./pages/KidsEthinic/SareeAnarkali";
import PlazoSharara from "./pages/KidsEthinic/PlazoSharara";
import PaintSalwar from "./pages/KidsEthinic/PaintSalwar";
import LehngasGhagra from "./pages/KidsEthinic/LehngasGhagra";
import KurtiesJumsuit from "./pages/KidsEthinic/KurtiesJumsuit";
import DhotiesPatiala from "./pages/KidsEthinic/DhotiesPatiala";
import Gowns from "./pages/KidsEthinic/Gowns";

import EthicJacket from "./pages/KidsBoys/EthicJacket";
import EthicStes from "./pages/KidsBoys/EthicStes";

import Kurtaa from "./pages/KidsBoys/Kurtaa";
import KurtaSherwani from "./pages/KidsBoys/KurtaSherwani";
import BodySuite from "./pages/KidsBoys/BodySuite";
import Infabt from "./pages/KidsBoys/Infabt";
import Jhablas from "./pages/KidsBoys/Jhablas";
import Swadless from "./pages/KidsBoys/Swadless";
import NewArrivle from "./pages/KidsBoys/NewArrivle";
import BouWeddings from "./pages/KidsBoys/BouWeddings";
import JumSuite from "./pages/KidsEthinic/JumSuite";
import GirlSets from "./pages/KidsEthinic/GirlSets";
import GirlDresses from "./pages/KidsEthinic/GirlDresses";
import GirlNewArrivle from "./pages/KidsEthinic/GirlNewArrivle";
import GirlWedding from "./pages/KidsEthinic/GirlWedding";



export default function App() {
  const location = useLocation();

  // Route ke hisaab se correct navbar select karo
  let CurrentNav;
  if (location.pathname.startsWith("/kids")) {
    CurrentNav = KidsNav;
  } else {
    CurrentNav = Navbar; // default: Home / Women
  }

  return (
    <>


      {/* Fixed Navbar */}
      <div className="w-full fixed top-0 z-50">
        <CurrentNav />
      </div>

      {/* Content padding: Navbar height */}
      <div className="pt-[64px]">
        <Routes>
          {/* Woman / Home (default) */}
          <Route path="/" element={<Home />} />

          {/* Kids */}
          <Route path="/kids" element={<Kids />} />

          {/* Dresses */}
          <Route path="/dresses" element={<Dresses />} />
          <Route path="/dresses/gown-and-dresses" element={<GownAndDresses />} />
          <Route path="/dresses/insta-sarees" element={<InstaSarees />} />
          <Route path="/dresses/jumpsuits" element={<Jumpsuits />} />

          {/* Sets */}
          <Route path="/sets" element={<Sets />} />
          <Route path="/sets/2pcs-kurta-sets" element={<TwoPcsKurtaSets />} />
          <Route path="/sets/3pcs-kurta-sets" element={<ThreePcsKurtaSets />} />
          <Route path="/sets/anarkali-sets" element={<AnarkaliSets />} />
          <Route path="/sets/a-line-sets" element={<ALineSets />} />
          <Route path="/sets/straight-suit-sets" element={<StraightSuitSets />} />
          <Route path="/sets/sharara-sets" element={<ShararaSets />} />
          <Route path="/sets/coord-sets" element={<CoordSets />} />
          <Route path="/sets/plus-size-suit-sets" element={<PlusSizeSuitSets />} />

          {/* Bottoms */}
          <Route path="/bottoms" element={<Bottoms />} />
          <Route path="/bottoms/trouser-pants" element={<TrouserPants />} />
          <Route path="/bottoms/salwar-leggings" element={<SalwarLeggings />} />
          <Route path="/bottoms/palazzos-culottes" element={<PalazzosCulottes />} />
          <Route path="/bottoms/sharara" element={<Sharara />} />
          <Route path="/bottoms/skirts" element={<Skirts />} />
          <Route path="/bottoms/jeggings" element={<Jeggings />} />
          <Route path="/bottoms/plus-size-bottoms" element={<PlusSizeBottoms />} />

          {/* Kurtas */}
          <Route path="/kurtas" element={<Kurtas />} />
          <Route path="/kurtas/a-line-kurta" element={<ALineKurta />} />
          <Route path="/kurtas/straight-kurtas" element={<StraightKurtas />} />
          <Route path="/kurtas/flared-kurtas" element={<FlaredKurtas />} />
          <Route path="/kurtas/asymmetrical-kurta" element={<AsymmetricalKurta />} />
          <Route path="/kurtas/winter-kurta" element={<WinterKurta />} />
          <Route path="/kurtas/plus-size-kurta" element={<PlusSizeKurta />} />

          {/* Others */}


          {/* Kids Section pages  */}
          <Route path="/kids/ethinics" element={<KidsEthinics />} />
          <Route path="/kids/sareeanarkali" element={<SareeAnarkali />} />
          <Route path="/kids/plazosharara" element={<PlazoSharara />} />
          <Route path="/kids/paintsalwar" element={<PaintSalwar />} />
          <Route path="/kids/lehngaghagra" element={<LehngasGhagra />} />
          <Route path="/kids/kurtiesjums" element={<KurtiesJumsuit />} />
          <Route path="/kids/dhotiespatiala" element={<DhotiesPatiala />} />
          <Route path="/kids/Gowns" element={<Gowns />} />


          {/* kids Boys */}
          <Route path="/kids/ethicjacket" element={<EthicJacket />} />
          <Route path="/kids/ethicsets" element={<EthicStes />} />
          <Route path="/kids/kurtaa" element={<Kurtaa />} />
          <Route path="/kids/kurtasherwani" element={<KurtaSherwani />} />
          <Route path="/kids/jumpsuite" element={<JumSuite />} />
          <Route path="/kids/sets" element={<GirlSets />} />
          <Route path="/kids/girldresses" element={<GirlDresses />} />
          <Route path="/kids/girlnew" element={<GirlNewArrivle />} />
          <Route path="/kids/girlwedding" element={<GirlWedding />} />


          <Route path="/kids/bodysuite" element={<BodySuite />} />
          <Route path="/kids/inflant" element={<Infabt />} />
          <Route path="/kids/jhablas" element={<Jhablas />} />
          <Route path="/kids/swadless" element={<Swadless />} />

          <Route path="/kids/newarrivle" element={<NewArrivle />} />
          <Route path="/kids/weddings" element={<BouWeddings />} />











          <Route path="/wedding" element={<Wedding />} />
          <Route path="/wedding/bridal-lehengas" element={<BridalLehengas />} />
          <Route path="/wedding/silk-sarees" element={<SilkSarees />} />
          <Route path="/wedding/cotton-sarees" element={<CottonSarees />} />
          <Route path="/wedding/designer-sarees" element={<DesignerSarees />} />
          <Route path="/wedding/party-wear-lehengas" element={<PartyWearLehengas />} />
          
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />

        </Routes>

      </div>

      {/* Footer - appears on all pages */}
      <Footer />
    </>
  );
}
