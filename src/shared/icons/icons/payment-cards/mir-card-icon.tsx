import React from "react";
import { SvgXml, XmlProps } from "react-native-svg";

export const MirCardIcon = (props: Omit<XmlProps, "xml">) => {
  return (
    <SvgXml
      {...props}
      xml={`<svg width="43" height="30" viewBox="0 0 43 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1299_1101)">
<rect width="43" height="30" rx="8" fill="#F8F8F8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.05156 11.0015C8.34637 10.9998 9.22253 10.9209 9.59366 12.1732C9.84366 13.0168 10.2419 14.3987 10.7883 16.3188H11.0109C11.5969 14.2945 11.9995 12.9126 12.2186 12.1732C12.5936 10.9078 13.5311 11.0016 13.9061 11.0016L16.7992 11.0016V20H13.8504V14.6971H13.6527L12.0089 20H9.79032L8.14652 14.6931H7.94879V20H5V11.0016L8.05156 11.0015ZM21.0336 11.0016V16.3084H21.2689L23.2684 11.9446C23.6565 11.0762 24.4838 11.0016 24.4838 11.0016H27.3374V20H24.327V14.6931H24.0917L22.1314 19.0569C21.7433 19.9214 20.8768 20 20.8768 20H18.0233V11.0016H21.0336ZM37.7425 15.2777C37.3226 16.4674 36.0039 17.3195 34.5439 17.3195H31.387V20H28.5243V15.2777H37.7425Z" fill="#0F754E"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M34.6828 11.002H28.375C28.5251 13.0053 30.2506 14.7203 32.0369 14.7203H37.9423C38.2831 13.0553 37.1099 11.002 34.6828 11.002Z" fill="url(#paint0_linear_1299_1101)"/>
</g>
<defs>
<linearGradient id="paint0_linear_1299_1101" x1="38.0002" y1="13.341" x2="28.375" y2="13.341" gradientUnits="userSpaceOnUse">
<stop stop-color="#1F5CD7"/>
<stop offset="1" stop-color="#02AEFF"/>
</linearGradient>
<clipPath id="clip0_1299_1101">
<rect width="43" height="30" rx="8" fill="white"/>
</clipPath>
</defs>
</svg>
`}
    />
  );
};
