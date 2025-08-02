import { Control, FieldValues, Path } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
  FormField,
} from "@/components/ui/form";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  description?: string;
  type?: "text" | "password" | "email";
  autoComplete?: "current-password" | "username" | "email" | "off";
}

export const FormFieldInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "",
  description = "",
  type = "text",
  autoComplete = "off",
}: FormFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} type={type} autoComplete={autoComplete} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
