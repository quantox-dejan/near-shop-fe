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

interface ChangeMethodOptions {
  callbackUrl?: string;
  meta?: string;
  args: Record<string, string | number>;
  gas?: string;
  amount?: string | null;
}

type ViewMethodOptions = Record<string, string | number>;

export interface UserShopDto {
  id: string;
  name: string;
}

export interface ProductDto {
  id: String;
  name: String;
  price: string;
  quantity_on_stock: number;
}

export interface CouponDto {
  id: String;
  code: String;
  discount_percentage: number;
  applies_to_all_products: boolean;
  applies_to_products: Array<ProductDto>;
  applies_to_all_users: boolean;
  applies_to_user: string | undefined;
  is_one_time: boolean;
  times_used: number;
}

export interface ContractInterface extends Contract {
  get_my_user_shop(): UserShopDto | undefined;
  list_my_user_shop_products(): Array<ProductDto>;
  list_all_user_shops(): Array<UserShopDto>;
  list_user_shop_products(user_shop_id: string): Array<ProductDto>;
  get_user_shop_product(
    user_shop_id: string,
    product_id: string
  ): ProductDto | undefined;
  list_my_user_shop_coupons(): Array<CouponDto>;
  get_product_cost_using_coupon(
    user_shop_id: string,
    product_id: string,
    quantity: number,
    coupon_code: string
  ): string;

  // Write methods
  add_user_shop(name: string): void;
  add_product(name: string, price: string, quantity: number): void;
  update_product_quantity(product_id: string, quantity: number): void;
  add_default_coupon(code: string, discount_percentage: number): void;
  add_specific_coupon(
    code: string,
    discount_percentage: number,
    applies_to_products: Array<string>,
    applies_to_user: string | undefined,
    is_one_time: boolean
  ): void;
  buy_product(
    user_shop_id: string,
    product_id: string,
    quantity: number,
    using_coupon_code: string | undefined
  ): Promise<void>;
}

const viewMethods: string[] = [
  "get_my_user_shop",
  "list_my_user_shop_products",
  "list_all_user_shops",
  "list_user_shop_products",
  "get_user_shop_product",
  "list_my_user_shop_coupons",
  "get_product_cost_using_coupon",
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
