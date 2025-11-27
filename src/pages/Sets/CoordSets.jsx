import React from "react";
import ProductPage from "../../components/ProductPage/ProductPage";

const CoordSets = () => {
  return (
    <ProductPage
      category="Coord Sets"
      title="Coord Sets Collection"
      description="Embrace contemporary elegance with our Coord Sets — versatile, comfortable, and designed to add effortless sophistication to your every day and festive looks."
      productType="CoordSet"
      apiEndpoint="/api/women-products/active"
    />
  );
};

export default CoordSets;
