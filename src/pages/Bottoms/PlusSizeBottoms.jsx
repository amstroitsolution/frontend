import React from "react";
import ProductPage from "../../components/ProductPage/ProductPage";

const PlusSizeBottoms = () => {
  return (
    <ProductPage
      category="Plus Size Bottoms"
      title="Plus Size Bottoms Collection"
      description="Comfortable and stylish plus size bottoms designed for the perfect fit."
      productType="PlusSizeBottom"
      apiEndpoint="/api/women-products/active"
    />
  );
};

export default PlusSizeBottoms;
