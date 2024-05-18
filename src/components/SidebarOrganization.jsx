import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";


export function SidebarMenu() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };
  return (
    <>
    
      <Sidebar>
      <br/>
          <Text as="b" fontSize="2xl" ml={6} mt={8}>
            ☕GOFFEE
          </Text>
          <br/><br/>
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
          <MenuItem onClick={()=>{router.push(`/admin/dashboard`)}}> 📊 Dashboard </MenuItem>
          <MenuItem onClick={()=>{router.push(`/admin/event`)}}> 🎊 Event </MenuItem>
          <SubMenu label="🧾 Orders">
            <MenuItem onClick={()=>{router.push(`/admin/orders`)}}> 📑 All Orders </MenuItem>
            <MenuItem onClick={()=>{router.push(`/admin/orders/pending`)}}> 🕝 Pending </MenuItem>
            <MenuItem onClick={()=>{router.push(`/admin/orders/cancelbyuser`)}}> ✖️ Cancelled By User </MenuItem>
            <MenuItem onClick={()=>{router.push(`/admin/orders/cancelbyadmin`)}}> ❌ Cancelled By Admin </MenuItem>
            <MenuItem onClick={()=>{router.push(`/admin/orders/paid`)}}> 💵 Paid </MenuItem>
            <MenuItem onClick={()=>{router.push(`/admin/orders/process`)}}> ⚒️ Process </MenuItem>
            <MenuItem onClick={()=>{router.push(`/admin/orders/ready`)}}> 🎁 Ready </MenuItem>
            <MenuItem onClick={()=>{router.push(`/admin/orders/done`)}}> ✅ Done </MenuItem>
          </SubMenu>
          <MenuItem onClick={()=>{handleLogout()}}> 🔒 Logout </MenuItem>
        </Menu>
      </Sidebar>
      ;
    </>
  );
}
