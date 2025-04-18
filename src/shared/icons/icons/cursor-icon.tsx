import React from "react";
import { SvgXml, XmlProps } from "react-native-svg";

export const CursorIcon = (props: Omit<XmlProps, "xml">) => {
  return (
    <SvgXml
      {...props}
      xml={`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.17266 2.0716C5.40907 1.5615 4.29667 2.11045 4.37936 3.10331L4.40347 3.39289C4.77142 7.81086 5.54962 12.1877 6.72859 16.4703C7.00937 17.4902 8.42053 17.5781 8.84894 16.6328L10.6228 12.7186C10.7924 12.3444 11.2041 12.1042 11.651 12.1521L16.0396 12.6221C17.0469 12.7299 17.7588 11.5 16.9515 10.7206C13.7109 7.59209 10.186 4.75265 6.41967 2.23661L6.17266 2.0716Z" fill="currentColor"/>
</svg>
`}
    />
  );
};
