import React from "react";
import ProductPage from "../../components/ProductPage/ProductPage";

const Jumpsuits = () => {
  return (
    <ProductPage
      category="Jumpsuits"
      title="Jumpsuits Collection"
      description="Modern jumpsuits that combine style and comfort — perfect for contemporary fashion lovers."
      productType="Jumpsuit"
      apiEndpoint="/api/women-products/active"
    />
  );
};

export default Jumpsuits;
