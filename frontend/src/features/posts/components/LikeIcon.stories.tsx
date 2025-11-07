import type { Meta, StoryObj } from "@storybook/react";
import HeartIcon from "../assets/heart.svg?react";

type T = typeof HeartIcon

export default {
  component: HeartIcon,
  args: {
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {}
