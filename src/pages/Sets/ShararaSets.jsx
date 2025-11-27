import React from "react";
import ProductPage from "../../components/ProductPage/ProductPage";

const ShararaSets = () => {
  return (
    <ProductPage
      category="Sharara Sets"
      title="Sharara Sets Collection"
      description="Traditional sharara sets with modern touches — perfect for weddings and festive celebrations."
      productType="ShararaSet"
      apiEndpoint="/api/women-products/active"
    />
  );
};

export default ShararaSets;
