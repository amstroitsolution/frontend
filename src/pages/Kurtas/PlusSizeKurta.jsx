import React from "react";
import ProductPage from "../../components/ProductPage/ProductPage";

const PlusSizeKurta = () => {
  return (
    <ProductPage
      category="Plus Size Kurta"
      title="Plus Size Kurtas Collection"
      description="Comfortable and stylish plus size kurtas designed for the perfect fit and maximum confidence."
      productType="PlusSizeKurta"
      apiEndpoint="/api/women-products/active"
    />
  );
};

export default PlusSizeKurta;
