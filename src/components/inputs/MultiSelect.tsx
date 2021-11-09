import React from "react";
import Select from "react-select";
import { SelectComponentsProps } from "react-select/src/Select";

export interface Option {
  label: string;
  value: number;
}

interface MultiSelectProps extends SelectComponentsProps {
  options: Option[];
}

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    minWidth: 200,
    maxWidth: 300,
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    color: "black",
    minWidth: 200,
    maxWidth: 300,
  }),
};

const MultiSelect = ({ options, ...rest }: MultiSelectProps) => {

  return (
    <Select
      isMulti
      closeMenuOnSelect={false}
      options={options}
      styles={customStyles}
      {...rest}
    />
  );
};

export default MultiSelect;
