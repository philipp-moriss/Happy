import React from "react";
import { SvgXml, XmlProps } from "react-native-svg";

export const TxdIcon = (props: Omit<XmlProps, "xml">) => {
  return (
    <SvgXml
      {...props}
      xml={`
<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill-rule="evenodd" clip-rule="evenodd" d="M18.0769 28L15.0769 20.6714H14.9231L11.9231 28H8.23077L12.1538 18.8714L8 10H11.7385L14.9231 17.0714H15.0769L18.2615 10H22.0236C24.6378 10 26.7874 10.8657 28.4724 12.5971C30.1575 14.3286 31 16.4629 31 19C31 21.5371 30.1575 23.6714 28.4724 25.4029C26.7874 27.1343 24.6378 28 22.0236 28H18.0769ZM17.8462 18.8714L20.2648 13.7059H22C23.6378 13.7059 24.9528 14.0971 25.8976 15.0914C26.8583 16.0686 27.3386 17.3714 27.3386 19C27.3386 20.6286 26.8583 21.94 25.8976 22.9343C24.9528 23.9114 23.6614 24.2941 22.0236 24.2941H20.1766L17.8462 18.8714Z" fill="white"/>
</svg>

`}
    />
  );
};
