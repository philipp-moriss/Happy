import React from "react";
import { SvgXml, XmlProps } from "react-native-svg";

export const CloseIcon = (props: Omit<XmlProps, "xml">) => {
  return (
    <SvgXml
      {...props}
      xml={`<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.46458 16.0355L15.5356 8.96448" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M8.46458 8.96445L15.5356 16.0355" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>
      `}
    />
  );
};
