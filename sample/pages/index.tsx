import React from "react";
import { Link } from "@sample/components/Link";
import { useLoaderData } from "@sample/hooks/useLoaderData";

export const loader = async () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve({
        message: "hello",
      });
    }, 500);
  });

  return promise.then(function (data) {
    return data;
  });
};

const Home = () => {
  const { props } = useLoaderData();

  return (
    <div onClick={() => console.log("hello")}>
      {props.message}
      <Link to="/test">Go to test</Link>
    </div>
  );
};

export default Home;
