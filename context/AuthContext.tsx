import useNearContext from "@context/NearContext";
import { useRouter } from "next/router";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface Context {
  signIn(): void;
  signOut(): void;
  isSignedIn(): boolean;
  isSigningIn: boolean;
  userAccountId: string;
}

export const AuthContext = createContext<Context | undefined>(undefined);

export default function useAuthContext(): Context {
  return useContext(AuthContext) ?? ({} as Context);
}

export function AuthProvider({ children }: PropsWithChildren<unknown>) {
  const { config, walletConnection, reset } = useNearContext();
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const router = useRouter();
  const { pathname, query } = router;

  const signIn = useCallback(() => {
    if (!config) {
      console.error("The config object is not defined, please reload the page");
      return;
    }

    if (!walletConnection) {
      console.error(
        "The wallet connection is not defined, please reload the page"
      );
      return;
    }

    setIsSigningIn(true);
    walletConnection
      .requestSignIn(config.contractName)
      .finally(() => setIsSigningIn(false));
  }, [config, walletConnection]);

  const signOut = useCallback(() => {
    walletConnection?.signOut();
    delete query["account_id"];
    delete query["public_key"];
    delete query["all_keys"];
    router.replace({ pathname, query }, undefined);
  }, [walletConnection, router, pathname, query]);

  const isSignedIn = useCallback(() => {
    return !!walletConnection?.isSignedIn();
  }, [walletConnection]);

  const value = useMemo(
    () => ({
      signIn,
      signOut,
      isSignedIn,
      isSigningIn,
      userAccountId: walletConnection?.getAccountId(),
    }),
    [signIn, signOut, isSignedIn, isSigningIn, walletConnection]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
