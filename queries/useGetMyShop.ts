import useAuthContext from "@context/AuthContext";
import useNearContext from "@context/NearContext";
import { useQuery } from "@tanstack/react-query";

export const useGetMyShop = () => {
  const { contract } = useNearContext();
  const { isSignedIn } = useAuthContext();

  return useQuery(["shop", "my"], () => contract!.get_my_user_shop!(), {
    enabled: !!contract && isSignedIn(),
  });
};
