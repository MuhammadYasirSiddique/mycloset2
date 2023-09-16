import Link from "next/link";
import Image from "next/image";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-6xl font-extrabold text-red-500">404</div>
      <div className="text-2xl font-semibold mt-4">Page Not Found</div>
      <p className="text-gray-600 mt-2">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <a className="text-blue-500 hover:underline mt-4">
          Go back to the home page
        </a>
      </Link>
      <Image src="/404.png" alt="404 Illustration" height={250} width={250} />
    </div>
  );
};

export default NotFoundPage;
