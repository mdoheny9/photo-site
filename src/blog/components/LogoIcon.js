import { Box } from "@mui/material";
import logo from "./my-logo.png"; // place logo in /src folder

export default function LogoIcon() {
  return (
    <Box
      component="img"
      src={logo}
      alt="Logo"
      sx={{ height: 40, width: "auto", mr: 2 }}
    />
  );
}
