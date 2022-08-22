import { Product } from "@components/Product/Product";
import { Button, Center, Grid, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useListUserShopProducts } from "queries/useListUserShopProducts";
import componentClasses from "./ListUserShopProducts.module.css";

interface Props {
  id: string;
  my?: boolean;
}

export const ListUserShopProducts = ({ id, my }: Props) => {
  const { data, isSuccess, isLoading } = useListUserShopProducts(id);
  const router = useRouter();
  const placeholderProducts = new Array(3).fill(0);

  return (
    <Grid className={componentClasses.shopsGrid}>
      {isLoading ? (
        <>
          {placeholderProducts?.map((_, i) => (
            <Grid.Col md={4} lg={4} key={i}>
              <Product usePlaceholder />
            </Grid.Col>
          ))}
        </>
      ) : (
        <>
          {isSuccess && data?.length ? (
            data?.map((x) => (
              <Grid.Col md={4} lg={4} key={x.id}>
                <Product product={x} />
              </Grid.Col>
            ))
          ) : (
            <Grid.Col span={12}>
              <Center sx={{ flexDirection: "column", gap: "5px" }}>
                <Text weight={600} size={20}>
                  💔 No product yet
                </Text>
                {my ? (
                  <div>
                    <Button
                      onClick={() => router.push("/shops/my/add-product")}
                    >
                      Add a new one
                    </Button>
                  </div>
                ) : null}
              </Center>
            </Grid.Col>
          )}
        </>
      )}
    </Grid>
  );
};
