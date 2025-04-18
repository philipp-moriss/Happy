// ui/select.tsx
// import { SelectIcon } from "assets/icons/selectIcon";
import React, { forwardRef } from "react";
import { View } from "react-native";
import Dropdown from "react-native-input-select";
import {
  DropdownSelectHandle,
  TSelectedItem,
} from "react-native-input-select/lib/typescript/src/types/index.types";

import Typography from "./typography";
import useTheme from "../hooks/use-theme/use-theme";
import { SelectIcon } from "../icons/icons/selectIcon";

interface ISelect {
  options: { label: string; value: string }[]; // Updated to allow ReactNode for label
  onChange: (selectedItems: TSelectedItem | TSelectedItem[]) => void;
  selectedValue?: TSelectedItem | TSelectedItem[];
  label?: string;
  listEmptyComponent?: React.ReactNode;
  placeholder?: string; // Updated to allow ReactNode for placeholder
}

// Use forwardRef to pass the ref to Dropdown
const Select = forwardRef<DropdownSelectHandle, ISelect>(
  (
    {
      options,
      onChange,
      placeholder,
      selectedValue,
      listEmptyComponent,
      label = "",
    },
    ref
  ) => {
    const { colors, sizes } = useTheme();
    return (
      <View>
        {label && (
          <Typography size={14} marginVertical={sizes.s}>
            {label}
          </Typography>
        )}

        <Dropdown
          ref={ref} // Pass the ref here
          autoCloseOnSelect
          dropdownStyle={{
            borderColor: colors.bg02,
            paddingVertical: 5,
            paddingHorizontal: 10,
            minHeight: 58,
            height: 25,
            backgroundColor: "transparent",
          }}
          dropdownIconStyle={{
            top: "50%",
            right: 17,
          }}
          dropdownIcon={<SelectIcon />}
          placeholderStyle={{
            color: colors.text05,
          }}
          listEmptyComponent={listEmptyComponent}
          selectedItemStyle={{
            color: colors.text01,
          }}
          placeholder={placeholder ? placeholder : "Select an option..."}
          options={options}
          selectedValue={selectedValue}
          onValueChange={(value) => onChange(value)}
          primaryColor={colors.primary}
        />
      </View>
    );
  }
);

export default Select;
