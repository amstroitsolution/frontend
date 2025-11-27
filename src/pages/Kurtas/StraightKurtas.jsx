import React from "react";
import ProductPage from "../../components/ProductPage/ProductPage";

const StraightKurtas = () => {
  return (
    <ProductPage
      category="Straight Kurtas"
      title="Straight Kurtas Collection"
      description="Discover timeless straight kurtas that blend minimal elegance and modern comfort — perfect for everyday wear or chic casual outings."
      productType="StraightKurta"
      apiEndpoint="/api/women-products/active"
    />
  );
};

export default StraightKurtas;
