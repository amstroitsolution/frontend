import React from "react";
import ProductPage from "../../components/ProductPage/ProductPage";

const AsymmetricalKurta = () => {
  return (
    <ProductPage
      category="Asymmetrical Kurta"
      title="Asymmetrical Kurtas Collection"
      description="Explore contemporary asymmetrical kurtas with unique cuts and modern silhouettes for a bold fashion statement."
      productType="AsymmetricalKurta"
      apiEndpoint="/api/women-products/active"
    />
  );
};

export default AsymmetricalKurta;
