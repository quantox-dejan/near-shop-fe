import { CreateProductDto } from "@context/NearContext";
import {
  Button,
  Card,
  LoadingOverlay,
  NumberInput,
  Space,
  TextInput,
} from "@mantine/core";
import { utils } from "near-api-js";
import { useRouter } from "next/router";
import { useCreateProductMutation } from "queries/useCreateProductMutation";
import { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import componentClasses from "./CreateProductForm.module.css";

interface FormData {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const CreateProductForm = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm<FormData>();
  const { mutateAsync, isLoading, error } = useCreateProductMutation();

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      router.push("/shops/my");
    }
  }, [isSubmitSuccessful, router]);

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    const data: CreateProductDto = {
      ...formData,
      price: utils.format.parseNearAmount(`${formData.price}`)!,
    };
    return mutateAsync(data);
  };

  return (
    <Card>
      <div className={componentClasses.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <TextInput
                placeholder="Product name"
                label="Product name"
                required
                {...field}
              />
            )}
          />
          <Space h={20} />
          <Controller
            name="price"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <NumberInput
                placeholder="Price in N"
                label="Price in N"
                required
                {...field}
              />
            )}
          />
          <Space h={20} />
          <Controller
            name="quantity"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <NumberInput
                placeholder="Initial quantity"
                label="Initial quantity"
                required
                {...field}
              />
            )}
          />
          <Space h={20} />
          <Button type="submit">Save</Button>
        </form>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
      </div>
    </Card>
  );
};
