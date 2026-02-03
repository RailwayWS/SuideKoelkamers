import { useMemo, useState } from "react";
import "./products.css";

import product1 from "../../assets/h2_product01.png";
import product2 from "../../assets/h2_product02.png";
import product3 from "../../assets/h2_product03.png";
import product4 from "../../assets/h2_product04.png";
import titleShapeImg from "../../assets/title_shape.png";

type Product = {
    id: number;
    name: string;
    category: string;
    price: string;
    img: string;
    isNew?: boolean;
};

const PRODUCTS: Product[] = [
    {
        id: 1,
        name: "ROAST CHICKEN",
        category: "ORGANIC",
        price: "4.99",
        img: product1,
        isNew: true,
    },
    {
        id: 2,
        name: "PROCESSED MEAT",
        category: "ORGANIC",
        price: "4.99",
        img: product2,
        isNew: true,
    },
    {
        id: 3,
        name: "VENISON MEAT",
        category: "ORGANIC",
        price: "4.99",
        img: product3,
        isNew: true,
    },
    {
        id: 4,
        name: "ROAST CHICKEN",
        category: "ORGANIC",
        price: "4.99",
        img: product4,
        isNew: true,
    },
];

export default function ProductsSection() {
    const [qtyById, setQtyById] = useState<Record<number, number>>({});

    const qty = useMemo(() => {
        const m = new Map<number, number>();
        for (const p of PRODUCTS) m.set(p.id, qtyById[p.id] ?? 1);
        return m;
    }, [qtyById]);

    const dec = (id: number) => {
        setQtyById((prev) => {
            const next = { ...prev };
            const current = next[id] ?? 1;
            next[id] = Math.max(1, current - 1);
            return next;
        });
    };

    const inc = (id: number) => {
        setQtyById((prev) => {
            const next = { ...prev };
            const current = next[id] ?? 1;
            next[id] = current + 1;
            return next;
        });
    };

    return (
        <section className="products-section">
            <div className="container products-container">
                {/* Header */}
                <div className="section-header">
                    <span className="subtitle-script">Organic Shop</span>
                    <h2 className="title-large">Our Organic Products</h2>
                    <div className="scissors-separator">
                        <img src={titleShapeImg} alt="Section separator" />
                    </div>
                </div>

                {/* Product Grid */}
                <div className="products-grid">
                    {PRODUCTS.map((product) => (
                        <div key={product.id} className="product-card">
                            {/* New Badge */}
                            {product.isNew && (
                                <div className="product-badge">
                                    NEW <span className="star">★</span>
                                </div>
                            )}

                            {/* Image */}
                            <div className="product-img-wrapper">
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="product-img"
                                />
                            </div>

                            {/* Info */}
                            <div className="product-info">
                                <span className="product-category">
                                    {product.category}
                                </span>
                                <h3 className="product-name">{product.name}</h3>
                                <div className="product-price">
                                    ${product.price}
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="product-actions">
                                <button
                                    className="qty-btn"
                                    type="button"
                                    aria-label={`Decrease quantity for ${product.name}`}
                                    onClick={() => dec(product.id)}
                                >
                                    -
                                </button>
                                <span className="qty-val">
                                    {qty.get(product.id)}
                                </span>
                                <button
                                    className="qty-btn"
                                    type="button"
                                    aria-label={`Increase quantity for ${product.name}`}
                                    onClick={() => inc(product.id)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Button */}
                <div className="products-footer">
                    <button className="cta-button" type="button">
                        SHOP NOW
                    </button>
                </div>
            </div>
        </section>
    );
}
