import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ListArtisans from "../pages/ListArtisans";
import ArtisanDetail from "../pages/ArtisanDetail";
import MentionsLegales from "../pages/MentionsLegales";
import PolitiqueConfidentialite from "../pages/PolitiqueConfidentialite";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artisans" element={<ListArtisans />} />
        <Route path="/artisans/:id" element={<ArtisanDetail />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}