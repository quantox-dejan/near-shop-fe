import Layout from "@components/Layout/Layout";
import { ListUserShopProducts } from "@components/ListUserShopProducts/ListUserShopProducts";
import { LoadingOverlay, Text, Title } from "@mantine/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useGetUserShopById } from "queries/useGetUserShopById";

const UserShopPage: NextPage = () => {
  const {
    query: { id },
  } = useRouter();
  const { data, isLoading, isSuccess, error } = useGetUserShopById(
    id as string
  );

  return (
    <Layout>
      <Title order={3}>{data?.name ?? "User shop"}</Title>
      {isSuccess && !data ? null : isSuccess && !!data ? (
        <ListUserShopProducts id={data.id} />
      ) : error ? (
        <Text>{JSON.stringify(error)}</Text>
      ) : null}
      <LoadingOverlay visible={isLoading} overlayBlur={3} />
    </Layout>
  );
};

export default UserShopPage;
