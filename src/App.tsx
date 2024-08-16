import { useState } from "react";
import "./App.css";
import axios from "axios";
import { Button, Grid, styled } from "@mui/material";
import { ProductCard } from "./components/ProductCard";
import { ColourOption, FilterByColour } from "./components/FilterByColour";
import _ from "lodash";
import { getColourOptions } from "./utils";

export interface SelectedColourOption {
  identifier: string;
  value: string;
}

const StyledButton = styled(Button)`
  background-color: white;
  margin: 8px;
  color: #242424;
  &:hover {
    background-color: #646464;
  }
`;

function App() {
  const [products, setProducts] = useState<any[]>();
  const [colourOptions, setColourOptions] = useState<any[]>([]);
  const [productType, setProductType] = useState("");
  const productTypes = [
    "tiles",
    "toilets",
    "showers",
    "baths",
    "basins",
    "taps",
  ];
  const handleClickGetProducts = (
    product: string,
    colourOption?: ColourOption,
  ) => {
    setProductType(product);
    setColourOptions([]);
    fetch(product, colourOption);
  };

  const fetch = (product: string, colourOption?: ColourOption) => {
    let query: any = {
      query: product,
      pageNumber: 0,
      size: 0,
      additionalPages: 0,
      sort: 1,
    };
    if (colourOption) {
      query = {
        query: product,
        pageNumber: 0,
        size: 0,
        additionalPages: 0,
        sort: 1,
        facets: {
          colour: [
            {
              identifier: colourOption?.identifier,
              value: colourOption?.value,
            },
          ],
        },
      };
    }
    axios
      .post(
        "https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI",

        {
          ...query,
        },
      )
      .then(function (response) {
        setProducts(response.data.products);

        const colourOptionsFromResponse = getColourOptions(response.data);
        setColourOptions(colourOptionsFromResponse);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4} md={2}>
          <FilterByColour
            colourOptions={colourOptions}
            fetch={handleClickGetProducts}
            productType={productType}
          />
        </Grid>
        <Grid container item xs={8} md={10}>
          <Grid item xs={12} textAlign="left">
            <h2>What would you like to look at?</h2>
            {productTypes.map((product) => (
              <StyledButton
                key={product}
                onClick={() => handleClickGetProducts(product)}
              >
                {product.charAt(0).toUpperCase() + product.slice(1)}
              </StyledButton>
            ))}
          </Grid>

          <Grid container spacing={2}>
            <Grid container item xs={12} spacing={2}>
              {products &&
                products.map((product: any) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} alignItems="stretch">
                      <ProductCard product={product} />
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
