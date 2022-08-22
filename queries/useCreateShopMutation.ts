import useNearContext, { UserShopDto } from "@context/NearContext";
import { useMutation } from "@tanstack/react-query";

export const useCreateShopMutation = () => {
  const { contract } = useNearContext();

  return useMutation<void, unknown, UserShopDto, unknown>(
    ["shops", "create"],
    (args) => Promise.resolve(contract?.add_user_shop?.({ args }))
  );
};
