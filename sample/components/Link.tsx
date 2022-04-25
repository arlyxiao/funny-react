import React from "react";
import { ReactNode } from "react";
import { useLoaderData } from "@sample/hooks/useLoaderData";

type Props = {
  to: string;
  children: ReactNode;
};

export const Link = ({ to, children }: Props) => {
  let { navigate } = useLoaderData();

  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
};
