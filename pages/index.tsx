import Layout from "@components/Layout/Layout";
import { Title } from "@mantine/core";
import type { NextPage } from "next";

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <Title order={3}>We are about to build something awesome 🚀</Title>
    </Layout>
  );
};

export default IndexPage;
