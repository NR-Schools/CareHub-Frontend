"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
const Dashboard = () => {
  const [body, setBody] = useState({
    email: "",
    name: "",
    contactNo: "",
    birthDate: "",
    photoBytes: null,
    userServiceCare: null,
  });
  const onSubmit = async () => {
    const data = await fetch("/api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setBody(await data.json());
  };
  return (
    <Button variant="outline" onClick={onSubmit}>
      {body.email}
    </Button>
  );
};

export default Dashboard;
