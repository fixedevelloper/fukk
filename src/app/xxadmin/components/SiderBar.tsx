'use client';
import { useState } from "react";
import Link from "next/link";

const menuItems = [
    { name: "Dashboard", icon: "home", href: "/dashboard" },
    {
        name: "Products",
        icon: "shopping_bag",
        href: "/products",
        submenu: [
            { name: "Product List", href: "/products/list" },
            { name: "Product Grid", href: "/products/grid" },
            { name: "Categories", href: "/products/categories" },
        ],
    },
    {
        name: "Orders",
        icon: "shopping_cart",
        href: "/orders",
        submenu: [
            { name: "Order list", href: "/orders/list" },
            { name: "Order detail", href: "/orders/detail" },
        ],
    },
    { name: "Reviews", icon: "comment", href: "/reviews" },
    { name: "Brands", icon: "stars", href: "/brands" },
    { name: "Statistics", icon: "pie_chart", href: "#", disabled: true },
];

export function Sidebar() {
    const [openSubmenu, setOpenSubmenu] = useState(null);

    const toggleSubmenu = (index:number) => {
      //  setOpenSubmenu(openSubmenu === index ? null : index);
    };

    return (
        <></>
       /* <aside className="navbar-aside ps ps--active-y p-3">
            <div className="aside-top d-flex justify-content-between align-items-center mb-4">
                <Link href="/dashboard" className="brand-wrap">
                    <img src="/assets/imgs/theme/logo.svg" alt="Dashboard Logo" className="logo" />
                </Link>
                <button className="btn btn-icon btn-aside-minimize">
                    <span className="material-symbols-rounded">menu_open</span>
                </button>
            </div>

            <nav>
                <ul className="menu-aside">
                    {menuItems.map((item, idx) => (
                        <li
                            key={idx}
                            className={`menu-item ${item?.submenu ? "has-submenu" : ""} ${
                                openSubmenu === idx ? "active" : ""
                            } ${item.disabled ? "disabled text-muted" : ""}`}
                        >
                            <Link
                                href={item.disabled ? "#" : item.href}
                                className="menu-link"
                                onClick={(e) => {
                                    if (item.submenu) {
                                        e.preventDefault();
                                        toggleSubmenu(idx);
                                    }
                                }}
                            >
                <span className="d-flex align-items-center gap-2">
                  <span className="material-symbols-rounded">{item.icon}</span>
                  <span className='text'>{item.name}</span>
                </span>
                               {/!* {item.submenu && <span className="material-symbols-rounded">expand_more</span>}*!/}
                            </Link>

                            {item.submenu && openSubmenu === idx && (
                                <ul className="submenu">
                                    {item.submenu.map((sub, subIdx) => (
                                        <li key={subIdx} className="submenu-item mb-1">
                                            <Link href={sub.href} className="text-decoration-none">
                                                {sub.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>*/
    );
}
