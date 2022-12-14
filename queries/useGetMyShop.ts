import useAuthContext from "@context/AuthContext";
import useNearContext from "@context/NearContext";
import { useQuery } from "@tanstack/react-query";

export const useGetMyShop = () => {
  const { contract } = useNearContext();
  const { isSignedIn, userAccountId } = useAuthContext();

  return useQuery(
    ["shops", "my"],
    () => contract!.get_my_user_shop?.({ user_account_id: userAccountId }),
    {
      enabled: !!contract && isSignedIn(),
    }
  );
};
