"use client";

import { useState } from "react";
import {
  Container,
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Switch,
  Button,
  Group,
  Stack,
  Text,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Notification } from "@mantine/core";

export default function ProfileSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "John Doe",
      email: "john@example.com",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      receiveNewsletters: true,
      allowNotifications: false,
    },
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 characters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      newPassword: (value) =>
        value && value.length < 8
          ? "Password must be at least 8 characters"
          : null,
      confirmNewPassword: (value, values) =>
        value !== values.newPassword ? "Passwords do not match" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Updating profile with:", values);
      <Notification color="green" title="Profile Updated">
        Your profile settings have been successfully updated.
      </Notification>
    } catch (error) {
      <Notification color="red" title="Error">
        An error occurred while updating your profile. Please try again.
      </Notification>
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="sm" py="xl">
      <Paper shadow="md" radius="md" p="xl">
        <Title order={2} mb="xl">
          Profile Settings
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Name"
              placeholder="Your full name"
              required
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              {...form.getInputProps("email")}
            />

            <Divider my="xs" label="Change Password" labelPosition="center" />

            <PasswordInput
              label="Current Password"
              placeholder="Enter your current password"
              {...form.getInputProps("currentPassword")}
            />
            <PasswordInput
              label="New Password"
              placeholder="Enter your new password"
              {...form.getInputProps("newPassword")}
            />
            <PasswordInput
              label="Confirm New Password"
              placeholder="Confirm your new password"
              {...form.getInputProps("confirmNewPassword")}
            />

            <Divider my="xs" label="Preferences" labelPosition="center" />

            <Switch
              label="Receive newsletters"
              {...form.getInputProps("receiveNewsletters", {
                type: "checkbox",
              })}
            />
            <Switch
              label="Allow notifications"
              {...form.getInputProps("allowNotifications", {
                type: "checkbox",
              })}
            />

            <Group mt="xl">
              <Button variant="outline" onClick={form.reset}>
                Reset Changes
              </Button>
              <Button type="submit" loading={isLoading}>
                Save Changes
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
