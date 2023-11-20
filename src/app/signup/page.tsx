"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {toast} from "react-hot-toast"

const page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisable, setButtonDisable] = useState(false)
  const [loading, setLoading] = useState(false)
  const onSingup = async () => {
    try{
      setLoading(true);

      const respose = await axios.post("/api/users/signup", user)
      
      if (respose?.data?.success) {
        toast.success(`${user.username} created successfully`)
        console.log(respose?.data)
        router.push("/login")
      }

    }catch(error: any){
      console.log(error);
      toast.error(error?.message)
    } finally{
      setLoading(false)
    }
  };

  useEffect(()=> {
    if(user.email && user.username && user.password) {
      setButtonDisable(true)
    }
  },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{!loading? "Signup": "Processing"}</h1>
      <hr />
      <label htmlFor="username">User Name</label>
      <input
        className="p-2 border border-gray-300 rounded-lg md-4 focus:outline-none focus:border-red-600"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="user name"
      />

      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg md-4 focus:outline-none focus:border-red-600"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Your email"
      />

      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg md-4 focus:outline-none focus:border-red-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      <button className="bg-gray-700 p-2 rounded-lg mt-2" onClick={onSingup}>
        {buttonDisable? "Singup" : "No Singup"}
      </button>
      <Link className="mt-2 text-blue-700" href="/login">Visit Login page</Link>
    </div>
  );
};

export default page;
