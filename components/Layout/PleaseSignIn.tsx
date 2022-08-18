import useAuthContext from "@context/AuthContext";
import { Box, Button, Card, Center, Container, Text } from "@mantine/core";

export const PleaseSignIn = () => {
  const { signIn, isSigningIn } = useAuthContext();
  return (
    <Container>
      <Card>
        <Center>
          <Box mr={10}>
            <Text>🚀 Please</Text>
          </Box>
          <Button disabled={isSigningIn} onClick={() => signIn()}>
            Sign in
          </Button>
          <Box ml={10}>
            <Text>to use the NEAR Shop</Text>
          </Box>
        </Center>
      </Card>
    </Container>
  );
};
