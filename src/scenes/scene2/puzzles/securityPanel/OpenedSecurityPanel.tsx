import { puzzleConfig } from "@/scenes/scene2/config";

type Props = {
  firstPassword: string;
  secondPassword: string;
  onFirstPasswordChange: (value: string) => void;
  onSecondPasswordChange: (value: string) => void;
};

const inputClassName =
  "h-10 w-full rounded border-2 border-gray-400 bg-slate-950/90 px-3 text-center text-base text-white outline-none focus:border-yellow-300 md:h-12 md:text-xl";

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
    <label className="absolute left-[36%] top-[56%] w-[32%]">
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
    <label className="absolute left-[36%] top-[76.5%] w-[32%]">
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
