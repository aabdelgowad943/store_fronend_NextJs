// import { useEffect, useState } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { LuAlignLeft } from "react-icons/lu";
// import Link from "next/link";
// import { Button } from "../ui/button";
// import { links } from "@/utils/links";
// import UserIcon from "./UserIcon";

// // Function to get the user role from localStorage
// const getUserRole = (): "ADMIN" | "SELLER" | "BUYER" | null => {
//   const role = localStorage.getItem("role");
//   return role === "ADMIN" || role === "SELLER" || role === "BUYER"
//     ? (role as "ADMIN" | "SELLER" | "BUYER")
//     : null;
// };

// // Function to check if the user is logged in (i.e., has a token)
// const isLoggedIn = (): boolean => {
//   return !!localStorage.getItem("token");
// };

// // Function to log out by removing the token and role from localStorage
// const logout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("role");
//   localStorage.removeItem("userId");
// };

// function LinksDropdown() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState<"ADMIN" | "SELLER" | "BUYER" | null>(
//     null
//   );

//   useEffect(() => {
//     // Fetch authentication state and role from localStorage when the component mounts
//     const role = getUserRole();
//     setUserRole(role);
//     setIsAuthenticated(isLoggedIn());
//   }, []);

//   const handleLogout = () => {
//     // Remove token and role from localStorage
//     logout();
//     // Reset the authentication state
//     setIsAuthenticated(false);
//     setUserRole(null);
//   };

//   // Filter links for authenticated users based on their role
//   const filteredLinks = links.filter((link) => {
//     if (userRole === "ADMIN" && link.label === "seller") return false;
//     if (userRole === "SELLER" && link.label === "dashboard") return false;
//     if (
//       userRole === "BUYER" &&
//       (link.label === "seller" || link.label === "dashboard")
//     )
//       return false;
//     return true;
//   });

//   const email = localStorage.getItem("email");
//   const userId = localStorage.getItem("userId");
//   return (
//     <>
//       {/* Unauthenticated Dropdown (Login/Register) */}
//       {!isAuthenticated && (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="flex gap-4 max-w-[100px]">
//               <LuAlignLeft className="w-6 h-6" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent
//             className="w-48 p-2 border shadow-md rounded-md"
//             align="start"
//           >
//             <DropdownMenuItem>
//               <Link href="/auth/login" className="capitalize w-full">
//                 Login
//               </Link>
//             </DropdownMenuItem>
//             <DropdownMenuItem>
//               <Link href="/auth/register" className="capitalize w-full">
//                 Register
//               </Link>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )}

//       {/* Authenticated Dropdown (User-Specific Links) */}
//       {isAuthenticated && (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="flex gap-4 max-w-[100px]">
//               <LuAlignLeft className="w-6 h-6" />
//               <UserIcon />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent
//             className="w-48 p-2 border shadow-md rounded-md"
//             align="start"
//           >
//             <DropdownMenuItem>
//               {/* Redirect to profile page with userId */}
//               <Link href={`/user-profile/${userId}`}>{email}</Link>
//             </DropdownMenuItem>
//             <hr />
//             {/* Render the links for authenticated users */}
//             {filteredLinks.map((link) => (
//               <DropdownMenuItem key={link.href}>
//                 <Link href={link.href} className="capitalize w-full">
//                   {link.label}
//                 </Link>
//               </DropdownMenuItem>
//             ))}
//             {/* Show logout button if authenticated */}
//             <DropdownMenuItem
//               onClick={handleLogout}
//               className="cursor-pointer text-red-500"
//             >
//               <Link href={"/auth/login"}>Logout </Link>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )}
//     </>
//   );
// }

// export default LinksDropdown;

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuAlignLeft } from "react-icons/lu";
import Link from "next/link";
import { Button } from "../ui/button";
import { links } from "@/utils/links";
import UserIcon from "./UserIcon";

// Function to get the user role from localStorage
const getUserRole = (): "ADMIN" | "SELLER" | "BUYER" | null => {
  const role = localStorage.getItem("role");
  return role === "ADMIN" || role === "SELLER" || role === "BUYER"
    ? (role as "ADMIN" | "SELLER" | "BUYER")
    : null;
};

// Function to check if the user is logged in (i.e., has a token)
const isLoggedIn = (): boolean => {
  return !!localStorage.getItem("token");
};

// Function to log out by removing the token and role from localStorage
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
};

function LinksDropdown() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"ADMIN" | "SELLER" | "BUYER" | null>(
    null
  );
  const [email, setEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Safely access localStorage in the browser
      const role = getUserRole();
      const token = isLoggedIn();
      setUserRole(role);
      setIsAuthenticated(token);
      setEmail(localStorage.getItem("email"));
      setUserId(localStorage.getItem("userId"));
    }
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setUserRole(null);
    setEmail(null);
    setUserId(null);
  };

  // Filter links for authenticated users based on their role
  const filteredLinks = links.filter((link) => {
    if (userRole === "ADMIN" && link.label === "seller") return false;
    if (userRole === "SELLER" && link.label === "dashboard") return false;
    if (
      userRole === "BUYER" &&
      (link.label === "seller" || link.label === "dashboard")
    )
      return false;
    return true;
  });

  return (
    <>
      {/* Unauthenticated Dropdown (Login/Register) */}
      {!isAuthenticated && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-4 max-w-[100px]">
              <LuAlignLeft className="w-6 h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-48 p-2 border shadow-md rounded-md"
            align="start"
          >
            <DropdownMenuItem>
              <Link href="/auth/login" className="capitalize w-full">
                Login
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/auth/register" className="capitalize w-full">
                Register
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Authenticated Dropdown (User-Specific Links) */}
      {isAuthenticated && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-4 max-w-[100px]">
              <LuAlignLeft className="w-6 h-6" />
              <UserIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-48 p-2 border shadow-md rounded-md"
            align="start"
          >
            <DropdownMenuItem>
              {/* Redirect to profile page with userId */}
              <Link href={`/user-profile/${userId}`}>{email}</Link>
            </DropdownMenuItem>
            <hr />
            {/* Render the links for authenticated users */}
            {filteredLinks.map((link) => (
              <DropdownMenuItem key={link.href}>
                <Link href={link.href} className="capitalize w-full">
                  {link.label}
                </Link>
              </DropdownMenuItem>
            ))}
            {/* Show logout button if authenticated */}
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-500"
            >
              <Link href={"/auth/login"}>Logout </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}

export default LinksDropdown;
