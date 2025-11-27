import React from "react";
import ProductPage from "../../components/ProductPage/ProductPage";

const Jeggings = () => {
  return (
    <ProductPage
      category="Jeggings"
      title="Jeggings Collection"
      description="Discover comfort redefined — our premium jeggings combine style and flexibility for effortless everyday fashion."
      productType="Jegging"
      apiEndpoint="/api/women-products/active"
    />
  );
};

export default Jeggings;
