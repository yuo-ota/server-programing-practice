import type { Meta, StoryObj } from "@storybook/react";
import LikeButton from "./LikeButton";

type T = typeof LikeButton

export default {
  component: LikeButton,
  args: {
    isLiked: false,
    onClick: () => {},
    className: "",
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {}
