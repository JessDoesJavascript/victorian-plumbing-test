import React, { useState } from "react";
import styled from "styled-components";

const ListContainer = styled.ul`
  list-style: none;
  text-align: left;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  li {
    width: 100%;
    button {
      width: 100%;
      margin: 4px;
    }
  }
`;

export interface ColourOption {
  identifier: string;
  value: string;
  displayValue: string;
  productCount: number;
  priority: number;
}
interface FilterByColourProps {
  colourOptions?: ColourOption[];
  fetch: (product: string, colourOption?: ColourOption) => void;
  productType: string;
}

export function FilterByColour(props: FilterByColourProps) {
  const [colourSelected, setColourSelected] = useState<ColourOption>();
  const { colourOptions, fetch, productType } = props;
  const handleColourClick = (colourOption: ColourOption) => {
    setColourSelected(colourOption);
    fetch(productType, colourOption);
  };

  const handleClear = () => {
    setColourSelected(undefined);
    fetch(productType);
  };
  if (colourOptions?.length === 0) return null;
  return (
    <div>
      <h3>Filter by Colour</h3>
      <ListContainer>
        {colourSelected && (
          <>
            <button onClick={() => handleClear()}> Clear selection </button>
            <button onClick={() => handleClear()}>
              X {colourSelected.displayValue}
            </button>
          </>
        )}

        {!colourSelected && (
          <>
            {colourOptions?.map((option) => (
              <li key={option.identifier}>
                <button onClick={() => handleColourClick(option)}>
                  {option.displayValue}
                </button>
              </li>
            ))}
          </>
        )}
      </ListContainer>
    </div>
  );
}
