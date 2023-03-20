import { Text } from "@chakra-ui/react";

export function Logo() {
  return (
    <Text
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
    >
      gxgo
      <Text color="purple.500" as="span" ml="1">
        .
      </Text>
      <Text as="span" ml="1">
        social
      </Text>
    </Text>
  );
}
