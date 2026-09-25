import "./CurrentBet.css";

type CurrentBetProps = {
  betValue: number;
  onBetClick: () => void;
};

export default function CurrentBet({ betValue, onBetClick }: CurrentBetProps) {
  return (
    <div className="bet-increase">
      <span id="bet-value">Bet {betValue}</span>
      <br />
      <button
        type="button"
        onClick={onBetClick}
        id="bet-button"
        aria-label="increase bet"
      >
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
}
