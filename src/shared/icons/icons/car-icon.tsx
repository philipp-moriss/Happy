import React from "react";
import { SvgXml, XmlProps } from "react-native-svg";

export const CarIcon = (props: Omit<XmlProps, "xml">) => {
  return (
    <SvgXml
      {...props}
      xml={`<svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.4167 15.625L17.4167 11.6667C17.4167 10.5621 16.5213 9.66667 15.4167 9.66667L6.58342 9.66667C5.47885 9.66667 4.58342 10.5621 4.58342 11.6667L4.58342 15.625C4.58342 16.3844 5.19902 17 5.95842 17C6.71781 17 7.33342 16.3844 7.33342 15.625L7.33342 15.1667L14.6667 15.1667L14.6667 15.625C14.6667 16.3844 15.2824 17 16.0417 17C16.8011 17 17.4167 16.3844 17.4167 15.625Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.5833 9.66666L15.5833 8C15.5833 6.89543 14.6878 6 13.5833 6L8.41659 6C7.31202 6 6.41659 6.89543 6.41659 8L6.41659 9.66666L15.5833 9.66666Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.16675 12.4167H7.33341" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.6667 12.4167H12.8334" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

`}
    />
  );
};
