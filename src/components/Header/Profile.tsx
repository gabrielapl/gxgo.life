import { useAuth } from "@/hooks/useAuth";
import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { SignOut } from "@phosphor-icons/react";
import { Avatar } from "../Avatar";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user, signOut } = useAuth();

  return (
    <Flex align="center" ml="auto">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{user?.name}</Text>
          <Text color="gray.300" fontSize="small">
            {user?.username}
          </Text>
        </Box>
      )}

      <Avatar url={user?.avatar ?? ""} />
      <IconButton
        variant="ghost"
        colorScheme="gray"
        aria-label="See menu"
        icon={<SignOut size={24} />}
        onClick={signOut}
        ml="4"
      />
    </Flex>
  );
}
