import { UserShopDto } from "@context/NearContext";
import { Avatar, Card, Center, createStyles, Text, Title } from "@mantine/core";
import Link from "next/link";
import componentStyles from "./Shop.module.css";

interface Props {
  shop?: UserShopDto;
  usePlaceholder?: boolean;
}

const useStyles = createStyles((theme) => ({
  shop: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.colors.dark,
    },
  },
  shopLabel: {
    marginTop: "1rem",
  },
  avatarPlaceholder: {},
  textPlaceholder: {
    backgroundColor: theme.colors.cyan[9],
    borderRadius: "4px",
    width: "75%",
  },
  shimmer: {
    "&::before": {
      background: `linear-gradient(
        90deg,
        rgba(255,255,255,0) 0%,
        ${theme.fn.rgba(theme.colors.cyan[9], 0.4)} 50%,
        ${theme.colors.cyan[9]}
      )`,
    },
  },
}));

export const Shop = (props: Props) => {
  const { classes } = useStyles();
  const { shop, usePlaceholder } = props;
  if (usePlaceholder) {
    return (
      <Card
        withBorder
        className={`${classes.shimmer} ${componentStyles.shimmer}`}
      >
        <Center>
          <Avatar size={100} color="cyan" radius="xl">
            <Title>&nbsp;</Title>
          </Avatar>
        </Center>
        <Center className={classes.shopLabel}>
          <Text className={classes.textPlaceholder} weight={600} size={20}>
            &nbsp;
          </Text>
        </Center>
      </Card>
    );
  }

  if (!shop) {
    return null;
  }

  return (
    <Link href={`/shops/${shop.id}`}>
      <Card className={classes.shop} withBorder>
        <Center>
          <Avatar size={100} color="cyan" radius="xl">
            <Title>{shop.name.charAt(0)}</Title>
          </Avatar>
        </Center>
        <Center className={classes.shopLabel}>
          <Text weight={600} size={20}>
            {shop.name}
          </Text>
        </Center>
      </Card>
    </Link>
  );
};
