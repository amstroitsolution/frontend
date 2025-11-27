import React from "react";
import ProductPage from "../../components/ProductPage/ProductPage";

const FlaredKurtas = () => {
  return (
    <ProductPage
      category="Flared Kurtas"
      title="Flared Kurtas Collection"
      description="Graceful flared kurtas that add elegance and movement to your ethnic wardrobe — perfect for festive occasions."
      productType="FlaredKurta"
      apiEndpoint="/api/women-products/active"
    />
  );
};

export default FlaredKurtas;
