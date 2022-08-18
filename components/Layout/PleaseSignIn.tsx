import useAuthContext from "@context/AuthContext";
import { Box, Button, Card, Center, Container, Text } from "@mantine/core";

export const PleaseSignIn = () => {
  const { signIn, isSigningIn } = useAuthContext();
  return (
    <Container>
      <Card>
        <Center>
          <Box mr={5}>
            <Text>🚀 Please sign in to use the NEAR Shop</Text>
          </Box>
          <Button disabled={isSigningIn} onClick={() => signIn()}>
            Sign in
          </Button>
        </Center>
      </Card>
    </Container>
  );
};
