import type { ProductImage } from "../../types/productTypes"
import type { RefObject } from "react"

type Props = {
    productName: string
    images: ProductImage[]
    imageRefs: RefObject<HTMLDivElement[]>
}

export function ProductImageGallery({
    productName,
    images,
    imageRefs,
}: Props) {
    const scrollToImage = (index: number) => {
        const ref = imageRefs.current?.[index]
        if (ref) ref.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    return (
        <div className="flex-1 flex gap-4">
            <div className="flex flex-col gap-2 w-20 sticky top-1/2 -translate-y-1/2 self-start">
                {images.map((img, idx) => (
                    <img
                        key={img.id}
                        src={img.url}
                        alt={`${productName} thumbnail ${idx}`}
                        className="w-full h-20 object-cover rounded cursor-pointer border"
                        onClick={() => scrollToImage(idx)}
                    />
                ))}
            </div>

            <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
                {images.map((img, idx) => (
                    <div
                        key={img.id}
                        ref={el => {
                            if (el && imageRefs.current) {
                                imageRefs.current[idx] = el
                            }
                        }}
                    >
                        <img
                            src={img.url}
                            alt={`${productName} ${idx}`}
                            className="w-full object-contain rounded border"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
