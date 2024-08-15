import { useState } from "react";
import "./App.css";
import axios from "axios";
import { Button, Grid } from "@mui/material";
import { ProductCard } from "./components/ProductCard";
import { FilterByColour } from "./components/FilterByColour";
import _ from "lodash";
import { getColourOptions } from "./utils";

export interface SelectedColourOption {
  identifier: string;
  value: string;
}

function App() {
  const [products, setProducts] = useState<any[]>();
  const [colourOptions, setColourOptions] = useState<any[]>([]);

  const [productType, setProductType] = useState("");
  const [colour, setColour] = useState();

  const handleClickGetProducts = (e: any) => {
    console.log(e);
    setProductType(e.target.textContent);
    fetch(e.target.textContent);
  };

  const fetch = (product: string, colourOptions?: SelectedColourOption[]) => {
    const query: any = {
      query: product,
      pageNumber: 0,
      size: 0,
      additionalPages: 0,
      sort: 1,
    };
    if (colourOptions) {
      query.facets = { 
        colour: colourOptions
      }
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
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  return (
    <>
      <Button onClick={(e: any) => handleClickGetProducts(e)}>tiles</Button>
      <Grid container>
        <Grid item xs={2}>
          <FilterByColour
            colourOptions={colourOptions}
            fetchWithColours={fetch}
            productType={productType}
          />
        </Grid>
        <Grid container item xs={10}>
          {products &&
            products.map((product: any) => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <ProductCard product={product} />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </>
  );
}

export default App;
