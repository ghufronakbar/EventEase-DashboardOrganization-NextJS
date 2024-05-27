import { Box, Center, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { useQuery } from "@tanstack/react-query";
import axiosInstanceAuthorization from "@/lib/axiosInstanceAuthorization";
import { secondaryColor } from "@/lib/color";
import Image from "next/image";

export function SidebarMenu() {
  const router = useRouter();

  const { data: profileSB, isLoading: loadingProfileSB } = useQuery({
    queryKey: ["profileSB"],
    queryFn: async () => {
      const { data } = await axiosInstanceAuthorization.get("/profile");
      return data[0];
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  return (
    <>
      {!loadingProfileSB && profileSB && (
        <Sidebar>
          <br />
          <Box
            p={3}
            mx={2}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Stack onClick={() => router.push(`/admin/profile`)}>
              <Center>
                {profileSB.logo ? (
                  <Box
                    width="70px"
                    height="70px"
                    borderRadius="50%"
                    overflow="hidden"
                    position="relative"
                  >
                    <Image
                      src={profileSB.logo}
                      alt="Organization Logo"
                      layout="fill"
                      objectFit="cover"
                    />
                  </Box>
                ) : ""}
              </Center>
              <Text as="b" fontSize="2xl" color={secondaryColor} textAlign="center">
                {profileSB.organization_name}
              </Text>
            </Stack>
          </Box>
          <br />
          <br />
          <Menu>
            <MenuItem onClick={() => router.push(`/admin/event/scan`)}>🔎 Scan Tickets</MenuItem>
            <SubMenu label="🧾 Events">
              <MenuItem onClick={() => router.push(`/admin/event`)}>📑 All Event</MenuItem>
              <MenuItem onClick={() => router.push(`/admin/event?time=past`)}>⏳ Past Event</MenuItem>
              <MenuItem onClick={() => router.push(`/admin/event?time=on-going`)}>🎊 On Going</MenuItem>
              <MenuItem onClick={() => router.push(`/admin/event?time=soon`)}>🕝 Coming Soon</MenuItem>
              <MenuItem onClick={() => router.push(`/admin/event?status=0`)}>⌚ Waiting for approval</MenuItem>
              <MenuItem onClick={() => router.push(`/admin/event?status=1`)}>❌ Rejected by Admin</MenuItem>
              <MenuItem onClick={() => router.push(`/admin/event?status=2`)}>✅ Approved</MenuItem>
            </SubMenu>
            <SubMenu label="📒 Orders">
              <MenuItem onClick={() => router.push(`/admin/orders`)}>🎫 All Order</MenuItem>
              <MenuItem onClick={() => router.push(`/admin/orders?paid=0`)}>⏲️ Pending</MenuItem>
              <MenuItem onClick={() => router.push(`/admin/orders?paid=1`)}>✖️ Cancelled by User</MenuItem>
              <MenuItem onClick={() => router.push(`/admin/orders?paid=2`)}>🎟️ Anomaly Transaction</MenuItem>
              <MenuItem onClick={() => router.push(`/admin/orders?paid=3`)}>💵 Paid</MenuItem>
              <MenuItem onClick={() => router.push(`/admin/orders?paid=4`)}>☑️ Confirmed</MenuItem>
            </SubMenu>
            <MenuItem onClick={handleLogout}>🔒 Logout</MenuItem>
          </Menu>
        </Sidebar>
      )}
    </>
  );
}
