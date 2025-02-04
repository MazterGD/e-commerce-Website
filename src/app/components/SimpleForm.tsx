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

export default function SimpleForm() {
  const [expectation, setExpectation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
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

  // const fetchUserDetails = async (userId: string) => {
  //   const { data, error } = await supabase
  //     .from("User")
  //     .select("first_name, last_name")
  //     .eq("id", userId)
  //     .single();

  //   if (error) {
  //     console.error("Error fetching user details:", error.message);
  //   } else {
  //     setFirstName(data.first_name || ""); // Default to empty string if null
  //     setLastName(data.last_name || "");
  //   }
  // };

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   if (!user) {
  //     console.error("User ID not found. Ensure the user is authenticated.");
  //     return;
  //   }

  //   setLoading(true);

  //   const { data, error } = await supabase
  //     .from("User_Details")
  //     .insert([{ id: user.id, expectation }]);

  //   if (error) {
  //     console.error("Error inserting data:", error.message);
  //   } else {
  //     console.log("Data inserted successfully:", data);
  //     setExpectation(""); // Reset form on success
  //   }

  //   setLoading(false);
  // };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) {
      console.error("User ID not found. Ensure the user is authenticated.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("User")
      .update({ first_name: firstName, last_name: lastName })
      .eq("id", user.id);

    if (error) {
      console.error("Error inserting data:", error.message);
    } else {
      console.log("Data inserted successfully:", data);
      setFirstName(""); // Reset form on success
      setHasFetched(false);
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <div>
        <h1>Welcome, {firstName || "Guest"}!</h1>
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
      {/* <div className="space-y-2">
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input id="email" name="email" type="email" required value={user?.email} />
      </div>
      <div className="space-y-2">
        <InputLabel htmlFor="expectation">Expectation</InputLabel>
        <Input
          id="expectation"
          name="expectation"
          onChange={(e) => setExpectation(e.target.value)}
          required
          placeholder="I want to ...."
        />
      </div> */}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Saving..." : "Submit"}
      </Button>
    </form>
  );
}
