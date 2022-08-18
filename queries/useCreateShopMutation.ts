import useNearContext, { UserShopDto } from "@context/NearContext";
import { useMutation } from "@tanstack/react-query";

export const useCreateShopQuery = () => {
  const { contract } = useNearContext();

  return useMutation<void, unknown, UserShopDto, unknown>(
    ["shop", "create"],
    (args) => Promise.resolve(contract?.add_user_shop?.({ args }))
  );
};
