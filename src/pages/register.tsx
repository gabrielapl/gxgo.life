import { Button, Flex, Link, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/input";
import NextLink from "next/link";
import { api } from "@/service/api";
import { setCookie } from "nookies";
import { useRouter } from "next/router";

type RegisterFormData = {
  username: string;
  name: string;
  email: string;
  password: string;
};

const registerFormSchema = yup.object().shape({
  name: yup.string().required("nome é obrigatório"),
  username: yup.string().required("Username é  obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("senha obrigatória"),
});

export default function Register() {
  const { push } = useRouter();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(registerFormSchema),
  });

  const handleRegister: SubmitHandler<any> = async (data) => {
    try {
      const response = await api.post("create-user", {
        ...data,
        avatar: "",
      });
      if (response.status === 200) {
        setCookie(undefined, "@gxgo-social.id", response.data.id, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: "/",
        });

        push("/home");
      }
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
        onSubmit={handleSubmit(handleRegister)}
      >
        <Stack spacing="4">
          <Input
            _name="username"
            type="Username"
            label="Username"
            {...register("username")}
            error={formState.errors.username}
          />

          <Input
            _name="name"
            type="name"
            label="Nome"
            {...register("name")}
            error={formState.errors.name}
          />

          <Input
            _name="email"
            type="email"
            label="E-mail"
            {...register("email")}
            error={formState.errors.email}
          />

          <Input
            _name="password"
            type="password"
            label="Password"
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
          Criar
        </Button>

        <Link mx="auto" as={NextLink} href="/">
          já possui uma conta?
        </Link>
      </Flex>
    </Flex>
  );
}
