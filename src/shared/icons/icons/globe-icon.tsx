import React from "react";
import { SvgXml, XmlProps } from "react-native-svg";

export const GlobeIcon = (props: Omit<XmlProps, "xml">) => {
  return (
    <SvgXml
      {...props}
      xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 12C22 17.5228 17.5228 22 12 22M22 12C22 6.47715 17.5228 2 12 2M22 12C22 10.3431 17.5228 9 12 9C6.47715 9 2 10.3431 2 12M22 12C22 13.6569 17.5228 15 12 15C6.47715 15 2 13.6569 2 12M12 22C6.47715 22 2 17.5228 2 12M12 22C14.2091 22 16 17.5228 16 12C16 6.47715 14.2091 2 12 2M12 22C9.79086 22 8 17.5228 8 12C8 6.47715 9.79086 2 12 2M2 12C2 6.47715 6.47715 2 12 2" stroke="currentColor" stroke-width="1.5"/>
</svg>


`}
    />
  );
};
