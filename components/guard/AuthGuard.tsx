// components/AuthGuard.tsx
"use client";
import { useUserContext } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthGuardProps {
  allowedRoles: ("ADMIN" | "SELLER" | "BUYER")[];
  children: React.ReactNode;
}

const AuthGuard = ({ allowedRoles, children }: AuthGuardProps) => {
  const { role } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (role && !allowedRoles.includes(role)) {
      router.push("/403"); // Redirect to a "Forbidden" page
    }
  }, [role, allowedRoles, router]);

  if (!role) return <p>Loading...</p>; // Optional loading state

  return allowedRoles.includes(role) ? <>{children}</> : null;
};

export default AuthGuard;
