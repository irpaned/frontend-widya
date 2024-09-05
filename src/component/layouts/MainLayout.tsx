import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <Container className="flex items-center justify-center bg-background p-10">
      <Outlet />
    </Container>
  );
}
