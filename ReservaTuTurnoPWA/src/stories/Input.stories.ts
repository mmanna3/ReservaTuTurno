import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import Input from "../components/Input";

const meta = {
  title: "Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  //   argTypes: {
  //     backgroundColor: { control: "color" },
  //   },
  //   args: { onClick: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Requerido: Story = {
  args: {
    name: "",
    label: "Nombre",
    esRequerido: true,
    hayError: false,
  },
};

export const ConFoco: Story = {
  args: {
    name: "nombre",
    label: "Nombre",
    esRequerido: true,
    hayError: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nombreInput = canvas.getByTestId("input-nombre");
    await userEvent.type(nombreInput, "Friedrich", {
      delay: 100,
    });
    await userEvent.click(nombreInput);
  },
};

export const ConError: Story = {
  args: {
    name: "nombre",
    label: "Nombre",
    esRequerido: true,
    hayError: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nombreInput = canvas.getByTestId("input-nombre");
    await userEvent.type(nombreInput, "Friedrich", {
      delay: 100,
    });
    await userEvent.click(nombreInput);
  },
};
