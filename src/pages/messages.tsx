import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { withSSRAuth } from "@/utils/withSSRAuth";
import { Box, Flex } from "@chakra-ui/react";

export default function Messages() {
  return (
    <Flex direction="column" h="100vh" w="100%">
      <Box w="100%" maxWidth={1480} mx="auto">
        <Header />
      </Box>

      <Flex w="100%" maxWidth={1480} mx="auto" px="6" mt="24">
        <Sidebar />
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
