import React from "react";
import { SvgXml, XmlProps } from "react-native-svg";

export const PlusIcon = (props: Omit<XmlProps, "xml">) => {
  return (
    <SvgXml
      {...props}
      xml={`<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 17.5V7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path d="M7 12.5L17 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>

`}
    />
  );
};
