import { CardBody, Divider, HStack, Text, VStack } from "@chakra-ui/react";

export function Body({ message }: { message: string }) {
  return (
    <CardBody color="white">
      <Text>{message}</Text>
      <Divider my="4" />

      <HStack spacing="4" justify="flex-end">
        <Text>3 comments</Text>
        <Text>3 likes</Text>
        <Text>3 shares</Text>
      </HStack>
    </CardBody>
  );
}
