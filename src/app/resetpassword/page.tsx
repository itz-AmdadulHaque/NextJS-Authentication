"use client"
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function page() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  // get the token
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const savePassword = async () => {
    try {
      const response = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });
      console.log(response?.data);
      if (response?.data?.success) {
        setMessage("Password Reset successful");
      }
    } catch (error: any) {
      console.log(error);
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl">Reset Your Password</h1>
      <h2 className="text-red-700">{message}</h2>
      <label className="mt-2" htmlFor="password">New Password</label>
      <input
      className="p-2 rounded-lg"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder=" New Password"
      />

      <label className="mt-2" htmlFor="confirm">Confirm Password</label>
      <input
      className="p-2 rounded-lg"
        id="confirm"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <button className="p-2 mt-2 rounded-lg bg-green-400 hover:bg-green-600" onClick={savePassword} disabled={token === "" ? true : false}>
        Save Password
      </button>
      <Link className="mt-2 text-blue-700" href="/login">Visit Login page</Link>

    </div>
  );
}
