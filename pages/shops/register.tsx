import { CreateShopForm } from "@components/CreateShopForm/CreateShopForm";
import Layout from "@components/Layout/Layout";
import { LoadingOverlay, Space, Text, Title } from "@mantine/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useGetMyShop } from "queries/useGetMyShop";
import { useEffect } from "react";

const RegisterShopPage: NextPage = () => {
  const { data, isLoading, isSuccess, error } = useGetMyShop();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isSuccess) {
      return;
    }

    if (data) {
      router.push("/shops/my");
    }
  }, [isLoading, isSuccess, data, router]);

  return (
    <Layout signInRequired>
      <Title order={3}>Register a new shop</Title>
      <Space h={20} />
      {}
      {!data && !error ? (
        <CreateShopForm />
      ) : error ? (
        <Text>{JSON.stringify(error)}</Text>
      ) : null}
      <LoadingOverlay visible={isLoading} overlayBlur={3} />
    </Layout>
  );
};

export default RegisterShopPage;
