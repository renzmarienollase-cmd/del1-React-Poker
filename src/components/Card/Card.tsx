import "./Card.css";

type CardProps = {
  variant: "front" | "back";
  suite?: string;
  value?: number;
  isHeld?: boolean;
};

export default function Card({ variant, suite, value, isHeld }: CardProps) {
  return (
    <article className={variant}>
      {variant !== "front" ? (
        <></>
      ) : (
        <div>
          {!isHeld ? <></> : <span>Held</span>}
          <h3>
            This is a {value} of {suite}
          </h3>
        </div>
      )}
    </article>
  );
}
