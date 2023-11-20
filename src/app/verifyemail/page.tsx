"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };
  // get the token
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  //when get a token this should run
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify email</h1>
      <h1 className="p-2 bg-orange-500 mt-2">{token ? token : "no token"}</h1>
      {verified && (
        <div>
          <h2>Email Verified</h2>
          <Link href="/login">Click to Login</Link>
        </div>
      )}
      {error && <h2 className="text-red-400">Error</h2>}
    </div>
  );
}
