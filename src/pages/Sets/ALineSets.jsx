import React from "react";
import ProductPage from "../../components/ProductPage/ProductPage";

const ALineSets = () => {
  return (
    <ProductPage
      category="A-Line Sets"
      title="A-Line Sets Collection"
      description="Elegant A-line sets with flattering silhouettes perfect for any occasion — from casual to festive."
      productType="ALineSet"
      apiEndpoint="/api/women-products/active"
    />
  );
};

export default ALineSets;
