// A generic container inspired by the container component shown by Vegar Norman in class.
import "./Container.css";

export type ContainerProps = {
  children: React.ReactNode;
  as?: "div" | "section" | "main";
};

export default function Container({ children, as = "div" }: ContainerProps) {
  const Element = as;

  return <Element className="container">{children}</Element>;
}
