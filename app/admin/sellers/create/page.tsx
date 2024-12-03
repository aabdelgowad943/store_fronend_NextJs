import React from "react";
import FormInput from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { createUserAction } from "@/utils/actions";
import { Select } from "@/components/ui/select";

function CreateUser() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">create user</h1>
      {/*  */}
      <p className="text-red-400 p-2 bg-red-100">
        Notice: "this section should be handled to did not create password, the
        scenario is creating username and insert seller email then the code sent
        to seller contain user name and password"
      </p>
      <div className="border p-8 rounded-md">
        <FormContainer action={createUserAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              type="text"
              name="username"
              placeholder="Username"
              label="Username"
              defaultValue="amamdouh14"
            />
            <FormInput
              type="email"
              name="email"
              placeholder="Email"
              label="Email"
              defaultValue="ahmedmamdouh14@gmail.com"
            />
            <FormInput
              type="password"
              name="password"
              placeholder="Password"
              label="Password"
              defaultValue="Ahmed123"
            />
            <FormInput
              type="text"
              name="profileImage"
              placeholder="image url"
              label="image url"
            />
            <div className="flex flex-col">
              <label htmlFor="role" className="text-sm font-medium mb-2">
                Role
              </label>
              <select
                id="role"
                name="role"
                defaultValue="SELLER"
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="SELLER">Seller</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>{" "}
          </div>
          <SubmitButton text="Create User" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateUser;
