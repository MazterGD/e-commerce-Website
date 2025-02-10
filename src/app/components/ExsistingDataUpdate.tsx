"use client";
import { useState, useEffect } from "react";
import { Button } from "@mantine/core";
import { Input } from "@mantine/core";
import { InputLabel } from "@mantine/core";
import { createClient } from "@supabase/supabase-js";
import { getKindeUser } from "../lib/kindeAuth";
import { useRouter } from "next/navigation";
import { fetchUserDetails } from "../lib/fetchUserDetails";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface SimpleFormProps {
  onSubmit: () => void;
}

export default function SimpleForm({ onSubmit }: SimpleFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hasFetched, setHasFetched] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  getKindeUser().then((user) => {
    if (user) {
      setUser(user);
      if (!hasFetched) {
        fetchUserDetails(user.id).then((userDetails) => {
          if (userDetails) {
            setFirstName(userDetails.first_name || "");
            setLastName(userDetails.last_name || "");
          }
          setHasFetched(true);
        });
      }
      console.log("User Given Name:", user.given_name);
    } else {
      console.log("No user found");
    }
  });

  const handleSubmit = async (event?: React.FormEvent) => {
    if(event) event.preventDefault();
    if (!user) {
      console.error("User ID not found. Ensure the user is authenticated.");
      return;
    }

    const { data, error } = await supabase
      .from("User")
      .update({ first_name: firstName, last_name: lastName })
      .eq("id", user.id);

    if (error) {
      console.error("Error inserting data:", error.message);
    } else {
      console.log("Data inserted successfully:", data);
      router.refresh();
      onSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <div>
        <h1>Welcome, {firstName || "Guest"} {lastName || ""}!</h1>
      </div>
      <div className="space-y-2">
        <InputLabel htmlFor="firstName">First Name</InputLabel>
        <Input
          id="firstName"
          name="firstName"
          onChange={(e) => setFirstName(e.target.value)}
          required
          value={firstName}
        />
      </div>
      <div className="space-y-2">
        <InputLabel htmlFor="lastName">Last Name</InputLabel>
        <Input
          id="lastName"
          name="lastName"
          onChange={(e) => setLastName(e.target.value)}
          required
          value={lastName}
        />
      </div>
    </form>
  );
}
