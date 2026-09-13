// This component creates the Payout Table on the Game page. The table takes information about the winning combinations from global store.

import { useGlobalStore } from "../../Store";
import "./PayoutTable.css";
export default function PayoutTable() {
  const winCombinations = useGlobalStore((store) => store.winCombination);

  return (
    <table>
      <caption>Payout Table</caption>
      <colgroup>
        <col className="win-combinations" />
        <col span={1} className="payout1" />
        <col span={1} className="payout2" />
        <col span={1} className="payout3" />
        <col span={1} className="payout4" />
        <col span={1} className="payout5" />
      </colgroup>
      <thead>
        <th scope="col">Win Combination</th>
        <th scope="col">Payout Bet 1</th>
        <th scope="col">Payout Bet 2</th>
        <th scope="col">Payout Bet 3</th>
        <th scope="col">Payout Bet 4</th>
        <th scope="col">Payout Bet 5</th>
      </thead>

      {winCombinations.map((combination) => (
        <tbody>
          <th scope="row">{combination.name}</th>
          <td>{combination.payout}</td>
          <td>{combination.payout * 2}</td>
          <td>{combination.payout * 3}</td>
          <td>{combination.payout * 4}</td>
          <td>{combination.payout * 5}</td>
        </tbody>
      ))}
    </table>
  );
}
