import Link from "next/link";
import { Button } from "../ui/button";
import { FaBookOpen } from "react-icons/fa";

function logo() {
  return (
    <Button asChild>
      <Link href={"/"}>
        <FaBookOpen className="w-6 h-6" />
        PDF BookStore
      </Link>
    </Button>
  );
}

export default logo;
