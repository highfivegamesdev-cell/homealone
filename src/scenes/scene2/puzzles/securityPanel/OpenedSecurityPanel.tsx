import { puzzleConfig } from "@/scenes/scene2/config";

type Props = {
  firstPassword: string;
  secondPassword: string;
  onFirstPasswordChange: (value: string) => void;
  onSecondPasswordChange: (value: string) => void;
};

const inputClassName =
  "w-full rounded border border-gray-500 bg-white/90 px-1 text-center text-xs text-black outline-none focus:border-blue-600 md:text-base";

export const OpenedSecurityPanel = ({
  firstPassword,
  secondPassword,
  onFirstPasswordChange,
  onSecondPasswordChange,
}: Props) => (
  <>
    <img
      src={puzzleConfig.securityPanel.opened}
      alt="Opened security panel"
      className="h-full w-full object-contain"
    />
    <label className="absolute left-1/2 top-[57%] w-[20%] -translate-x-1/2 -translate-y-1/2">
      <span className="sr-only">First battery password</span>
      <input
        type="text"
        autoComplete="off"
        aria-label="First battery password"
        value={firstPassword}
        onChange={(event) => onFirstPasswordChange(event.target.value)}
        className={inputClassName}
      />
    </label>
    <label className="absolute left-1/2 top-[77%] w-[20%] -translate-x-1/2 -translate-y-1/2">
      <span className="sr-only">Second battery password</span>
      <input
        type="text"
        autoComplete="off"
        aria-label="Second battery password"
        value={secondPassword}
        onChange={(event) => onSecondPasswordChange(event.target.value)}
        className={inputClassName}
      />
    </label>
  </>
);
