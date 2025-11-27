import React from "react";
import ProductPage from "../../components/ProductPage/ProductPage";

const Dresses = () => {
  return (
    <ProductPage
      category="Dresses"
      title="Dresses Collection"
      description="Stylish dresses for every occasion — from casual day wear to elegant evening looks."
      productType="Dress"
      apiEndpoint="/api/women-products/active"
    />
  );
};

export default Dresses;
