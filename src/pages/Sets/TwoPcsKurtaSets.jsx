import React from "react";
import ProductPage from "../../components/ProductPage/ProductPage";

const TwoPcsKurtaSets = () => {
  return (
    <ProductPage
      category="2 Pcs Kurta Sets"
      title="2 Piece Kurta Sets Collection"
      description="Convenient 2-piece kurta sets with kurta and bottom for easy styling and comfort."
      productType="TwoPcsKurtaSet"
      apiEndpoint="/api/women-products/active"
    />
  );
};

export default TwoPcsKurtaSets;
