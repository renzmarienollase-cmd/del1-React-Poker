// This component creates the Payout Table on the Game page. The table takes information about the winning combinations from global store.

import { useGlobalStore } from "../../Stores";
import "./PayoutTable.css";
export default function PayoutTable() {
  const winConditions = useGlobalStore((store) => store.winConditionsList);

  return (
    <div className="payout-table-container">
      <table
        className="bg-glass"
        aria-label="Payout Table with winning combinations and corresponding payout."
      >
        <colgroup>
          <col className="win-combinations" />
          <col span={1} className="payout1" />
          <col span={1} className="payout2" />
          <col span={1} className="payout3" />
          <col span={1} className="payout4" />
          <col span={1} className="payout5" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" className="win-combinations">
              Win Combinations
            </th>
            <th scope="col">Payout Bet 1</th>
            <th scope="col">Payout Bet 2</th>
            <th scope="col">Payout Bet 3</th>
            <th scope="col">Payout Bet 4</th>
            <th scope="col">Payout Bet 5</th>
          </tr>
        </thead>
        <tbody>
          {winConditions.map((combination) => (
            <tr key={combination.id}>
              <th scope="row" className="win-combinations">
                {combination.name}
              </th>
              <td>{combination.payout}</td>
              <td>{combination.payout * 2}</td>
              <td>{combination.payout * 3}</td>
              <td>{combination.payout * 4}</td>
              <td>{combination.payout * 5}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
