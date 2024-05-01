import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
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
  args: { onClick: fn() },
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

export const RequeridoConError: Story = {
  args: {
    name: "",
    label: "Nombre",
    esRequerido: true,
    hayError: true,
  },
};
