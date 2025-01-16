"use client";

import { useState } from "react";
import { Stepper, Button, Group, Title } from "@mantine/core";
import ProfileSettingsPage from "../components/ProfileDetails";

export default function Demo() {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="First step" description="Complete Profile Details">
          <Title order={2} mb="xl">
            Step 1 : Complete Profile Details
          </Title>
          <ProfileSettingsPage />
        </Stepper.Step>
        <Stepper.Step label="Second step" description="MCP Approval">
          <Title order={2} mb="xl">
            Step 2 : MCP Approval
          </Title>
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Submit Indemnity Forms">
          <Title order={2} mb="xl">
            Step 3 : Submit Indemnity Forms
          </Title>
        </Stepper.Step>
        <Stepper.Completed>
          <Title order={2} mb="xl">
            Completed
          </Title>
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
}
