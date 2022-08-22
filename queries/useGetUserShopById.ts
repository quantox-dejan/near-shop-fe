import useNearContext from "@context/NearContext";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const useGetUserShopById = (id: string) => {
  const { contract } = useNearContext();
  const { isReady } = useRouter();

  return useQuery(
    ["shops", id],
    () => contract!.get_user_shop?.({ user_shop_id: id }),
    {
      enabled: !!contract && isReady,
    }
  );
};
