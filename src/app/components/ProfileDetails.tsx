import { useState } from "react";
import '@mantine/dropzone/styles.css';
import {
  Container,
  Paper,
  Title,
  Text,
  TextInput,
  Textarea,
  PasswordInput,
  Switch,
  Button,
  Group,
  Stack,
  NativeSelect,
  Divider,
  Notification,
  Radio,
  Rating,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";

export default function ProfileSettingsPage(props: Partial<DropzoneProps>) {
  const [isLoading, setIsLoading] = useState(false);
  const [countryValue, setCountryValue] = useState("");
  const [roleValue, setRoleValue] = useState("");
  const [excitement, setExcitement] = useState(0);

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      aiesecEmail: "",
      personalEmail: "",
      // photo: "",
      lc: "",
      country: "",
      role: "",
      // currentPassword: "",
      // newPassword: "",
      // confirmNewPassword: "",
      // receiveNewsletters: true,
      // allowNotifications: false,
    },
    validate: {
      firstName: (value) =>
        value.length < 2 ? "Name must have at least 2 characters" : null,
      lastName: (value) =>
        value.length < 2 ? "Name must have at least 2 characters" : null,
      aiesecEmail: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      personalEmail: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      lc: (value) =>
        value.length < 2 ? "Name must have at least 2 characters" : null,
      country: (value) =>
        value.length < 2 ? "Name must have at least 2 characters" : null,
      // newPassword: (value) =>
      //   value && value.length < 8
      //     ? "Password must be at least 8 characters"
      //     : null,
      // confirmNewPassword: (value, values) =>
      //   value !== values.newPassword ? "Passwords do not match" : null,
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
      </Notification>;
    } catch (error) {
      <Notification color="red" title="Error">
        An error occurred while updating your profile. Please try again.
      </Notification>;
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
              label="First Name"
              placeholder="Your first name"
              required
              {...form.getInputProps("firstName")}
            />
            <TextInput
              label="Last Name"
              placeholder="Your last name"
              required
              {...form.getInputProps("lastName")}
            />
            <Radio.Group name="gender" label="Gender" withAsterisk>
              <Group mt="xs">
                <Radio value="male" label="Male" />
                <Radio value="female" label="Female" />
              </Group>
            </Radio.Group>
            <TextInput
              label="AIESEC Email"
              placeholder="your@aiesec.com"
              required
              {...form.getInputProps("aiesecEmail")}
            />
            <TextInput
              label="Personal Email"
              placeholder="your@email.com"
              required
              {...form.getInputProps("personalEmail")}
            />
            {/* <p>Picture</p>
            <Dropzone
              onDrop={(files) => console.log("accepted files", files)}
              onReject={(files) => console.log("rejected files", files)}
              maxSize={5 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
              {...props}
            >
              <Group
                justify="center"
                gap="xl"
                mih={220}
                style={{ pointerEvents: "none" }}
              >
                <Dropzone.Accept>
                  <IconUpload
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: "var(--mantine-color-blue-6)",
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: "var(--mantine-color-red-6)",
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: "var(--mantine-color-dimmed)",
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    Drag images here or click to select files
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not
                    exceed 5mb
                  </Text>
                </div>
              </Group>
            </Dropzone> */}
            <NativeSelect
              value={countryValue}
              onChange={(event) => setCountryValue(event.currentTarget.value)}
              withAsterisk
              label="Country"
              data={[
                "Select Country",
                "Sri Lanka",
                "India",
                "Vietnam",
                "Thailand",
                "Australia",
              ]}
            />
            <TextInput
              label="Entity"
              placeholder="Local Committee Name"
              {...form.getInputProps("lc")}
            />
            <NativeSelect
              value={roleValue}
              onChange={(event) => setRoleValue(event.currentTarget.value)}
              withAsterisk
              label="Role in AIESEC"
              data={["Select Role", "MCP", "MCVP", "LCP", "LCVP", "Other"]}
            />
            {/* <Textarea
              placeholder="Your Expectations from IC 2025"
              label="Expectations"
              autosize
              minRows={2}
              required
            />
            <p>Excitement</p>
            <Rating
              value={excitement}
              onChange={setExcitement}
              size="lg"
              count={10}
            />
            <Textarea
              placeholder="Anything to know"
              label="Anything to know"
              autosize
              minRows={2}
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
            /> */}

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
