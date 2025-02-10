"use client";
import { useState } from "react";
import { Button, InputLabel } from "@mantine/core";
import { createClient } from "@supabase/supabase-js";
import { getKindeUser } from "../lib/kindeAuth";
import { fetchUserDetails } from "../lib/fetchUserDetails";
import { DropzoneButton } from "./DropzoneButton";
// import { useSupabase } from "../lib/supabaseATok";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface NewDataInputFormProps {
  onSubmit: () => void;
}

export default function DocumentUploadForm({
  onSubmit,
}: NewDataInputFormProps) {
  const [expectation, setExpectation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hasFetched, setHasFetched] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  // const supabase = useSupabase();
  const [fileList, setFileList] = useState<string[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [error, setError] = useState(null);

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

  // const handleSubmit = async (event?: React.FormEvent) => {
  //   if (event) event.preventDefault();
  //   if (!user) {
  //     console.error("User ID not found. Ensure the user is authenticated.");
  //     return;
  //   }

  //   const { data, error } = await supabase
  //     .from("User_Details")
  //     .insert([{ id: user.id, expectation }]);

  //   if (error) {
  //     console.error("Error inserting data:", error.message);
  //   } else {
  //     console.log("Data inserted successfully:", data);
  //     router.refresh();
  //     onSubmit();
  //   }
  // };

  // const handleSubmit = async (event?: React.FormEvent) => {
  //   if (event) event.preventDefault();
  //   if (!user) {
  //     console.error("User ID not found. Ensure the user is authenticated.");
  //     return;
  //   }

  //   setLoading(true);

  //   const { data, error } = await supabase
  //     .from("User")
  //     .update({ first_name: firstName, last_name: lastName })
  //     .eq("id", user.id);

  //   if (error) {
  //     console.error("Error inserting data:", error.message);
  //   } else {
  //     console.log("Data inserted successfully:", data);
  //     router.refresh();
  //     onSubmit();
  //   }

  //   setLoading(false);
  // };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // check if an expectation already exists for the user
      const { data, error: fetchError } = await supabase
        .from("User_Details")
        .select("id")
        .eq("id", user.id)
        .single(); // Expecting one record

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error(
          "Error checking existing expectation:",
          fetchError.message
        );
        return;
      }

      let dbResponse;
      if (data) {
        // If a record exists, update it
        dbResponse = await supabase
          .from("User_Details")
          .update({ expectation: expectation })
          .eq("id", data.id);
      } else {
        // If no record exists, insert a new one
        dbResponse = await supabase
          .from("User_Details")
          .insert([{ id: user.id, expectation }]);
      }

      if (dbResponse.error) {
        console.error("Database operation failed:", dbResponse.error.message);
        return;
      }

      console.log("Expectation saved successfully");
      onSubmit();
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const handleFileUpload = async (file: File) => {
    // const user = getKindeUser();
    // SyncKindeWithSupabase();

    setUploading(true);
    setUploadError(null);

    const filePath = `${user.id}/${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("user-uploads")
      .upload(filePath, file, {
        upsert: true,
        metadata: { owner: user.id },
      });

    if (error) {
      setUploadError(error.message);
      console.log(error);
    } else {
      const { data: publicUrlData } = supabase.storage
        .from("user-uploads")
        .getPublicUrl(filePath);
      setFileUrl(publicUrlData.publicUrl);
    }

    setUploading(false);
  };

  const fetchUserFiles = async () => {
    setLoadingFiles(true);
    setError(null);

    const userFolder = `${user.id}`;

    const { data, error } = await supabase.storage
      .from("user-uploads")
      .list(userFolder, { limit: 100 }); // Adjust limit as needed

    if (error) {
      console.error("Error fetching files:", error);
      // setError(error);
    } else {
      const fileUrls = data.map(
        (file) =>
          supabase.storage
            .from("user-uploads")
            .getPublicUrl(`${userFolder}/${file.name}`).data.publicUrl
      );
      setFileList(fileUrls);
    }

    setLoadingFiles(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        <div>
          <h1>
            Welcome, {firstName || "Guest"} {lastName || ""}!
          </h1>
        </div>
        <div className="space-y-2">
          <InputLabel htmlFor="expectation">Expectation</InputLabel>
          <DropzoneButton onFileUpload={handleFileUpload} />

          {uploading && <p>Uploading...</p>}
          {uploadError && <p style={{ color: "red" }}>Error: {uploadError}</p>}
          {fileUrl && (
            <p>
              File uploaded successfully:{" "}
              <a href={fileUrl} target="_blank">
                View PDF
              </a>
            </p>
          )}
        </div>
      </form>
      <div>
        <h2>Your Uploaded Files</h2>
        <Button onClick={fetchUserFiles}>Refresh</Button>
        {loadingFiles ? <p>Loading...</p> : null}
        {error ? <p style={{ color: "red" }}>{error}</p> : null}
        <ul>
          {fileList.map((fileUrl, index) => (
            <li key={index}>
              <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                {fileUrl}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
