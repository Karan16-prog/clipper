import * as React from "react";
import { SVGProps } from "react";
const Plus = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} {...props}>
    <path stroke="currentColor" strokeLinecap="round" d="M5.5 2.5v8m4-4h-8" />
  </svg>
);
export default Plus;
