// ================= PRODUCT =================
export type Product = {
    id: number
    name: string
    slug: string
    price: number
    oldPrice:number
    sale_price?: number
    discount_price?: number
    quantity?: number
    description?: string
    short_description?: string
    sku?: string
    stock_status?: 'IN_OF_STOCK' | 'OUT_OF_STOCK'
    allow_checkout_when_out_of_stock?: boolean
    with_storehouse_management?: boolean
    is_featured?: boolean
    reviews:number
    // ================= RELATIONS =================
    brand?: Brand
    categories?: Category[]
    labels?: Label[]
    collections?: ProductCollection[]
    store?: Store
    related_products?: Product[]
    mostRating?: Product[]
    recentViewsproducts?: Product[]
    // ================= IMAGES =================
    image?: Image // image principale
    images?: Image[] // galerie
    tags:[]
    created_at:string
    status:string
}

// ================= IMAGE =================
export type Image = {
    id: number
    name?: string
    src: string
    alt?: string
    thumb?:string
    medium?:string
}

// ================= BRAND =================
export type Brand = {
    id: number
    name: string
    image?: Image
}

// ================= CATEGORY =================
export type Category = {
    id: number
    name: string
    slug: string
    short_description?: string
    description?: string
    status?: string
    is_featured?: boolean
    order?: number
    parent_id?: number
    image?: Image
    children?: Category[]
    products_count?: number
}

// ================= LABEL =================
export type Label = {
    id: number
    name: string
    color?: string
    status?: string
}

// ================= PRODUCT COLLECTION =================
export type ProductCollection = {
    id: number
    name: string
    slug: string
    description?: string
    status?: string
    image?: Image
    products?: Product[]
}

// ================= STORE =================
export type Store = {
    id: number
    name: string
    email?: string
    phone?: string
    address?: string
    neighborhood?: string
    city_id?: number
    vendor_id?: number
    logo?: Image
    cover_image?: Image
    description?: string
    content?: string
    status?: string
    vendor_verified_at?: string
    zip_code?: string
    company?: string
    certificate_file?: string
    government_id_file?: string
    reviews:number
    rating:number
    shipOnTime:number
    chatResponse:number
    created_at:string
}

// ================= ORDER =================
export type Order = {
    /* ================= BASIC ================= */
    id: number;
    token?: string;
    status: string;
    is_confirmed: boolean;
    is_finished: boolean;

    /* ================= AMOUNTS ================= */
    amount: number;
    sub_total: number;
    tax_amount: number;
    shipping_amount: number;
    discount_amount: number;
    discount_description?: string | null;

    /* ================= SHIPPING ================= */
    shipping_option?: string | null;
    shipping_method?: string | null;

    /* ================= CUSTOMER ================= */
    customer?: {
        id: number;
        name: string;
        email: string;
    };

    /* ================= STORE ORDERS ================= */
    store_orders: StoreOrder[];

    /* ================= ADDRESS ================= */
    address?: {
        id?: number;
        name: string;
        phone: string;
        email?: string;
        country?: string;
        state?: string;
        city: string;
        address: string;
    };

    /* ================= PAYMENT ================= */
    currency_id?: number | null;
    payment_id?: number | null;

    /* ================= DATES ================= */
    created_at: string;
    updated_at: string;
};


// ================= ORDER PRODUCT =================
export type OrderProduct = {
    id?: number
    product_id?: number
    product_name: string
    qty: number
    price: number
    tax_amount?: number
    weight?: number
    options?: Record<string, any>
    product?: Product
}
export type StoreOrder = {
    id: number;
    store: {
        id: number;
        name: string;
    };
    status: string;
    payment_status: string;
    total_amount: number;
    products: OrderProduct[];
    created_at:string;

};
export type StoreAdminOrder = {
    id: number;
    store: {
        id: number;
        name: string;
    };
    status: string;
    payment_status: string;
    total_amount: number;
    products: OrderProduct[];
    order:{
        customer?: {
            id: number;
            name: string;
            email: string;
        };
        address?: {
            id?: number;
            name: string;
            phone: string;
            email?: string;
            country?: string;
            state?: string;
            city: string;
            address: string;
        };
    },
    created_at:string
};
// ================= ORDER ADDRESS =================
export type OrderAddress = {
    id: number
    name: string
    phone?: string
    email?: string
    country?: string
    state?: string
    city?: string
    address?: string
    order_id?: number
}

// ================= USER =================
export type User = {
    id: number
    name: string
    email?: string
    phone?: string
}
export type Tab = {
    title: string
    products: Product[]
}
export type ResponsePaginate<T> = {
    massage: string
    data: T[]
    meta:{
        current_page:number
        last_page:number
        total:number
    }
}
type AttributeItem = {
    id: number
    name: string
    values: string
}
export type Attribute = {
    id: number;
    title: string;
    color?: string;
    status: string;
    attribute_set?: {
        id: number;
        title: string;
    };
};
export type AttributeSet = {
    id: number;
    title: string;
    display_layout: string;
    is_searchable: boolean;
    is_comparable: boolean;
    is_use_in_product_listing: boolean;
    status: string;
};
export type VendorDashbord={
    stats:{
        revenue:number
        monthly_earning:number
        products:number
        orders:number;
    }
    latest_orders:storeOrderDasahboard[]
}
type storeOrderDasahboard={
    id  :  number,
    customer  :  string,
    date        :  string,
    total       :  number,
    status      :  string,
    payment_status :  string,

}
export type Slider = {
    id: number
    title: string
    position: string
    btn_text: string
    image?: Image
    href?: string
    is_active?: boolean;
    created_at?: string;
    description?: string
}
export type Banner = {
    id: number
    title: string
    placement: string
    image?: Image
    href?: string
    is_active?: boolean;
    created_at?: string;
}
export type Zone = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
};

export type City = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    zones?: Zone[];
};
export type ShippingMethod = {
    id: number;
    name: string;
    title: string;
    description: string;
    type: "distance" | "fixed";
    base_price: number;
    price_per_km?: number;
    city_id: number | null;
    is_free: boolean;
    active: boolean;
};
