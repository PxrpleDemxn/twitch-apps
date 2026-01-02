import { NavLink } from "react-router-dom";
import { TabNav } from "@radix-ui/themes";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <>
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
      </TabNav.Root>
    </>
  );
};

export default Navbar;
