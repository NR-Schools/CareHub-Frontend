"use client";

import { RegisterForm } from "@/components/auth/register-form";
import { RoleButton } from "@/components/auth/role-buttons";
import { useState } from "react";

interface RegisterFormProps {
  role: boolean;
}
export const ProviderProfileCreation = ({ role }: RegisterFormProps) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  return (
    <div>
      {!showForm && (
        <RoleButton
          label="Provider"
          onClick={() => {
            setShowForm(true);
          }}
        />
      )}
      {showForm && <RegisterForm role={role} />}
    </div>
  );
};
