import useAuthContext from "@context/AuthContext";
import useNearContext from "@context/NearContext";
import { useQuery } from "@tanstack/react-query";

export const useListAllShopsQuery = () => {
  const { contract } = useNearContext();
  const { isSignedIn } = useAuthContext();

  return useQuery(
    ["list_all", "shops"],
    () => contract!.list_all_user_shops!(),
    {
      enabled: !!contract && isSignedIn(),
    }
  );
};
