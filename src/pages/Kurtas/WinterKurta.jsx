import React from "react";
import ProductPage from "../../components/ProductPage/ProductPage";

const WinterKurta = () => {
  return (
    <ProductPage
      category="Winter Kurta"
      title="Winter Kurtas Collection"
      description="Cozy winter kurtas in warm fabrics and rich colors — stay stylish and comfortable all season long."
      productType="WinterKurta"
      apiEndpoint="/api/women-products/active"
    />
  );
};

export default WinterKurta;
