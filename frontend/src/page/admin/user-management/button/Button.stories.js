import { Button } from ".";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    size: {
      options: ["large", "jumbo", "medium", "small"],
      control: { type: "select" },
    },
    color: {
      options: ["blue", "white", "red"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    size: "large",
    color: "blue",
    leftIcon: true,
    rightIcon: true,
    className: {},
    textClassName: {},
    text: "Button",
  },
};
