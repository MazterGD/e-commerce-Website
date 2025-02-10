"use client";

import { useState } from "react";
import { Stepper, Button, Group, Title } from "@mantine/core";
import SimpleForm from "../components/ExsistingDataUpdate";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import NewDataInputForm from "../components/NewDataInput";
import DocumentUploadForm from "../components/DocumentUpload";

export default function StepperComponent() {
  const [active, setActive] = useState(0);

  const handleNextStep = async () => {
    if (active === 0) {
      await document
        .querySelector("form")
        ?.dispatchEvent(new Event("submit", { bubbles: true }));
    } else if (active === 1 || active === 2) {
      document
        .querySelector("form")
        ?.dispatchEvent(new Event("submit", { bubbles: true }));
    } else {
      setActive((current) => (current < 3 ? current + 1 : current));
    }
  };

  const { accessToken, getAccessToken } = useKindeBrowserClient();
  const aTok = getAccessToken();
  console.log(accessToken, aTok);

  return (
    <>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="First step" description="Complete Profile Details">
          <Title order={2} mb="xl">
            Step 1 : Complete Profile Details
          </Title>
          <SimpleForm onSubmit={() => setActive(1)} />
        </Stepper.Step>
        <Stepper.Step label="Second step" description="MCP Approval">
          <Title order={2} mb="xl">
            Step 2 : MCP Approval
          </Title>
          <NewDataInputForm onSubmit={() => setActive(2)} />
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Submit Indemnity Forms">
          <Title order={2} mb="xl">
            Step 3 : Submit Indemnity Forms
          </Title>
          <DocumentUploadForm onSubmit={() => setActive(3)} />
        </Stepper.Step>
        <Stepper.Completed>
          <Title order={2} mb="xl">
            Completed
          </Title>
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button
          variant="default"
          onClick={() => setActive((current) => Math.max(0, current - 1))}
        >
          Back
        </Button>
        <Button onClick={handleNextStep}>
          {active === 0 || active === 1 ? "Submit & Next" : "Next step"}
        </Button>
      </Group>
    </>
  );
}
