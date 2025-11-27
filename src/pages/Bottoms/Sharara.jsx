import React from "react";
import ProductPage from "../../components/ProductPage/ProductPage";

const Sharara = () => {
  return (
    <ProductPage
      category="Sharara"
      title="Sharara Collection"
      description="Elegant shararas with flowing silhouettes perfect for festive occasions and celebrations."
      productType="Sharara"
      apiEndpoint="/api/women-products/active"
    />
  );
};

export default Sharara;
