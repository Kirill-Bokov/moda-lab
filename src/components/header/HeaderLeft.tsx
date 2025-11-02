import { CatalogButton } from "./catalogButton/CatalogButton";
import GenderToggle from "../genderToggle/GenderToggle";
import { Logo } from "../logo/Logo";

export default function HeaderLeft() {
  return (
    <div className="flex items-center gap-4">
      <Logo />
      <CatalogButton />
      <GenderToggle />
    </div>
  );
}
