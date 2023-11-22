"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("")
  const [id, setId] = useState("");
  const onLogout = async () => {
    try {
      //after hosting in vercel if we don't set to no-cache then 
      //the logout won't work for second time due to cache response
      const response = await axios.get("/api/users/logout", {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (response?.data?.success) {
        console.log("logout Successful");
        toast.success("logout successful");
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error?.message);
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await axios.get("/api/users/singleUser");
      setId(response?.data?.data?._id);
      setName(response?.data?.data?.username)
      console.log(response?.data?.data);
    };
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-medium">Profile</h1>
      <h2 className="text-red-500 text-2xl">{name}</h2>
      
      <Link className="text-yellow-700" href={`/profile/${id}`}>View detail</Link>
      <button
        className="p-2 mt-2 bg-red-400 hover:bg-red-950 text-white"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
}
