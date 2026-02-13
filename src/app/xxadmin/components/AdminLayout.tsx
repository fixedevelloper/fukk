'use client';
// components/AdminLayout.js
import {useEffect, useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useSession} from "next-auth/react";
import UserDropdown from "./UserDropdown";
import {useRoleVisibility} from "../../../hook/useRoleVisibility";

const menuItems: ItemMenu[] = [
    {
        name: "Dashboard",
        icon: "md-home",
        href: "/xxadmin",
        roles: ["vendor", "super_admin"],
    },

    {
        name: "Ma boutique",
        icon: "md-store",
        href: "/xxadmin/my-store",
        roles: ["vendor"],
    },

    {
        name: "Produits",
        icon: "md-shopping_bag",
        href: "#",
        roles: ["vendor"],
        submenu: [
            {
                name: "Liste des produits",
                href: "/xxadmin/products/list",
                roles: ["vendor", "super_admin"],
            },
            {
                name: "Ajouter produit",
                href: "/xxadmin/products/create",
                roles: ["vendor", "super_admin"],
            },
            {
                name: "Catégories",
                href: "/xxadmin/categories",
                roles: ["super_admin"], // 👈 seul le super admin
            },
            {
                name: "Attributs",
                href: "/xxadmin/attributes",
                roles: ["super_admin"],
            },
        ],
    },
    {name: "Marques", icon: "md-stars", href: "/xxadmin/brands", roles: ["vendor"],},
    {
        name: "Commandes",
        icon: "md-shopping_cart",
        href: "/xxadmin/orders",
        roles: ["vendor"],
    },
    {name: "Reviews", icon: "md-comment", href: "/reviews",  roles: ["vendor", "super_admin"],},

    {
        name: "Statistiques",
        icon: "md-pie_chart",
        href: "/xxadmin/statistics",
        roles: ["vendor"],
    },
];
const adminMenuItems: ItemMenu[] = [
    {
        name: "Vendors",
        icon: "md-people",
        href: "/xxadmin/vendors",
        roles: ["super_admin"],
    },

    {
        name: "Produits",
        icon: "md-shopping_bag",
        href: "#",
        roles: ["super_admin"],
        submenu: [
            {
                name: "Liste des produits",
                href: "/xxadmin/products/list",
                roles: ["super_admin"],
            },
            {
                name: "Ajouter produit",
                href: "/xxadmin/products/create",
                roles: ["super_admin"],
            },
            {
                name: "Catégories",
                href: "/xxadmin/categories",
                roles: ["super_admin"], // 👈 seul le super admin
            },
            {
                name: "Attributs",
                href: "/xxadmin/attributes",
                roles: ["super_admin"],
            },
        ],
    },
    {name: "Marques", icon: "md-stars", href: "/xxadmin/brands", roles: ["super_admin"],},
    {
        name: "Commandes",
        icon: "md-shopping_cart",
        href: "/xxadmin/orders",
        roles: ["super_admin"],
    },
    {name: "Reviews", icon: "md-comment", href: "/reviews", roles: ["super_admin"]},

    {
        name: "Statistiques",
        icon: "md-pie_chart",
        href: "/xxadmin/statistics",
        roles: ["super_admin"],
    },
    {
        name: "Sliders",
        icon: "md-slideshow",
        href: "/xxadmin/sliders/list",
        roles: ["super_admin"],
    },
    {
        name: "Banners",
        icon: "md-slideshow",
        href: "/xxadmin/banners/list",
        roles: ["super_admin"],
    },
];

type ItemMenu = {
    name: string;
    icon?: string;
    href: string;
    submenu?: ItemMenu[];
    roles?: Role[]; // 👈 autorisations
};
type Role = "vendor" | "super_admin";

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname()
    const { data: session } = useSession();
    const userRole = session?.user.role;
    const [openSidebar, setOpenSidebar] = useState(true);
    const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

    const toggleSubmenu = (idx: number) => {
        setOpenSubmenu(prev => (prev === idx ? null : idx));
    };

    const isActive = (href: string) => pathname.startsWith(href)

    const isPActive = (item: ItemMenu) => {
            return pathname === item.href;
    };
    if (!session) return null;

    const filteredMenu = menuItems.filter(
        item => !item.roles || item.roles.includes(userRole!)
    );

    const filterSubmenu = (submenu?: ItemMenu[]) =>
        submenu?.filter(
            sub => !sub.roles || sub.roles.includes(userRole!)
        );

    const filteredAdminMenu = adminMenuItems.filter(
        item => !item.roles || item.roles.includes(userRole!)
    );
    return (
        <>
            <div className="screen-overlay"/>
            {/* Sidebar */}
            <aside
                className={`navbar-aside ps ps--active-y ${openSidebar ? "show" : "collapse"}`}
            >
                <div className="aside-top d-flex justify-content-between align-items-center p-3">
                    <Link href="/xxadmin" className="brand-wrap">
                        <img className="logo" src="/images/theme/logo.svg" alt="Dashboard Logo" />
                    </Link>

                    <button
                        className="btn btn-icon btn-aside-minimize"
                        onClick={() => setOpenSidebar(!openSidebar)}
                    >
                        <i className="text-muted material-icons md-menu_open" />
                    </button>
                </div>

                <nav>
                    <ul className="menu-aside">

                        {filteredMenu.map((item, idx) => {
                            const isOpen = openSubmenu === idx;
                            const visibleSubmenu = filterSubmenu(item.submenu);

                            return (
                                <li
                                    key={idx}
                                    className={`menu-item ${visibleSubmenu?.length ? "has-submenu" : ""} ${
                                        isOpen ? "active" : ""
                                    } ${isPActive(item) ? "active" : ""}`}
                                >
                                    <Link
                                        href={item.href}
                                        className={`menu-link ${isActive(item.href) ? "active" : ""}`}
                                        onClick={(e) => {
                                            if (visibleSubmenu?.length) {
                                                e.preventDefault();
                                                toggleSubmenu(idx);
                                            }
                                        }}
                                    >
                <span className="d-flex align-items-center gap-2">
                    <i className={`icon material-icons ${item.icon}`} />
                    <span className="text">{item.name}</span>
                </span>
                                    </Link>

                                    {visibleSubmenu && isOpen && (
                                        <ul className="submenu">
                                            {visibleSubmenu.map((sub, subIdx) => (
                                                <li key={subIdx}>
                                                    <Link
                                                        className={isActive(sub.href) ? "active" : ""}
                                                        href={sub.href}
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}


                    </ul>
                    <hr/>

                    <ul className="menu-aside">

                        {filteredAdminMenu.map((item, idx) => {
                            const isOpen = openSubmenu === idx;
                            const visibleSubmenu = filterSubmenu(item.submenu);

                            return (
                                <li
                                    key={idx}
                                    className={`menu-item ${visibleSubmenu?.length ? "has-submenu" : ""} ${
                                        isOpen ? "active" : ""
                                    } ${isPActive(item) ? "active" : ""}`}
                                >
                                    <Link
                                        href={item.href}
                                        className={`menu-link ${isActive(item.href) ? "active" : ""}`}
                                        onClick={(e) => {
                                            if (visibleSubmenu?.length) {
                                                e.preventDefault();
                                                toggleSubmenu(idx);
                                            }
                                        }}
                                    >
                <span className="d-flex align-items-center gap-2">
                    <i className={`icon material-icons ${item.icon}`} />
                    <span className="text">{item.name}</span>
                </span>
                                    </Link>

                                    {visibleSubmenu && isOpen && (
                                        <ul className="submenu">
                                            {visibleSubmenu.map((sub, subIdx) => (
                                                <li key={subIdx}>
                                                    <Link
                                                        className={isActive(sub.href) ? "active" : ""}
                                                        href={sub.href}
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}


                    </ul>
                </nav>
            </aside>

            {/* Main Content */}


            {/* Page Content */}
            <main className="main-wrap">
                <header className="main-header navbar">
                    {/* Search */}
                    <div className="col-search">
                        <form className="searchform">
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    list="search_terms"
                                    type="text"
                                    placeholder="Search term"
                                />
                                <button className="btn btn-light" type="button">
                                    <span className="material-symbols-rounded">search</span>
                                </button>
                            </div>
                            <datalist id="search_terms">
                                <option value="Products"/>
                                <option value="Orders"/>
                                <option value="Users"/>
                                <option value="Analytics"/>
                            </datalist>
                        </form>
                    </div>

                    <div className="col-nav">
                        <button
                        className="btn btn-icon btn-mobile me-auto"
                        onClick={() => setOpenSidebar(!openSidebar)}
                    >
                            <i className="material-icons md-apps"/>
                    </button>
                        {/* Nav Icons */}
                        <ul className="nav">
                            <li className="nav-item position-relative">
                                <Link className="btn btn-icon" href='#'>
                                    <i className="material-icons md-notifications animation-shake"/>
                                    <span className="badge rounded-pill">3</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="btn btn-icon darkmode" href='#'>
                                    <i className="material-icons md-nights_stay"/>
                                </Link>
                            </li>

                            {/* Account */}
                         <UserDropdown />
                        </ul>
                    </div>
                </header>
                {children}</main>

        </>
    );
}
