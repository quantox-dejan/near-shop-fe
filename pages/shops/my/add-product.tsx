import Layout from "@components/Layout/Layout";
import { Title } from "@mantine/core";
import { NextPage } from "next";

const AddProductPage: NextPage = () => {
  return (
    <Layout signInRequired>
      <Title order={3}>Add a new product</Title>
    </Layout>
  );
};

export default AddProductPage;
