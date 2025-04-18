import React from "react";
import { SvgXml, XmlProps } from "react-native-svg";

export const QrCodeIcon = (props: Omit<XmlProps, "xml">) => {
  return (
    <SvgXml
      {...props}
      xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3716_4738)">
<path d="M9 6H7C6.73478 6 6.48043 6.10536 6.29289 6.29289C6.10536 6.48043 6 6.73478 6 7V9" stroke="#363636" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 6H17C17.2652 6 17.5196 6.10536 17.7071 6.29289C17.8946 6.48043 18 6.73478 18 7V9" stroke="#363636" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18 15V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18H15" stroke="#363636" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 18H7C6.73478 18 6.48043 17.8946 6.29289 17.7071C6.10536 17.5196 6 17.2652 6 17V15" stroke="#363636" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 12H18" stroke="#363636" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_3716_4738">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
`}
    />
  );
};
