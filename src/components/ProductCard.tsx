import { Card, Stack } from "@mui/material";
import React from "react";
import styled from "styled-components";

const ProductCardContainer = styled(Card)`
  padding: 0px;
  width: 100%;
  height: 100%;

`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
`;
const ProductName = styled.p`
  letter-spacing: 0px;
  font-weight: 700;
  margin: 0;
`;
const Category = styled.p`
  letter-spacing: 0px;
  font-weight: 500;
    margin: 0;
    opacity: 0.8;
`;

const Price = styled.p`
  font-weight: 700;
  color: #ad262f;
  font-size: 24px;
`;
const PreviousPrice = styled.p`
  text-decoration: line-through;
`;
interface ProductCardProps {
  product: any;
}

export function ProductCard(props: ProductCardProps) {
  const { product } = props;
  return (
    <ProductCardContainer className="card">
      <ProductImage
        loading="lazy"
        src={product.image.url}
        alt={product.productName}
      />
      <Stack
        spacing={2}
        textAlign="left"
        padding="8px"
        height="200px"
        justifyContent="space-between"
      >
        <Stack spacing={0}>
          <ProductName>{product.productName}</ProductName>
          <Category>{product.defaultCategory.name}</Category>
        </Stack>
        <Stack direction="row" alignItems="baseline" spacing={1}>
          <Price>£{product.price.priceIncTax}</Price>
          {product.price.isOnPromotion && (
            <PreviousPrice>was £{product.price.wasPriceIncTax}</PreviousPrice>
          )}
        </Stack>
      </Stack>
    </ProductCardContainer>
  );
}
