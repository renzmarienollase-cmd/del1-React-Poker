import "./Card.css";

type CardProps = {
  variant: "front" | "back";
  suite?: string;
  value?: number;
  isHeld?: boolean;
};

export default function Card({ variant, suite, value, isHeld }: CardProps) {
  return (
    <article className="hand-card">
      {!isHeld ? (
        <span className="status"></span>
      ) : (
        <span className="status">Held</span>
      )}
      {variant !== "front" ? (
        <div className={`deck-card ${variant}`}></div>
      ) : (
        <div className={`deck-card ${variant}`}>
          <h3>
            This is {value} of {suite}s
          </h3>
        </div>
      )}

      {variant !== "front" ? (
        <></>
      ) : (
        <button type="button">
          {!isHeld ? <span>Hold</span> : <span>Release</span>}
        </button>
      )}
    </article>
  );
}
