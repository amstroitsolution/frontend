import React from "react";
import ProductPage from "../../components/ProductPage/ProductPage";

const Skirts = () => {
  return (
    <ProductPage
      category="Skirts"
      title="Skirts Collection"
      description="Versatile skirts in various styles and lengths for every occasion and season."
      productType="Skirt"
      apiEndpoint="/api/women-products/active"
    />
  );
};

export default Skirts;
