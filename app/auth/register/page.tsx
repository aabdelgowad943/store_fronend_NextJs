// "use client";
// // File: pages/register.tsx
// import { SubmitButton } from "@/components/form/Buttons";
// import CheckboxInput from "@/components/form/CheckBoxInput";
// import FormInput from "@/components/form/FormInput";
// import Link from "next/link";
// import Logo from "../../../components/navbar/Logo";
// import { useState } from "react";
// import { RegisterPayload } from "@/utils/types";
// import { registerUser } from "@/utils/actions";

// export default function Register() {
//   const [formData, setFormData] = useState<RegisterPayload>({
//     username: "",
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrorMessage(null);
//     setSuccessMessage(null);
//     try {
//       const response = await registerUser({
//         username: formData.username,
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//       });
//       setSuccessMessage(response.message);
//     } catch (error: any) {
//       setErrorMessage(error.message);
//     }
//   };

//   return (
//     <section className="bg-no-repeat bg-cover bg-center bg-slate-100 shadow-lg">
//       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full pt:mt-0">
//         <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
//           <div className="p-6 space-y-4 md:space-y-6 lg:space-y-8 sm:p-8">
//             <h2 className="text-xl font-bold flex flex-col leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
//               <div>
//                 <Logo />
//               </div>
//               Create your account
//               <span className="text-lg leading-tight tracking-tight font-normal">
//                 already have account{" "}
//                 <Link
//                   className="text-blue-600 hover:text-blue-700 transition-all"
//                   href={"/auth/login"}
//                 >
//                   Sign in
//                 </Link>{" "}
//               </span>
//             </h2>
//             <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
//               <FormInput
//                 type="text"
//                 name="name"
//                 placeholder="name"
//                 label="name"
//                 defaultValue={formData.name}
//                 onChange={handleChange}
//               />
//               <FormInput
//                 type="text"
//                 name="username"
//                 placeholder="username"
//                 label="username"
//                 defaultValue={formData.username}
//                 onChange={handleChange}
//               />
//               <FormInput
//                 type="email"
//                 name="email"
//                 placeholder="a@mail.com"
//                 label="email"
//                 defaultValue={formData.email}
//                 onChange={handleChange}
//               />

//               <FormInput
//                 type="password"
//                 name="password"
//                 placeholder="Strongpassword"
//                 label="password"
//                 defaultValue={formData.password}
//                 onChange={handleChange}
//               />

//               <div className="flex items-start">
//                 <div className="flex items-center h-5">
//                   <CheckboxInput
//                     name="news"
//                     label="I accept the Terms and Conditions"
//                   />
//                 </div>
//               </div>
//               <SubmitButton text="Create account" />
//               {errorMessage && (
//                 <div className="text-red-600 text-center">{errorMessage}</div>
//               )}
//               {successMessage && (
//                 <div className="text-green-600 text-center">
//                   {successMessage}

//                 </div>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import { useState } from "react";
import Link from "next/link";
import { RegisterPayload } from "@/utils/types";
import { registerUser } from "@/utils/actions";
import FormInput from "@/components/form/FormInput";
import CheckboxInput from "@/components/form/CheckBoxInput";
import { SubmitButton } from "@/components/form/Buttons";
import Logo from "../../../components/navbar/Logo";

// Success Popup Component
const SuccessModal = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 flex items-center justify-center  bg-gray-800 bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] h-[200px] flex flex-col items-center justify-center">
      <h2 className="text-lg text-center text-green-600">{message}</h2>
      <div className="mt-4 flex justify-center gap-4">
        <Link href="/auth/login">
          <button className="text-blue-500 hover:underline">Go to Login</button>
        </Link>
        <button onClick={onClose} className="text-gray-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  </div>
);

export default function Register() {
  const [formData, setFormData] = useState<RegisterPayload>({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const response = await registerUser({
        username: formData.username,
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      setSuccessMessage(response.message);
      setIsSuccessModalOpen(true); // Open success modal
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <section className="bg-no-repeat bg-cover bg-center bg-slate-100 shadow-lg">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full pt:mt-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
          <div className="p-6 space-y-4 md:space-y-6 lg:space-y-8 sm:p-8">
            <h2 className="text-xl font-bold flex flex-col leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
              <div>
                <Logo />
              </div>
              Create your account
              <span className="text-lg leading-tight tracking-tight font-normal">
                already have account{" "}
                <Link
                  className="text-blue-600 hover:text-blue-700 transition-all"
                  href={"/auth/login"}
                >
                  Sign in
                </Link>{" "}
              </span>
            </h2>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <FormInput
                type="text"
                name="name"
                placeholder="name"
                label="name"
                defaultValue={formData.name}
                onChange={handleChange}
              />
              <FormInput
                type="text"
                name="username"
                placeholder="username"
                label="username"
                defaultValue={formData.username}
                onChange={handleChange}
              />
              <FormInput
                type="email"
                name="email"
                placeholder="a@mail.com"
                label="email"
                defaultValue={formData.email}
                onChange={handleChange}
              />
              <FormInput
                type="password"
                name="password"
                placeholder="Strongpassword"
                label="password"
                defaultValue={formData.password}
                onChange={handleChange}
              />
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <CheckboxInput
                    name="news"
                    label="I accept the Terms and Conditions"
                  />
                </div>
              </div>
              <SubmitButton text="Create account" />
              {errorMessage && (
                <div className="text-red-600 text-center">{errorMessage}</div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {isSuccessModalOpen && successMessage && (
        <SuccessModal message={successMessage} onClose={closeSuccessModal} />
      )}
    </section>
  );
}
