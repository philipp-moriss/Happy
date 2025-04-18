import React from "react";
import { SvgXml, XmlProps } from "react-native-svg";

export const FlushIcon = (props: Omit<XmlProps, "xml">) => {
  return (
    <SvgXml
      {...props}
      xml={`<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.1429 2.5H6.85714C6.38376 2.5 6 2.88376 6 3.35714C6 5.43271 7.22955 7.2211 9 8.03368V19.5C9 21.1569 10.3431 22.5 12 22.5C13.6569 22.5 15 21.1569 15 19.5V8.03368C16.7705 7.2211 18 5.43271 18 3.35714C18 2.88376 17.6162 2.5 17.1429 2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 9.5V11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


`}
    />
  );
};
