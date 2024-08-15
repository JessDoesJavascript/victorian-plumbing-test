import { Button, Checkbox } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { SelectedColourOption } from "../App";

interface ColourOptionsProps {
  identifier: string;
  value: string;
  displayValue: string;
  productCount: number;
  priority: number;
}
interface FilterByColourProps {
  colourOptions: ColourOptionsProps[];
  fetchWithColours: (product: string, colourOptions?: SelectedColourOption[]) => void;
  productType: string
}

export function FilterByColour(props: FilterByColourProps) {

  const { colourOptions, fetchWithColours, productType } = props;
  const handleColourClick = (colourOption: SelectedColourOption) => {
    fetchWithColours(productType, [colourOption]);
  };

  return (
    <div>
      <h3>Filter by Colour</h3>
      <ul>
        {colourOptions.map((option) => (
          <li key={option.identifier}>
          
            <button onClick={() => handleColourClick(option)}>{option.displayValue}</button>
          </li>
        ))}
      </ul>
    
    </div>
  );
}
