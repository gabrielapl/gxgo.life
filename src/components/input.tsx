import { forwardRef, ForwardRefRenderFunction } from "react";
import {
  Input as ChakraInput,
  FormLabel,
  FormControl,
  InputProps as ChakraInputProps,
  FormErrorMessage,
} from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  _name: string;
  label?: string;
  error: any;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { _name: name, label, error, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        name={name}
        id={name}
        focusBorderColor="purple.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: "gray.900",
        }}
        size="lg"
        ref={ref}
        {...rest}
      />

      {!!error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
