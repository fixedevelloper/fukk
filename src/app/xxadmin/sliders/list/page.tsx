
import {ProductCard} from "../../components/products/ProductList";
import Link from "next/link";
import {SliderCard} from "../../components/SliderCard";



export default function SliderList() {
    return (
        <section className="content-main">
            {/* HEADER */}
            <div className="content-header">
                <div>
                    <h2 className="content-title card-title">Sliders List</h2>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>

                <div className="d-flex gap-2">
                    <Link href='/xxadmin/sliders/create' className="btn btn-primary btn-sm rounded">Create new</Link>
                </div>
            </div>

            {/* CARD */}
          <SliderCard />
        </section>
    );
}
