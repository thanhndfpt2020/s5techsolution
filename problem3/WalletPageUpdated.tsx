interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
  }
  
  interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
  }
  
  interface Props extends BoxProps {}

const blockchainPriority: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: string): number =>
  blockchainPriority[blockchain] ?? -99;

const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();
  
    const sortedBalances = useMemo(() => {
      return balances
        .filter((balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)
        .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain));
    }, [balances]);
  
    const rows = sortedBalances.map((balance: WalletBalance) => {
      const usdValue = (prices[balance.currency] ?? 0) * balance.amount;
      const formattedAmount = balance.amount.toFixed(2);
  
      return (
        <WalletRow
          key={`${balance.currency}-${balance.blockchain}`}
          className={classes.row}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={formattedAmount}
        />
      );
    });
  
    return (
      <div {...rest}>
        {rows}
      </div>
    );
  };