"use client";
import { ErrorProps } from "next/error";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="px-10 pt-10">
      <h1>Error</h1>
      <p>{error.message}</p>
      <button className="btn" onClick={reset}>
        Home
      </button>
    </div>
  );
}
