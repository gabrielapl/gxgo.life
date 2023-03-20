import { Button, Flex, Link, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/input";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { api } from "@/service/api";
import { useAuth } from "@/hooks/useAuth";

const signInFormSchema = yup.object().shape({
  login: yup.string().required("email/username obrigatório"),
  password: yup.string().required("senha obrigatória"),
});

export default function SignIn() {
  const { signIn } = useAuth();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<any> = async (data) => {
    try {
      signIn(data);
    } catch (error) {}

    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            _name="login"
            type="text"
            label="E-mail/username"
            {...register("login")}
            error={formState.errors.login}
          />

          <Input
            _name="password"
            type="password"
            label="Senha"
            {...register("password")}
            error={formState.errors.password}
          />
        </Stack>
        <Button
          type="submit"
          my="6"
          colorScheme="purple"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>

        <Link mx="auto" as={NextLink} href="/register">
          Crie sua conta
        </Link>
      </Flex>
    </Flex>
  );
}
