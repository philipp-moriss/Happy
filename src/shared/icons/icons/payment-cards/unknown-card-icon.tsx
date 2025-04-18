import React from "react";
import { SvgXml, XmlProps } from "react-native-svg";

export const UnknownCardIcon = (props: Omit<XmlProps, "xml">) => {
  return (
    <SvgXml
      {...props}
      xml={`<svg width="44" height="32" viewBox="0 0 44 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="44" height="32" rx="8" fill="#0084FF" fill-opacity="0.1"/>
        </svg>
        `}
    />
  );
};
