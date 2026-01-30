const SHIRT_IMAGE =
  "https://img.ostin.com/upload/mdm/media_content/resize/ed5/867_1200_ba5a/172474120299.jpg?7"

export type ProductByCategory = {
  product_id: number
  product_name: string
  product_categoryId: number
  variant_id: number
  variant_sku: string
  variant_price: string
  variant_images: string[]
}

export const productByCategoryMock: Record<number, ProductByCategory[]> = {
  401: [
    {
      product_id: 101,
      product_name: "Рубашка базовая хлопковая",
      product_categoryId: 401,
      variant_id: 1001,
      variant_sku: "SHIRT101-WHT",
      variant_price: "2990.00",
      variant_images: [SHIRT_IMAGE],
    },
    {
      product_id: 101,
      product_name: "Рубашка базовая хлопковая",
      product_categoryId: 401,
      variant_id: 1002,
      variant_sku: "SHIRT101-BLK",
      variant_price: "3090.00",
      variant_images: [SHIRT_IMAGE],
    },
    {
      product_id: 102,
      product_name: "Рубашка повседневная",
      product_categoryId: 401,
      variant_id: 1003,
      variant_sku: "SHIRT102-BLU",
      variant_price: "3290.00",
      variant_images: [SHIRT_IMAGE],
    },
    {
      product_id: 102,
      product_name: "Рубашка повседневная",
      product_categoryId: 401,
      variant_id: 1004,
      variant_sku: "SHIRT102-GRY",
      variant_price: "3390.00",
      variant_images: [SHIRT_IMAGE],
    },
  ],

  402: [
    {
      product_id: 201,
      product_name: "Классическая сорочка",
      product_categoryId: 402,
      variant_id: 2001,
      variant_sku: "SOR201-WHT",
      variant_price: "3590.00",
      variant_images: [SHIRT_IMAGE],
    },
    {
      product_id: 201,
      product_name: "Классическая сорочка",
      product_categoryId: 402,
      variant_id: 2002,
      variant_sku: "SOR201-IVR",
      variant_price: "3690.00",
      variant_images: [SHIRT_IMAGE],
    },
    {
      product_id: 202,
      product_name: "Сорочка офисная slim",
      product_categoryId: 402,
      variant_id: 2003,
      variant_sku: "SOR202-WHT",
      variant_price: "3890.00",
      variant_images: [SHIRT_IMAGE],
    },
    {
      product_id: 202,
      product_name: "Сорочка офисная slim",
      product_categoryId: 402,
      variant_id: 2004,
      variant_sku: "SOR202-BLU",
      variant_price: "3990.00",
      variant_images: [SHIRT_IMAGE],
    },
  ],

  403: [
    {
      product_id: 301,
      product_name: "Рубашка с коротким рукавом",
      product_categoryId: 403,
      variant_id: 3001,
      variant_sku: "SHRT301-GRY",
      variant_price: "2590.00",
      variant_images: [SHIRT_IMAGE],
    },
    {
      product_id: 301,
      product_name: "Рубашка с коротким рукавом",
      product_categoryId: 403,
      variant_id: 3002,
      variant_sku: "SHRT301-OLV",
      variant_price: "2690.00",
      variant_images: [SHIRT_IMAGE],
    },
    {
      product_id: 302,
      product_name: "Летняя рубашка",
      product_categoryId: 403,
      variant_id: 3003,
      variant_sku: "SHRT302-BLU",
      variant_price: "2790.00",
      variant_images: [SHIRT_IMAGE],
    },
    {
      product_id: 302,
      product_name: "Летняя рубашка",
      product_categoryId: 403,
      variant_id: 3004,
      variant_sku: "SHRT302-WHT",
      variant_price: "2890.00",
      variant_images: [SHIRT_IMAGE],
    },
  ],

  404: [
    {
      product_id: 401,
      product_name: "Поло классическое",
      product_categoryId: 404,
      variant_id: 4001,
      variant_sku: "POLO401-BLK",
      variant_price: "2490.00",
      variant_images: [SHIRT_IMAGE],
    },
    {
      product_id: 401,
      product_name: "Поло классическое",
      product_categoryId: 404,
      variant_id: 4002,
      variant_sku: "POLO401-WHT",
      variant_price: "2590.00",
      variant_images: [SHIRT_IMAGE],
    },
    {
      product_id: 402,
      product_name: "Поло хлопковое",
      product_categoryId: 404,
      variant_id: 4003,
      variant_sku: "POLO402-NVY",
      variant_price: "2690.00",
      variant_images: [SHIRT_IMAGE],
    },
    {
      product_id: 402,
      product_name: "Поло хлопковое",
      product_categoryId: 404,
      variant_id: 4004,
      variant_sku: "POLO402-GRY",
      variant_price: "2790.00",
      variant_images: [SHIRT_IMAGE],
    },
  ],

  405: [
    {
      product_id: 501,
      product_name: "Гавайская рубашка",
      product_categoryId: 405,
      variant_id: 5001,
      variant_sku: "HAW501-RED",
      variant_price: "3190.00",
      variant_images: [SHIRT_IMAGE],
    },
    {
      product_id: 501,
      product_name: "Гавайская рубашка",
      product_categoryId: 405,
      variant_id: 5002,
      variant_sku: "HAW501-BLU",
      variant_price: "3290.00",
      variant_images: [SHIRT_IMAGE],
    },
    {
      product_id: 502,
      product_name: "Гавайская рубашка тропик",
      product_categoryId: 405,
      variant_id: 5003,
      variant_sku: "HAW502-GRN",
      variant_price: "3390.00",
      variant_images: [SHIRT_IMAGE],
    },
    {
      product_id: 502,
      product_name: "Гавайская рубашка тропик",
      product_categoryId: 405,
      variant_id: 5004,
      variant_sku: "HAW502-YLW",
      variant_price: "3490.00",
      variant_images: [SHIRT_IMAGE],
    },
  ],
}
