import React from "react";
import { Link } from "@src/components/Link";

type Props = {
  message: string;
};

const Test = ({ message }: Props) => {
  return (
    <div>
      Hello from test {message} <Link to="/">Go home</Link>
    </div>
  );
};

export default Test;
