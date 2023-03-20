import { Flex } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      px="6"
      align="center"
      position="fixed"
      bg="gray.900"
      zIndex={99}
    >
      <Logo />

      <SearchBox />

      <Profile showProfileData />
    </Flex>
  );
}
