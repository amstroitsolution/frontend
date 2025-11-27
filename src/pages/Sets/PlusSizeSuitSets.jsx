import React from "react";
import ProductPage from "../../components/ProductPage/ProductPage";

const PlusSizeSuitSets = () => {
  return (
    <ProductPage
      category="Plus Size Suit Sets"
      title="Plus Size Suit Sets Collection"
      description="Beautifully designed plus size suit sets for the perfect fit and ultimate comfort."
      productType="PlusSizeSuitSet"
      apiEndpoint="/api/women-products/active"
    />
  );
};

export default PlusSizeSuitSets;
