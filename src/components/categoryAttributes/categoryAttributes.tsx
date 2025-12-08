import { AttributeItem } from "../attributeItem/AttributeItem";
import type { Attribute } from "../../types/catalogTypes";

type CategoryAttributesProps = {
  attributes?: Attribute[];
};

export function CategoryAttributes({ attributes }: CategoryAttributesProps) {
  return (
    <div className="bg-gray-200 p-4 rounded mb-6 flex flex-wrap gap-4">
      {attributes?.map((attribute) => {
        const id = Number(attribute.attributeId);
        return (
          <AttributeItem key={id} attributeId={id} attributeName={attribute.attributeName} values={attribute.values} />
        );
      })}
    </div>
  );
}
