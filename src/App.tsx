import { FC, useState } from "react";

import "./styles.css";

/*
  Advised to keep all components in here, only css, no tests

  I was not able to finish the exercise in 40 minutes.  Things I missed:
  - super close on the fade-in animation, written just not hooked up
  - zero padding at the end of the numbers
  - formatting of the amount/price of quotes, including red & green css props
  - re-usable QuoteView
  - experiment with useMemo
  - use React.FC & generics
  - better names.
  - refactor state to 1 structure with 2 objects for simplicity
  */

type OrderButtonsProps = {
  handleBuy: () => void;
  handleSell: () => void;
};

const OrderButtons: FC<OrderButtonsProps> = ({ handleBuy, handleSell }) => (
  <>
    <button className="button buy" onClick={handleBuy}>
      Buy
    </button>
    <button className="button sell" onClick={handleSell}>
      Sell
    </button>
  </>
);

type Quote = { amount: number; quote: number };
type QuoteViewProps = { quotes: Quote[]; type: string };

const QuoteView: FC<QuoteViewProps> = ({ quotes, type }) => (
  <div className="quotesContainer">
    {quotes.map((quote) => (
      <div
        className="quoteContainer fadeIn"
        key={`${quote.amount}-${quote.quote}`}
      >
        <div className="quoteItem">{quote.amount.toFixed(4)}</div>
        <div className={`quoteItem ${type}`}>{quote.quote.toFixed(2)}</div>
      </div>
    ))}
  </div>
);

// can't memoize the quoteview because then all the quotes are fadedin,
// not just the new ones.
type BidsProps = { bids: Quote[]; asks: Quote[] };
const Bids: FC<BidsProps> = ({ bids, asks }) => (
  <div>
    <QuoteView quotes={bids} type="buy" />
    <hr />
    <QuoteView quotes={asks} type="sell" />
  </div>
);

const genQuote = (): Quote => ({
  amount: Math.floor(Math.random() * 10000) / 10000,
  // rand 0..2000 + 37000
  quote: Math.floor((37000 + Math.random() * 2000) * 100) / 100
});

export default function App() {
  // I struggled here with the need to pass generic type into useState
  const [bids, setBids] = useState<Quote[]>([]);
  const [asks, setAsks] = useState<Quote[]>([]);

  const compare = (a: Quote, b: Quote) => a.quote - b.quote;

  const handleBuy = () => setBids([...bids, genQuote()].sort(compare));
  const handleSell = () => setAsks([...asks, genQuote()].sort(compare));

  return (
    <div className="App">
      <div>Order Desk</div>
      <OrderButtons handleBuy={handleBuy} handleSell={handleSell} />
      <Bids bids={bids} asks={asks} />
    </div>
  );
}
