"use client";
import { useState, useEffect } from "react";
import { Button } from "@mantine/core";
import { Input } from "@mantine/core";
import { InputLabel } from "@mantine/core";
import { getKindeUser } from "../lib/kindeAuth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SimpleForm() {
  const [expectation, setExpectation] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  getKindeUser().then((user) => {
    if (user) {
      setUser(user);
      console.log("User Given Name:", user.given_name);
    } else {
      console.log("No user found");
    }
  });

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const firstName = formData.get("firstName");
  //   const lastName = formData.get("lastName");
  //   const email = formData.get("email");

  //   console.log("Form submitted:", { firstName, lastName, email });
  //   // Here you would typically send this data to an API or perform some other action
  // };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) {
      console.error("User ID not found. Ensure the user is authenticated.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("User_Details")
      .insert([{ id: user.id, expectation }]);

    if (error) {
      console.error("Error inserting data:", error.message);
    } else {
      console.log("Data inserted successfully:", data);
      setExpectation(""); // Reset form on success
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <div>
        <h1>Welcome, {user?.given_name || "Guest"}!</h1>
      </div>
      {/* <div className="space-y-2">
        <InputLabel htmlFor="firstName">First Name</InputLabel>
        <Input id="firstName" name="firstName" required placeholder={user?.given_name} />
      </div>
      <div className="space-y-2">
        <InputLabel htmlFor="lastName">Last Name</InputLabel>
        <Input id="lastName" name="lastName" required placeholder={user?.family_name} />
      </div>
      <div className="space-y-2">
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input id="email" name="email" type="email" required placeholder={user?.email} />
      </div> */}
      <div className="space-y-2">
        <InputLabel htmlFor="expectation">Expectation</InputLabel>
        <Input
          id="expectation"
          name="expectation"
          onChange={(e) => setExpectation(e.target.value)}
          required
          placeholder="I want to ...."
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Uploading..." : "Submit"}
      </Button>
    </form>
  );
}
