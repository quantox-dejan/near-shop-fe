import useNearContext from "@context/NearContext";
import { useQuery } from "@tanstack/react-query";

export const useListAllShopsQuery = () => {
  const { contract } = useNearContext();

  return useQuery(
    ["shop", "list_all"],
    () => contract!.list_all_user_shops!(),
    {
      enabled: !!contract,
    }
  );
};
