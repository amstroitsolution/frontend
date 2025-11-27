import React from "react";
import ProductPage from "../../components/ProductPage/ProductPage";

const GownAndDresses = () => {
  return (
    <ProductPage
      category="Gown & Dresses"
      title="Gowns & Dresses Collection"
      description="Where every fold of fabric tells your story of confidence & beauty. Discover stunning gowns and dresses that blend comfort, luxury, and artistry."
      productType="GownDress"
      apiEndpoint="/api/women-products/active"
    />
  );
};

export default GownAndDresses;