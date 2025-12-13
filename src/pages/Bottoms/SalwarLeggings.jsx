import React from "react";
import ProductPage from "../../components/ProductPage/ProductPage";

const SalwarLeggings = () => {
  return (
    <ProductPage
      category="Salwar & Leggings"
      title="Salwar & Leggings Collection"
      description="Comfortable salwars and leggings that pair perfectly with your favorite kurtas and tops."
      productType="SalwarLegging"
      apiEndpoint="/api/women-products/active"
    />
  );
};

export default SalwarLeggings;
