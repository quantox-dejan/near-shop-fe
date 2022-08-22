import useNearContext, { CreateProductDto } from "@context/NearContext";
import { useMutation } from "@tanstack/react-query";

export const useCreateProductMutation = () => {
  const { contract } = useNearContext();

  return useMutation<void, unknown, CreateProductDto, unknown>(
    ["products", "create"],
    (args) => Promise.resolve(contract?.add_product?.({ args }))
  );
};
