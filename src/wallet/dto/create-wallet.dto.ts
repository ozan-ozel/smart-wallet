import { Currency } from "../../currency/currency.entity";
import { User } from "../../user/user.entity";

export class CreateWalletDto {
	name: string;
	balance: number;
  user: User;
  currency: Currency
}
