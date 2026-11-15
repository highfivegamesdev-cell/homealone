import { puzzleConfig } from "@/scenes/scene2/config";

type Props = {
  hasScrewdriver: boolean;
  onClick: () => void;
};

export const ClosedSecurityPanel = ({ hasScrewdriver, onClick }: Props) => (
  <>
    <img
      src={puzzleConfig.securityPanel.closed}
      alt="Closed security panel"
      className="h-full w-full object-contain"
    />
    <button
      type="button"
      aria-label={
        hasScrewdriver
          ? "Open security panel with screwdriver"
          : "Security panel is not working"
      }
      onClick={onClick}
      className="absolute inset-0 h-full w-full"
    />
  </>
);
