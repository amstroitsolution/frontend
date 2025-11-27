import React from "react";
import ProductPage from "../../components/ProductPage/ProductPage";

const PalazzosCulottes = () => {
  return (
    <ProductPage
      category="Palazzos & Culottes"
      title="Palazzos & Culottes Collection"
      description="Trendy palazzos and culottes for a chic and comfortable contemporary look."
      productType="PalazzoCulotte"
      apiEndpoint="/api/women-products/active"
    />
  );
};

export default PalazzosCulottes;
