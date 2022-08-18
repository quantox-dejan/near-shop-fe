import { PropsWithChildren } from "react";
import { Container } from "@mantine/core";
import Header from "../Header/Header";
import useAuthContext from "@context/AuthContext";
import { PleaseSignIn } from "./PleaseSignIn";

export default function Layout({ children }: PropsWithChildren) {
  const { isSignedIn } = useAuthContext();
  return (
    <Container size="xl">
      <Header />
      {isSignedIn() ? children : <PleaseSignIn />}
    </Container>
  );
}
