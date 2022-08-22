import useNearContext from "@context/NearContext";
import { useQuery } from "@tanstack/react-query";

export const useListUserShopProducts = (id: string) => {
  const { contract } = useNearContext();

  return useQuery(
    ["products", id],
    () =>
      contract!.list_user_shop_products?.({
        user_shop_id: id,
      }),
    {
      enabled: !!contract,
    }
  );
};
