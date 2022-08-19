import useNearContext from "@context/NearContext";
import { useQuery } from "@tanstack/react-query";

export const useListAllShopsQuery = () => {
  const { contract } = useNearContext();

  return useQuery(
    ["shops", "list_all"],
    () => contract!.list_all_user_shops!(),
    {
      enabled: !!contract,
    }
  );
};
