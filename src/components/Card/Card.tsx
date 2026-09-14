import "./Card.css";

type CardProps = {
  suite: string;
  value: number;
};

export default function Card({ suite, value }: CardProps) {
  return (
    <article>
      <h3>
        This is a {value} of {suite}
      </h3>
    </article>
  );
}
