import Layout from "@components/Layout/Layout";
import { ListUserShopProducts } from "@components/ListUserShopProducts/ListUserShopProducts";
import { NoShopsYet } from "@components/NoShopsYet/NoShopsYet";
import { LoadingOverlay, Space, Text, Title } from "@mantine/core";
import { NextPage } from "next";
import { useGetMyShop } from "queries/useGetMyShop";

const MyShopPage: NextPage = () => {
  const { data, isLoading, isSuccess, error } = useGetMyShop();
  return (
    <Layout signInRequired>
      <Title order={3}>{!data ? "My shop" : `My shop - ${data.name}`}</Title>
      <Space h={20} />
      {isSuccess && !data ? (
        <NoShopsYet />
      ) : isSuccess && !!data ? (
        <ListUserShopProducts id={data.id} my />
      ) : error ? (
        <Text>{JSON.stringify(error)}</Text>
      ) : null}
      <LoadingOverlay visible={isLoading} overlayBlur={3} />
    </Layout>
  );
};

export default MyShopPage;
