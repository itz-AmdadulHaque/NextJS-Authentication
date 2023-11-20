import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="grid gap-2 ">
        <Link
          className="text-xl font-medium hover:text-red-400 px-10 py-2 border-2 border-red-600"
          href="/login"
        >
          Login
        </Link>
        <Link
          className="text-xl font-medium hover:text-red-400 px-10 py-2 border-2 border-red-600"
          href="/signup"
        >
          Signup
        </Link>
        <Link
          className="text-xl font-medium hover:text-red-400 px-10 py-2 border-2 border-red-600"
          href="/profile"
        >
          Profile
        </Link>
      </div>
    </main>
  );
}
