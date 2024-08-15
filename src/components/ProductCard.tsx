import React from "react";
import styled from "styled-components";

const ProductImage = styled.img`
    width: 150px;
    height: auto;
`

interface ProductCardProps {
  product: any;
}

export function ProductCard(props: ProductCardProps) {
  const { product } = props;
  return (
    <div className="card">
      <ProductImage src={product.image.url} alt={product.productName} />
      <h2>{product.productName}</h2>
      <p>{product.price.priceIncTax}</p>
    </div>
  );
}
