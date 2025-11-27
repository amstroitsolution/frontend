import React from "react";
import ProductPage from "../../components/ProductPage/ProductPage";

const ThreePcsKurtaSets = () => {
  return (
    <ProductPage
      category="3 Pcs Kurta Sets"
      title="3 Piece Kurta Sets Collection"
      description="Complete 3-piece kurta sets with kurta, bottom, and dupatta for a coordinated ethnic look."
      productType="ThreePcsKurtaSet"
      apiEndpoint="/api/women-products/active"
    />
  );
};

export default ThreePcsKurtaSets;
