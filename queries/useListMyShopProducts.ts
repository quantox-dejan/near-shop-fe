import useAuthContext from "@context/AuthContext";
import useNearContext from "@context/NearContext";
import { useQuery } from "@tanstack/react-query";

export const useListMyShopProducts = () => {
  const { contract } = useNearContext();
  const { isSignedIn, userAccountId } = useAuthContext();

  return useQuery(
    ["products", "my"],
    () =>
      contract!.list_my_user_shop_products?.({
        user_account_id: userAccountId,
      }),
    {
      enabled: !!contract && isSignedIn(),
    }
  );
};
