import { CreateProductForm } from "@components/CreateProductForm/CreateProductForm";
import Layout from "@components/Layout/Layout";
import { Space, Title } from "@mantine/core";
import { NextPage } from "next";

const AddProductPage: NextPage = () => {
  return (
    <Layout signInRequired>
      <Title order={3}>Add a new product</Title>
      <Space h={20} />
      <CreateProductForm />
    </Layout>
  );
};

export default AddProductPage;
