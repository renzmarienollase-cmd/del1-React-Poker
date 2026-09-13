import CurrentBet from "../CurrentBet/CurrentBet";
import PayoutTable from "../PayoutTable/PayoutTable";
import { useState } from "react";

export default function Game() {
  const [currentBet, setCurrentBet] = useState<number>(1);

  function handleClickBet() {
    if (currentBet < 5) {
      setCurrentBet(currentBet + 1);
    } else if (currentBet === 5) {
      setCurrentBet(1);
    }
  }

  return (
    <section>
      <PayoutTable />
      <CurrentBet betValue={currentBet} onBetClick={handleClickBet} />
    </section>
  );
}
