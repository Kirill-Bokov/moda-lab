import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { CatalogButton } from "./catalogButton/CatalogButton";

export default function HeaderLeft() {
  return (
    <div className="flex items-center gap-4">
      <span className="text-xl font-semibold cursor-pointer select-none">
        ModaLab
      </span>

      <CatalogButton></CatalogButton>

      <ToggleGroup.Root
        type="single"
        className="inline-flex rounded-md border border-gray-200"
      >
        <ToggleGroup.Item
          value="women"
          className="hidden md:flex px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Женщинам
        </ToggleGroup.Item>

        <ToggleGroup.Item
          value="men"
          className="hidden md:flex px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Мужчинам
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </div>
  );
}
