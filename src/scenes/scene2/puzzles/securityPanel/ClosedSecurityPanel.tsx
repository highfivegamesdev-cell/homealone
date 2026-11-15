import { puzzleConfig } from "@/scenes/scene2/config";

type Props = {
  hasScrewdriver: boolean;
  onClick: () => void;
};

export const ClosedSecurityPanel = ({ hasScrewdriver, onClick }: Props) => (
  <div className="absolute left-1/2 top-1/2 h-full aspect-[936/881] -translate-x-1/2 -translate-y-1/2">
    <img
      src={puzzleConfig.securityPanel.closed}
      alt="Closed security panel"
      className="absolute inset-0 h-full w-full"
    />
    <button
      type="button"
      aria-label={
        hasScrewdriver
          ? "Open security panel with screwdriver"
          : "Security panel is not working"
      }
      onClick={onClick}
      className="absolute inset-0 h-full w-full cursor-pointer"
    />
  </div>
);
