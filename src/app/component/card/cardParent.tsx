"use client";

import React from "react";

const CardParent = ({
  key,
  url,
  children,
}: {
  key: string;
  url: string;
  children: React.ReactNode;
}) => {
  const goToPage = (url: string) => {
    window.open(url, "_blank")?.focus();
  };

  return (
    <div onClick={() => goToPage(url)} key={key}>
      {children}
    </div>
  );
};

export default CardParent;
