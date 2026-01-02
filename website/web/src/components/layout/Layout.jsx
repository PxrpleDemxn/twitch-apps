import { Box } from "@radix-ui/themes";
import Navbar from "../navbar/Navbar";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <Box>
        <main>{children}</main>
      </Box>
    </div>
  );
}
export default Layout;
