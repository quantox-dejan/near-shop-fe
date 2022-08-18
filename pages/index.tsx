import Layout from "@components/Layout/Layout";
import { Shop } from "@components/Shop/Shop";
import {
  Button,
  Center,
  Grid,
  LoadingOverlay,
  Space,
  Text,
  Title,
} from "@mantine/core";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useListAllShopsQuery } from "queries/useListAllShopsQuery";
import componentClasses from "./index.module.css";

const IndexPage: NextPage = () => {
  const { isLoading, data } = useListAllShopsQuery();
  const router = useRouter();
  const placeholderShops = [
    { id: "1", name: "Lorem Ipsum" },
    { id: "2", name: "Ipsum Dolor" },
    { id: "3", name: "Dolor Sin Amet" },
  ];

  return (
    <Layout>
      <Title order={3}>All shops</Title>
      <Space h={20} />
      <Grid className={componentClasses.shopsGrid}>
        {isLoading ? (
          <>
            {placeholderShops?.map((x) => (
              <Grid.Col md={4} lg={4} key={x.id}>
                <Shop usePlaceholder />
              </Grid.Col>
            ))}
          </>
        ) : (
          <>
            {data?.length ? (
              data?.map((x) => (
                <Grid.Col md={4} lg={4} key={x.id}>
                  <Shop shop={x} />
                </Grid.Col>
              ))
            ) : (
              <Grid.Col span={12}>
                <Center sx={{ flexDirection: "column", gap: "5px" }}>
                  <Text weight={600} size={20}>
                    💔 No shops yet
                  </Text>
                  <div>
                    <Button onClick={() => router.push("/shops/register")}>
                      Register your own
                    </Button>
                  </div>
                </Center>
              </Grid.Col>
            )}
          </>
        )}
      </Grid>
    </Layout>
  );
};

export default IndexPage;
