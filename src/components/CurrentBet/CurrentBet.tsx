type CurrentBetProps = {
  betValue: number;
  onBetClick: () => void;
};

export default function CurrentBet({ betValue, onBetClick }: CurrentBetProps) {
  return (
    <>
      <span>Bet</span>
      <span>{betValue}</span>
      <br />
      <button type="button" onClick={onBetClick} id="bet-btn">
        +
      </button>
    </>
  );
}
