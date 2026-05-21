export type MadokaLineProps = {
  direction: "level" | "vertical";
  move: number;
  position: "top" | "left" | "right" | "bottom";
  defaultPos?: number;
  delay?: number;
  show: boolean;
};
