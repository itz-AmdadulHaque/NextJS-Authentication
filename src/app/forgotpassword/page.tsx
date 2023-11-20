"use client"
import axios from "axios";
import { useState } from "react";

export default function page() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitEmail = async()=>{
    try{
      const response = await axios.post("/api/users/forgotpassword", {email})
      console.log(response?.data)
      if(response?.data?.success){
        setMessage("An email sent to you to rest your password")
      }
    }catch(error:any){
      console.log(error)
      setMessage("Error sending email")
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h2 className="bg-blue-500 text-xl">{message}</h2>
      <label className="text-xl" htmlFor="email">Provide Your email</label>
      
      <input
      id="email"
      className="rounded-lg p-2"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email"
      />
      <button className="rounded-lg bg-green-400 p-2 mt-2 hover:bg-green-600" onClick={submitEmail}>Submit</button>
    </div>
  );
}
