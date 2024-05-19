import { Box, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { useContext, useState } from "react";
import { AuthContext } from "@/lib/authorization";
import { useQuery } from "@tanstack/react-query";
import axiosInstanceAuthorization from "@/lib/axiosInstanceAuthorization";
import { secondaryColor } from "@/lib/color";
import { FaAddressBook } from "react-icons/fa";
import Image from "next/image";

export function SidebarMenu() {
  const userData = useContext(AuthContext);
  const router = useRouter();
  const [profile, setProfile] = useState(null);

  const { data: dataProfile, refetch: refetchDataProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const dataResponse = await axiosInstanceAuthorization.get("/profile");
      setProfile(dataResponse.data[0]);
      return dataResponse.data;
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  return (
    <>
      {profile && (
        <Sidebar>
          <br />
          <Box
            p={3}
            mx={2}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            as="button"
          >
            <HStack
              onClick={() => {
                router.push(`/admin/profile`);
              }}
            >
              {profile.logo ? (
                <Box
                  width="40px"
                  height="40px"
                  borderRadius="50%"
                  overflow="hidden"
                  position="relative"
                >
                  <Image
                    src={profile.logo}
                    alt="Organization Logo"
                    layout="fill"
                    objectFit="cover"
                  />
                </Box>
              ) : (
                ""
              )}
              <Text as="b" fontSize="2xl" color={secondaryColor}>
                {profile.organization_name}
              </Text>
            </HStack>
          </Box>

          <br />
          <br />
          <Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                if (level === 0)
                  return {
                    color: disabled ? "#f5d9ff" : "#000000",
                    backgroundColor: active ? "#eecef9" : undefined,
                  };
              },
            }}
          >
            <MenuItem
              onClick={() => {
                router.push(`/admin/event/scan`);
              }}
            >
              🔎 Scan Tickets
            </MenuItem>
            <SubMenu label="🧾 Events">
              <MenuItem
                onClick={() => {
                  router.push(`/admin/event`);
                }}
              >
                📑 All Event
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push(`/admin/event?time=past&status=`);
                }}
              >
                ⏳ Past Event
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push(`/admin/event?time=on-going&status=`);
                }}
              >
                🎊 On Going
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push(`/admin/event?time=soon&status=`);
                }}
              >
                🕝 Coming Soon
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push(`/admin/event?status=0&time=`);
                }}
              >
                ⌚ Waiting for approval
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push(`/admin/event?status=1&time=`);
                }}
              >
                ❌ Rejected by Admin
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push(`/admin/event?status=2&time=`);
                }}
              >
                ✅ Approved
              </MenuItem>
            </SubMenu>
            <SubMenu label="🧾 Orders">
              <MenuItem
                onClick={() => {
                  router.push(`/admin/order`);
                }}
              >
                🎫 All Order
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push(`/admin/order?paid=0`);
                }}
              >
                ⏲️ Pending
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push(`/admin/order?paid=3`);
                }}
              >
                ✖️ Cancelled by User
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push(`/admin/order?paid=3`);
                }}
              >
                🎟️ Anomaly Transaction
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push(`/admin/order?paid=4`);
                }}
              >
                ☑️ Confirmed
              </MenuItem>
            </SubMenu>
            <MenuItem
              onClick={() => {
                handleLogout();
              }}
            >
              🔒 Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      )}
    </>
  );
}
