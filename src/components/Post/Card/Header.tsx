import { Avatar } from "@/components/Avatar";
import {
  Box,
  CardHeader,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { DotsThreeVertical } from "@phosphor-icons/react";

interface HeaderProps {
  data: {
    username: string;
    name: string;
    avatar: string;
  };

  createdAt: Date;
}

export function Header({ data, createdAt }: HeaderProps) {
  return (
    <CardHeader>
      <HStack spacing="4">
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Avatar url={data.avatar} />
          <Box>
            <Heading size="sm" color="white">
              {data.name}
            </Heading>
            <Text color="whiteAlpha.600">{data.username}</Text>
          </Box>

          <Divider ml="auto" orientation="vertical" h="8" />
          <Text color="whiteAlpha.600">
            {new Date(createdAt).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Text>
        </Flex>

        {/*         <IconButton
          variant="ghost"
          colorScheme="gray"
          aria-label="See menu"
          icon={<DotsThreeVertical size={24} />}
        /> */}
      </HStack>
    </CardHeader>
  );
}
