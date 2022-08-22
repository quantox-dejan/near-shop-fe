import useNearContext from "@context/NearContext";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const useGetProduct = (userShopId: string, productId: string) => {
  const { contract } = useNearContext();
  const { isReady } = useRouter();

  return useQuery(
    ["products", userShopId, productId],
    () =>
      contract!.get_user_shop_product?.({
        user_shop_id: userShopId,
        product_id: productId,
      }),
    {
      enabled: !!contract && isReady,
    }
  );
};
