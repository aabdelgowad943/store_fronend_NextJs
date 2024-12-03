"use client";
import { SubmitButton } from "@/components/form/Buttons";
import FormInput from "@/components/form/FormInput";
import Link from "next/link";
import Logo from "../../../components/navbar/Logo";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginPayload } from "@/utils/types";
import { loginUser } from "@/utils/actions";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginPayload>({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const response = await loginUser(formData);
      setSuccessMessage(response.message);

      if (response.token) {
        localStorage.setItem("token", response.token); // Save the token
        localStorage.setItem("sellerId", response.sellerId);
        localStorage.setItem("role", response.role || ""); // Save the role
        localStorage.setItem("userId", response.id); // Save the role
        console.log("id is", response.id);

        if (response.role === "ADMIN") {
          router.push("/admin/sellers");
        } else if (response.role === "SELLER") {
          router.push("/seller-dashboard/products");
        } else {
          router.push("/"); // Default dashboard
        }
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-no-repeat bg-cover bg-center shadow-lg bg-slate-100-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full pt:mt-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
          <div className="p-6 space-y-4 md:space-y-6 lg:space-y-8 sm:p-8">
            <h2 className="text-xl font-bold flex flex-col leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
              <div>
                <Logo />
              </div>
              Sign in to your account
            </h2>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <FormInput
                type="email"
                name="email"
                placeholder="name@company.com"
                label="email"
                defaultValue={formData.email}
                onChange={handleChange}
              />
              <FormInput
                type="password"
                name="password"
                placeholder="••••••••"
                label="password"
                defaultValue={formData.password}
                onChange={handleChange}
              />
              <SubmitButton text={isLoading ? "Signing in..." : "Sign in"} />
              {errorMessage && (
                <div className="text-red-600 text-center">{errorMessage}</div>
              )}
              {successMessage && (
                <div className="text-green-600 text-center">
                  {successMessage}
                </div>
              )}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/auth/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
