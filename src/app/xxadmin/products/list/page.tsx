
import {ProductCard} from "../../components/products/ProductList";
import Link from "next/link";
import {useRoleVisibility} from "../../../../hook/useRoleVisibility";



export default function ProductList() {

    return (
        <section className="content-main">
            {/* HEADER */}
            <div className="content-header">
                <div>
                    <h2 className="content-title card-title">Products List</h2>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>

                <div className="d-flex gap-2">
                    <Link href='/xxadmin/products/create' className="btn btn-light rounded font-md">Export</Link>
                    <Link href='/xxadmin/products/create' className="btn btn-light rounded font-md">Import</Link>
                    <Link href='/xxadmin/products/create' className="btn btn-primary btn-sm rounded">Create new</Link>
                </div>
            </div>

            {/* CARD */}
          <ProductCard />
        </section>
    );
}
