import { Stack } from "@chakra-ui/react";
import { NavLink } from "./NavLink";
import { Chats, ChartPieSlice, Bell, User } from "@phosphor-icons/react";

export function SidebarNav() {
  return (
    <Stack spacing="4" align="stretch">
      <NavLink icon={ChartPieSlice} href="/home">
        Feed
      </NavLink>
      <NavLink icon={Bell} href="/notifications">
        Notifications
      </NavLink>
      <NavLink icon={Chats} href="/messages">
        Messages
      </NavLink>
      <NavLink icon={User} href="/profile">
        Profile
      </NavLink>
    </Stack>
  );
}
