import React from "react";
import ProductPage from "../../components/ProductPage/ProductPage";

const StraightSuitSets = () => {
  return (
    <ProductPage
      category="Straight Suit Sets"
      title="Straight Suit Sets Collection"
      description="Classic straight suit sets combining elegance and comfort for everyday ethnic wear."
      productType="StraightSuitSet"
      apiEndpoint="/api/women-products/active"
    />
  );
};

export default StraightSuitSets;
