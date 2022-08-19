import { getNearConfig, NEAR_ENV } from "@config/near";
import {
  connect,
  Contract,
  keyStores,
  Near,
  WalletConnection,
} from "near-api-js";
import { NearConfig } from "near-api-js/lib/near";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface Context {
  near: Near | undefined;
  walletConnection: WalletConnection | undefined;
  accountId: any;
  contract: Partial<ContractInterface> | undefined;
  config: any;
  loading: boolean;
  reset(): void;
}

export const NearContext = createContext<Context | undefined>(undefined);

export default function useNearContext(): Context {
  return useContext(NearContext) ?? ({} as Context);
}

interface ChangeMethodOptions<T> {
  callbackUrl?: string;
  meta?: string;
  args: Partial<T>;
  gas?: string;
  amount?: string | null;
}

type ViewMethodOptions<T> = T;

export interface OwnedEntityInput {
  user_account_id: string;
}

export interface UserShopDto {
  id: string;
  name: string;
}

export interface ProductDto {
  id: string;
  name: string;
  price: string;
  quantity_on_stock: number;
}

export interface CreateProductDto {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

export interface UpdateProductQuantityDto {
  product_id: string;
  quantity: number;
}

export interface CouponDto {
  id: string;
  code: string;
  discount_percentage: number;
  applies_to_all_products: boolean;
  applies_to_products: Array<ProductDto>;
  applies_to_all_users: boolean;
  applies_to_user: string | undefined;
  is_one_time: boolean;
  times_used: number;
}

export interface UpdateCouponDto {
  code: string;
  discount_percentage: number;
  applies_to_products: Array<string>;
  applies_to_user: string | undefined;
  is_one_time: boolean;
}

export interface BuyProductDto {
  user_shop_id: string;
  product_id: string;
  quantity: number;
  using_coupon_code: string | undefined;
}

type ListUserShopProductsParams = { user_shop_id: string };
type GetUserShopProductParams = { user_shop_id: string; product_id: string };
type GetProductCostUsingCouponParams = {
  user_shop_id: string;
  product_id: string;
  quantity: number;
  coupon_code: string;
};

export interface ContractInterface extends Contract {
  get_my_user_shop(
    opts?: ViewMethodOptions<OwnedEntityInput>
  ): Promise<UserShopDto | undefined>;
  list_my_user_shop_products(
    opts?: ViewMethodOptions<OwnedEntityInput>
  ): Promise<Array<ProductDto>>;
  list_all_user_shops(
    opts?: ViewMethodOptions<void>
  ): Promise<Array<UserShopDto>>;
  list_user_shop_products(
    opts?: ViewMethodOptions<ListUserShopProductsParams>
  ): Promise<Array<ProductDto>>;
  get_user_shop_product(
    opts?: ViewMethodOptions<GetUserShopProductParams>
  ): Promise<ProductDto | undefined>;
  list_my_user_shop_coupons(
    opts?: ViewMethodOptions<OwnedEntityInput>
  ): Promise<Array<CouponDto>>;
  get_product_cost_using_coupon(
    opts?: ViewMethodOptions<GetProductCostUsingCouponParams>
  ): Promise<string>;

  // Write methods
  add_user_shop(opts?: ChangeMethodOptions<UserShopDto>): Promise<void>;
  add_product(opts?: ChangeMethodOptions<CreateProductDto>): Promise<void>;
  update_product_quantity(
    opts?: ChangeMethodOptions<UpdateProductQuantityDto>
  ): Promise<void>;
  add_default_coupon(
    opts?: ChangeMethodOptions<UpdateCouponDto>
  ): Promise<void>;
  add_specific_coupon(
    opts?: ChangeMethodOptions<UpdateCouponDto>
  ): Promise<void>;
  buy_product(opts?: ChangeMethodOptions<BuyProductDto>): Promise<void>;
}

const viewMethods: string[] = [
  "get_my_user_shop",
  "list_my_user_shop_products",
  "list_my_user_shop_coupons",
  "list_user_shop_products",
  "get_user_shop_product",
  "get_product_cost_using_coupon",
  "list_all_user_shops",
];
const changeMethods: string[] = [
  "add_user_shop",
  "add_product",
  "update_product_quantity",
  "add_default_coupon",
  "add_specific_coupon",
  "buy_product",
];

export function NearProvider({ children }: PropsWithChildren<unknown>) {
  const [near, setNear] = useState<Near>();
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<NearConfig>();
  const [walletConnection, setWalletConnection] = useState<WalletConnection>();
  const [accountId, setAccountId] = useState();
  const [contract, setContract] = useState<Partial<ContractInterface>>();

  useEffect(() => {
    async function main() {
      const config = {
        ...getNearConfig(NEAR_ENV.DEVELOPMENT),
        deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() },
        headers: {},
      };

      if (!config.contractName) {
        throw Error("[NearContext]: No contract provided!");
      }

      const near = await connect(config);

      const walletConnection = new WalletConnection(near, config.contractName);

      const contract = new Contract(
        walletConnection.account(),
        config.contractName,
        {
          viewMethods,
          changeMethods,
        }
      );

      setNear(near);
      setConfig(config);
      setWalletConnection(walletConnection);
      setAccountId(walletConnection.getAccountId());
      setContract(contract);
      setLoading(false);
    }

    main();
  }, []);

  function reset() {
    setNear(undefined);
    setConfig(undefined);
    setWalletConnection(undefined);
    setAccountId(undefined);
    setContract(undefined);
  }

  const value = {
    near,
    walletConnection,
    accountId,
    contract,
    config,
    loading,
    reset,
  };

  return <NearContext.Provider value={value}>{children}</NearContext.Provider>;
}
