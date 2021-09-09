import React from "react";
import Select from "react-select";
import { SelectComponentsProps } from "react-select/src/Select";

interface MultiSelectProps extends SelectComponentsProps {
  options: string[];
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
  const selectOptions = options.map((o) => ({ label: o, value: o }));

  return (
    <Select
      isMulti
      closeMenuOnSelect={false}
      options={selectOptions}
      styles={customStyles}
      {...rest}
    />
  );
};

export default MultiSelect;
