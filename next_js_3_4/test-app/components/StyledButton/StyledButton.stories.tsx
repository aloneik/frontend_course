import type { Meta, StoryObj } from '@storybook/react';

import { StyledButton } from "./StyledButton";

const meta = {
    title: "StyledButton",
    component: StyledButton,
} satisfies Meta<typeof StyledButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextSuccess = {
  args: {
    children: "Text",
    $variant: "text",
    $color: "success",
    $disabled: false
  },
} satisfies Story;

export const TextError = {
    args: {
      children: "Text",
      $variant: "text",
      $color: "error",
      $disabled: false
    },
} satisfies Story;

export const TextSecondary = {
    args: {
      children: "Text",
      $variant: "text",
      $color: "secondary",
      $disabled: false
    },
} satisfies Story;

export const ContainedSuccess = {
    args: {
      children: "Text",
      $variant: "contained",
      $color: "success",
      $disabled: false
    },
  } satisfies Story;
  
  export const ContainedError = {
      args: {
        children: "Text",
        $variant: "contained",
        $color: "error",
        $disabled: false
      },
  } satisfies Story;
  
  export const ContainedSecondary = {
      args: {
        children: "Text",
        $variant: "contained",
        $color: "secondary",
        $disabled: false
      },
  } satisfies Story;

  export const OutlinedSuccess = {
    args: {
      children: "Text",
      $variant: "outlined",
      $color: "success",
      $disabled: false
    },
  } satisfies Story;
  
  export const OutlinedError = {
      args: {
        children: "Text",
        $variant: "outlined",
        $color: "error",
        $disabled: false
      },
  } satisfies Story;
  
  export const OutlinedSecondary = {
      args: {
        children: "Text",
        $variant: "outlined",
        $color: "secondary",
        $disabled: false
      },
  } satisfies Story;
