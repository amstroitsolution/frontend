import React from "react";
import ProductPage from "../../components/ProductPage/ProductPage";

const AnarkaliSets = () => {
  return (
    <ProductPage
      category="Anarkali Sets"
      title="✨ The Anarkali Edit ✨"
      description="Timeless silhouettes that dance with grace — our Anarkali collection celebrates elegance, tradition, and modern femininity. Step into a world of royal charm and effortless beauty."
      productType="AnarkaliSet"
      apiEndpoint="/api/women-products/active"
    />
  );
};

export default AnarkaliSets;