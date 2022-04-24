import React from "react";
import { Link } from "../components/Link";

type Props = {
  message: string;
};

export const loader = async () => {
  return {
    message: 'hello'
  }
};


const Home = ({ message }: Props) => {
  return (
    <div onClick={() => console.log("hello")}>
      {message}
      <Link to="/test">Go to test</Link>
    </div>
  );
};

export default Home;
