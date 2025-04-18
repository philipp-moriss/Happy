import React from "react";
import { SvgXml, XmlProps } from "react-native-svg";

export const AddCardIcon = (props: Omit<XmlProps, "xml">) => {
  return (
    <SvgXml
      {...props}
      xml={`<svg width="44" height="32" viewBox="0 0 44 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="44" height="32" rx="8" fill="#0084FF" fill-opacity="0.1"/>
        <path d="M22 21V11" stroke="#0084FF" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M17 16L27 16" stroke="#0084FF" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        `}
    />
  );
};
