import { UserShopDto } from "@context/NearContext";
import {
  Button,
  Card,
  Container,
  LoadingOverlay,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import { useCreateShopQuery } from "queries/useCreateShopMutation";
import { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import componentClasses from "./CreateShopForm.module.css";

export const CreateShopForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserShopDto>();
  const { mutate, isLoading, isError, isSuccess, error } = useCreateShopQuery();
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const onSubmit: SubmitHandler<UserShopDto> = (data) => mutate(data);
  return (
    <Card>
      <div className={componentClasses.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput
                placeholder="Shop name"
                label="Shop name"
                required
                {...field}
              />
            )}
          />
          {errors.name && (
            <Text size="sm" color="red">
              This field is required
            </Text>
          )}
          <Space h={20} />
          <Button type="submit">Register</Button>
        </form>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
      </div>
    </Card>
  );
};
