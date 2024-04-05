import React from "react";
import {
  Container,
  Paper,
  Text,
  Button,
  Checkbox,
  Radio,
  SegmentedControl,
  Slider,
  Input,
  Textarea,
  Select,
  Group,
} from "@mantine/core";
import ThemeToggleButton from "./component/toggle-button";

function MantineTestPage() {
  return (
    <Container size="xl">
      <Paper p="md" shadow="xs">
        <Text size="xl" style={{ marginBottom: "20px" }}>
          Mantine Component Playground
        </Text>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <ThemeToggleButton />
          Theme Toggle Button
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <Button variant="filled">Primary Button</Button>
          <Button variant="outline">Outline Button</Button>
        </div>

        <div style={{ marginTop: "20px" }}>
          <Checkbox label="Checkbox" />
        </div>

        <div style={{ marginTop: "20px" }}>
          <Radio name="radio-group" value="option1" label="Radio Option 1" />
          <Radio name="radio-group" value="option2" label="Radio Option 2" />
        </div>

        <div style={{ marginTop: "20px" }}>
          <SegmentedControl
            data={[
              { label: "React", value: "react" },
              { label: "Angular", value: "ng" },
              { label: "Vue", value: "vue" },
              { label: "Svelte", value: "svelte" },
            ]}
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <Slider defaultValue={50} />
        </div>

        <div style={{ marginTop: "20px" }}>
          <Input placeholder="Input" />
        </div>

        <div style={{ marginTop: "20px" }}>
          <Textarea placeholder="Textarea" />
        </div>

        <div style={{ marginTop: "20px" }}>
          <Select
            data={["Option 1", "Option 2", "Option 3"]}
            placeholder="Select an option"
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <Group align="center" gap="md">
            <Button variant="filled">Grouped Button 1</Button>
            <Button variant="filled">Grouped Button 2</Button>
            <Button variant="filled">Grouped Button 3</Button>
          </Group>
        </div>
      </Paper>
    </Container>
  );
}

export default MantineTestPage;
