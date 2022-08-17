import { PropsWithChildren } from "react";
import { Container } from "@mantine/core";
import Header from "../Header/Header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Container size="xl">
      <Header />
      {children}
    </Container>
  );
}
