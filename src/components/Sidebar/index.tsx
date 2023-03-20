import { Box } from "@chakra-ui/react";
import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
  return (
    <Box as="aside" w="64" position="fixed">
      <SidebarNav />
    </Box>
  );
}
