import { PropsWithChildren } from "react";
import { Container } from "@mantine/core";
import Header from "../Header/Header";
import useAuthContext from "@context/AuthContext";
import { PleaseSignIn } from "./PleaseSignIn";

interface LayoutProps extends PropsWithChildren {
  signInRequired?: boolean;
}

export default function Layout({ children, signInRequired }: LayoutProps) {
  const { isSignedIn } = useAuthContext();
  return (
    <Container size="xl">
      <Header />
      {!signInRequired || isSignedIn() ? children : <PleaseSignIn />}
    </Container>
  );
}
