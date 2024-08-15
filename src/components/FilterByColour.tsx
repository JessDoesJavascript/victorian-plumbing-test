import { Button, Checkbox } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { SelectedColourOption } from "../App";

export interface ColourOption {
  identifier: string;
  value: string;
  displayValue: string;
  productCount: number;
  priority: number;
}
interface FilterByColourProps {
  colourOptions?: ColourOption[];
  fetchWithColours: (product: string, colourOption?: ColourOption) => void;
  productType: string;
}

export function FilterByColour(props: FilterByColourProps) {
  const { colourOptions, fetchWithColours, productType } = props;
  const handleColourClick = (colourOption: ColourOption) => {
    fetchWithColours(productType, colourOption);
  };
  if (colourOptions?.length === 0) return null;
  return (
    <div>
      <h3>Filter by Colour</h3>
      <ul>
        {colourOptions?.map((option) => (
          <li key={option.identifier}>
            <button onClick={() => handleColourClick(option)}>
              {option.displayValue}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
