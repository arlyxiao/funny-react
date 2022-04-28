import React, { useState } from "react";
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
  const [count, setCount] = useState(0);
  const { props } = useLoaderData();

  function handleClick() {
    setCount((prev) => prev + 1);
  }

  return (
    <>
      <button type="button" onClick={handleClick}>
        Click
      </button>
      <div onClick={() => console.log("hello")}>
        {props.message}
        <h2>{count}</h2>
        <Link to="/test">Go to test</Link>
      </div>
    </>
  );
};

export default Home;
