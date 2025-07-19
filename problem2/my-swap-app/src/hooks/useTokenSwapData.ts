import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export type Token = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  price: number;
};
//Default reset interval: every 5 minutes
export const useTokenSwapData = (refreshIntervalMs = 500000) => {
  const [tokenList, setTokenList] = useState<Token[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');

  // Fetch token list once
  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 100,
          page: 1
        }
      })
      .then(res => {
        const data = res.data as any[];
        const tokens: Token[] = data.map(token => ({
          id: token.id,
          symbol: token.symbol.toUpperCase(),
          name: token.name,
          image: token.image,
          price: token.current_price
        }));

        setTokenList(tokens);
        if (tokens.length >= 2) {
          setFrom(tokens[0].symbol);
          setTo(tokens[1].symbol);
        }
      })
      .catch(() => toast.error('Failed to load token list'));
  }, []);

  // Refresh prices
  useEffect(() => {
    if (tokenList.length === 0) return;

    const fetchPrices = () => {
      const ids = tokenList.map(t => t.id).join(',');
      axios
        .get('https://api.coingecko.com/api/v3/simple/price', {
          params: { ids, vs_currencies: 'usd' }
        })
        .then(res => {
          const data = res.data;
          const p: Record<string, number> = {};
          tokenList.forEach(t => {
            if (data[t.id]?.usd) {
              p[t.symbol] = data[t.id].usd;
            }
          });
          setPrices(p);
        })
        .catch(() => toast.error('Failed to refresh token prices'));
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, refreshIntervalMs);
    return () => clearInterval(interval);
  }, [tokenList, refreshIntervalMs]);

  return {
    tokenList,
    prices,
    from,
    to,
    setFrom,
    setTo
  };
};