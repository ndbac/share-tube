import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link href="/">ShareTube</Link>
        </div>
        <div>
          <Link href="/login" className="text-white mr-4">
            Login
          </Link>
          <Link href="/register" className="text-white">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
