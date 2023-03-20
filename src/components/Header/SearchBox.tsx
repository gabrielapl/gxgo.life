import {
  Box,
  Flex,
  Heading,
  Icon,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { X } from "@phosphor-icons/react";
import { useState } from "react";
import { Avatar } from "../Avatar";

export function SearchBox() {
  const [search, setSearch] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth={400}
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Buscar na plataforma"
        _placeholder={{ color: "gray.400" }}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />

      {isFocus && (
        <Flex
          width="full"
          position="absolute"
          top="12"
          left="0"
          zIndex={1}
          bg="gray.700"
          borderRadius="md"
          py="6"
          px="4"
          direction="column"
          gap={8}
        >
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar />
            <Box>
              <Heading size="sm" color="white">
                Segun Adebayo
              </Heading>
              <Text color="whiteAlpha.600">Creator, Chakra UI</Text>
            </Box>
          </Flex>

          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar />
            <Box>
              <Heading size="sm" color="white">
                Segun Adebayo
              </Heading>
              <Text color="whiteAlpha.600">Creator, Chakra UI</Text>
            </Box>
          </Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar />
            <Box>
              <Heading size="sm" color="white">
                Segun Adebayo
              </Heading>
              <Text color="whiteAlpha.600">Creator, Chakra UI</Text>
            </Box>
          </Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar />
            <Box>
              <Heading size="sm" color="white">
                Segun Adebayo
              </Heading>
              <Text color="whiteAlpha.600">Creator, Chakra UI</Text>
            </Box>
          </Flex>
        </Flex>
      )}

      {search.length > 0 && <Icon as={X} fontSize="20" />}
    </Flex>
  );
}
