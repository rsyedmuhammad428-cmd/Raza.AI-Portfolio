import { SelectablePill } from "@/components/SelectablePill";

type ArchitectureNodeProps = {
  label: string;
  active: boolean;
  /** Marks the branching agent tier so it reads as a distinct layer even when inactive. */
  emphasis?: boolean;
  onClick: () => void;
};

export function ArchitectureNode({ label, active, emphasis, onClick }: ArchitectureNodeProps) {
  return (
    <SelectablePill active={active} emphasis={emphasis} onClick={onClick}>
      {label}
    </SelectablePill>
  );
}
