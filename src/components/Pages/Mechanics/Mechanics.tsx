// This component explains the game mechanics and how to win.

import PayoutTable from "../../PayoutTable/PayoutTable";
import "./Mechanics.css";

export default function Mechanics() {
  return (
    <main className="mechanics-page">
      <h1>How to play Video Poker</h1>
      <ol className="bg-glass">
        <li>
          Place your bet by clicking on the Bet (+) button. Your starting bet is
          1 and can be increased using the increase button. Maximum bet is 5.
        </li>
        <li>
          Start the round by clicking “Deal”. The game will deal you your first
          five cards face up.
        </li>
        <li>
          Choose what to keep by clicking on the Hold button underneath each
          card. You select which cards to “hold” and which to discard.
        </li>
        <li>
          Draw new cards. Hit “Draw,” and any cards you didn’t hold are replaced
          with new ones.
        </li>
        <li>
          Get paid. Your final five-card hand is compared against the pay table.
          If it matches a winning combination, you’re paid out according to how
          much you bet and its equivalent payout.
        </li>
      </ol>

      <h2>How to Win</h2>
      <p className="long-text bg-glass">
        The objective is simple: land a five-card combination that appears on
        the pay table once your draw is locked in. <br />
        A hand is officially over the moment your replacement cards land after
        the draw. <br />
        The result is settled immediately: winning hands get credited, while
        losing hands simply clear the screen with no penalty beyond the coins
        wagered.
      </p>

      <h2>Hand Rankings and Payouts</h2>
      <p>
        Winning combinations follow poker’s ranking and has equivalent payouts
        that increase along with your bet.
      </p>
      <PayoutTable />

      <h2>The Maker</h2>
      <p>
        This game was created by Renz Marie Nollase. With references and
        inspiration from:
      </p>
      <ul>
        <li>
          <a href="https://gamerules.com/rules/video-poker/">
            Game Rules: Video Poker
          </a>
        </li>
        <li>
          <a href="https://www.freeslots.com/poker.htm">
            Free Slots: Video Poker
          </a>
        </li>
      </ul>
    </main>
  );
}
