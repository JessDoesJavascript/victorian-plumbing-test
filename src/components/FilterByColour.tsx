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
}

export function FilterByColour(props: FilterByColourProps) {
  const [selectedColours, setSelectedColours] = useState<
    SelectedColourOption[]
  >([]);
  const { colourOptions } = props;
  const handleCheckboxChecked = (e: any) => {
    setSelectedColours((prevItems) => [...prevItems, ...e.target.value]);
    console.log(e)
    console.log(selectedColours);
  };

  return (
    <div>
      <h3>Filter by Colour</h3>
      <ul>
        {colourOptions.map((option) => (
          <li key={option.identifier}>
            <Checkbox
              value={{ identifier: option.identifier, value: option.value }}
              id={option.identifier}
              onChange={(e:any) => handleCheckboxChecked(e)}
            />
            <label htmlFor={option.identifier}>{option.displayValue}</label>
          </li>
        ))}
      </ul>
      {/* <Button onClick={() => searchForSelectedColours()}>Search</Button> */}
    </div>
  );
}
