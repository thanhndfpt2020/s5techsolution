import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useTokenSwapData } from '../hooks/useTokenSwapData';



export default function SwapForm() {

  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    tokenList,
    prices,
    from,
    to,
    setFrom,
    setTo
  } = useTokenSwapData();

  const rate = prices[from] && prices[to] ? prices[from] / prices[to] : 0;
  const estimated = rate && amount ? Number(amount) * rate : 0;
  const isValid =
    from !== to &&
    !!amount &&
    !isNaN(Number(amount)) &&
    Number(amount) > 0 &&
    rate > 0;

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };
  const handleReset = () => {
    setFrom(tokenList[0].symbol);
    setTo(tokenList[1].symbol);
    setAmount('');
  };

  const getTokenImage = (symbol: string) =>
    `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${symbol}.svg`;

  return (
    <div className="max-w-md w-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900 via-purple-800 to-blue-900 p-6 rounded-3xl shadow-2xl text-white border border-indigo-400/20 backdrop-blur-md">
    <h2 className="text-3xl font-extrabold mb-6 text-center text-cyan-300 drop-shadow-md tracking-wide">
      🔁 Token Swap
    </h2>

    <div className="space-y-5">
      {/* From */}
      <div>
        <label className="block mb-1 text-sm text-cyan-100">From</label>
        <div className="flex items-center bg-white/10 rounded-xl px-3 py-2 shadow-inner border border-white/20 backdrop-blur-sm">
          <img src={getTokenImage(from)} alt={from} className="w-6 h-6 mr-2" />
          <select
            className="flex-grow bg-transparent text-white focus:outline-none"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            {tokenList.map((t) =>
              prices[t.symbol] ? (
                <option key={t.id} value={t.symbol} className="text-black">
                  {t.symbol}
                </option>
              ) : null
            )}
          </select>
        </div>
      </div>

      {/* Swap Icon */}
      <div className="text-center">
        <motion.button
          onClick={handleSwap}
          whileTap={{ rotate: 90 }}
          className="bg-gradient-to-r from-pink-400 to-purple-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          ⇅
        </motion.button>
      </div>

      {/* To */}
      <div>
        <label className="block mb-1 text-sm text-cyan-100">To</label>
        <div className="flex items-center bg-white/10 rounded-xl px-3 py-2 shadow-inner border border-white/20 backdrop-blur-sm">
          <img src={getTokenImage(to)} alt={to} className="w-6 h-6 mr-2" />
          <select
            className="flex-grow bg-transparent text-white focus:outline-none"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            {tokenList.map((t) =>
              prices[t.symbol] ? (
                <option key={t.id} value={t.symbol} className="text-black">
                  {t.symbol}
                </option>
              ) : null
            )}
          </select>
        </div>
      </div>

      {/* Amount */}
      <div>
        <label className="block mb-1 text-sm text-cyan-100">Amount</label>
        <input
          type="text"
          className="w-full p-2 rounded-xl text-white bg-white/10 border border-white/20 shadow-inner backdrop-blur-sm focus:outline-none"
          placeholder="0.0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {!amount || isNaN(Number(amount)) || Number(amount) <= 0 ? (
          <p className="text-red-300 text-sm mt-1">Enter a positive number.</p>
        ) : from === to ? (
          <p className="text-red-300 text-sm mt-1">
            Choose two different tokens.
          </p>
        ) : null}
      </div>

      {/* Rate Display */}
      <div className="bg-white/10 p-4 rounded-xl text-center shadow-inner border border-white/20 backdrop-blur-sm">
        <p className="text-sm text-cyan-100">Rate:</p>
        <p className="font-semibold text-cyan-300 text-lg drop-shadow">
          1 {from} ≈ {rate ? rate.toFixed(6) : '–'} {to}
        </p>
        {estimated > 0 && (
          <p className="text-sm text-cyan-100 mt-1">
            You will receive ≈{' '}
            <span className="font-semibold text-cyan-200">
              {estimated.toFixed(6)}
            </span>{' '}
            {to}
          </p>
        )}
      </div>

      {/* Reset or Submit */}
      <div className="flex gap-4">
        <button
          onClick={handleReset}
          disabled={!isValid || loading}
          className={`w-1/2 p-3 rounded-xl font-semibold shadow-lg transition ${
            !isValid || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-500 to-red-700 hover:brightness-110'
          }`}
        >
          Reset
        </button>
        <button
          onClick={handleSwap}
          disabled={!isValid || loading}
          className={`w-1/2 p-3 rounded-xl font-semibold shadow-lg transition ${
            !isValid || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-400 to-green-600 hover:brightness-110'
          }`}
        >
          {loading ? 'Processing...' : `Swap ${to} → ${from}`}
        </button>
      </div>
    </div>

    <Toaster position="bottom-center" />
  </div>
  );
}
