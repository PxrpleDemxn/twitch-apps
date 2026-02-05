import { NavLink } from "react-router-dom";
import { TabNav, Flex, Button } from "@radix-ui/themes";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/UserContext.jsx";
import TwitchLogin from "../login/TwitchLogin";
import { ExitIcon } from "@radix-ui/react-icons";

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { user, loading, logout } = useAuth();

  return (
    <TabNav.Root>
      <TabNav.Link asChild active={pathname === "/"}>
        <NavLink to="/">Home</NavLink>
      </TabNav.Link>

      <TabNav.Link asChild active={pathname === "/store"}>
        <NavLink to="/store">Store</NavLink>
      </TabNav.Link>

      <TabNav.Link asChild active={pathname === "/games"}>
        <NavLink to="/games">Games</NavLink>
      </TabNav.Link>

      <TabNav.Link asChild active={pathname === "/about"}>
        <NavLink to="/about">About</NavLink>
      </TabNav.Link>

      <Flex align="center" style={{ marginLeft: "auto", paddingRight: "12px" }}>
        {!user ? (
          <TwitchLogin />
        ) : (
          <TabNav.Link asChild active={pathname === "/profile"}>
            <NavLink to="/profile">
              <Flex align="center" gap="3">
                <p>💰 {user.coins}</p>
                <img
                  src={user.profileImageUrl}
                  alt="avatar"
                  style={{ height: "28px", borderRadius: "50%" }}
                />
                <p>{user.username}</p>
                <Button
                  variant="outline"
                  size="1"
                  color="gray"
                  onClick={() => logout()}
                >
                  <ExitIcon />
                </Button>
              </Flex>
            </NavLink>
          </TabNav.Link>
        )}
      </Flex>
    </TabNav.Root>
  );
};

export default Navbar;
