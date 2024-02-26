import { tv } from "@nextui-org/theme";

export const Form = tv({
  base: "flex flex-col gap-2",
});

export const FormErrorText = tv({
  base: "text-red-700",
});

export const LoginFormS = Object.assign(Form, {
  ErrorText: FormErrorText,
});
