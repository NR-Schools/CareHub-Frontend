"use client";

import { useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { RoleButton } from "@/components/auth/role-buttons";
import { RegisterForm } from "@/components/auth/register-form";
import { ProviderProfileCreation } from "@/components/auth/provider-profile-creation";
export const RoleForm = () => {
  const [customer, setCustomer] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <div>
      {!showForm && (
        <CardWrapper headerLabel="Before we start, are you a caregiver, or a user?">
          <div className="w-full max-w-sm space-y-4">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">Choose your role</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Select the role that best describes your job
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <RoleButton
                label="Customer"
                onClick={() => {
                  setCustomer(true);
                  setShowForm(true);
                }}
              />
              <RoleButton
                label="Provider"
                onClick={() => {
                  setCustomer(false);
                  setShowForm(true);
                }}
              />
            </div>
          </div>
        </CardWrapper>
      )}
      {customer && <RegisterForm role={customer} />}
      {showForm && !customer && <ProviderProfileCreation role={customer} />}
    </div>
  );
};
