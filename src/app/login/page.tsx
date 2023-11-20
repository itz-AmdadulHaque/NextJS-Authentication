"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisable, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/login", user);

      if (response?.data?.success) {
        toast.success("Login Successful");
        console.log(response.data);
        router.push("/profile");
      }
    } catch (error: any) {
      setMessage(error.response.data.message);
      console.log(error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email && user.password) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl">{!loading ? "Login" : "processing"}</h1>
      <h1>{message}</h1>

      <hr />

      <label className="mt-2" htmlFor="email">
        Email
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg md-4 focus:outline-none focus:border-red-600"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Your email"
      />

      <label className="mt-2" htmlFor="password">
        Password
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg md-4 focus:outline-none focus:border-red-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      <button
        className="p-2 mt-2 rounded-lg bg-green-400 hover:bg-green-600"
        onClick={onLogin}
      >
        Login
      </button>
      <Link className="mt-2 text-green-600" href="/signup">
        Visit signup page
      </Link>
      <Link className="mt-2 text-red-600" href="/forgotpassword">
        Forgot password
      </Link>
    </div>
  );
};

export default LoginPage;
