import React from "react";
import { SvgXml, XmlProps } from "react-native-svg";

export const CloseBgIcon = (props: Omit<XmlProps, "xml">) => {
  return (
    <SvgXml
      {...props}
      xml={`<svg width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_b_3727_861)">
<rect y="0.5" width="34" height="34" rx="17" fill="black" fill-opacity="0.3"/>
<path d="M13.4646 21.0354L20.5356 13.9644" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
<path d="M13.4646 13.9646L20.5356 21.0356" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
</g>
<defs>
<filter id="filter0_b_3727_861" x="-12" y="-11.5" width="58" height="58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImageFix" stdDeviation="6"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_3727_861"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_3727_861" result="shape"/>
</filter>
</defs>
</svg>
`}
    />
  );
};
