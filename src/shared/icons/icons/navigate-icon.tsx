import React from "react";
import { SvgXml, XmlProps } from "react-native-svg";

export const NavigateIcon = (props: Omit<XmlProps, "xml">) => {
  return (
    <SvgXml
      {...props}
      xml={`<svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.40671 0.485632C1.4904 -0.126494 0.155513 0.532243 0.25474 1.72368L0.283681 2.07117C0.725215 7.37274 1.65905 12.6249 3.07382 17.7641C3.41076 18.988 5.10415 19.0934 5.61824 17.959L7.74686 13.262C7.95036 12.813 8.44447 12.5248 8.98066 12.5822L14.247 13.1462C15.4558 13.2756 16.3101 11.7997 15.3414 10.8644C11.4526 7.11021 7.22272 3.70288 2.70312 0.683642L2.40671 0.485632Z" fill="currentColor"/>
</svg>

      `}
    />
  );
};
