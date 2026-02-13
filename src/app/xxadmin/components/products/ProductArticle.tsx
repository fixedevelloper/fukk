import {Product} from "../../../../types/FrontType";
import {useRoleVisibility} from "../../../../hook/useRoleVisibility";

type ProductArticleProps = {
    product: Product;
};
export function ProductArticle({product}:ProductArticleProps) {

    const statusClass = (status: Product["status"]) => {
        switch (status) {
            case "active":
                return "alert-success";
            case "archived":
                return "alert-warning";
            case "disabled":
                return "alert-danger";
            default:
                return "";
        }
    };
    return (  <article key={product.id} className="itemlist">
        <div className="row align-items-center">
            <div className="col col-check">
                <input type="checkbox" className="form-check-input" />
            </div>

            <div className="col-lg-4 col-sm-4 col-8">
                <a className="itemside">
                    <img
                        src={product.image?.thumb}
                        className="img-sm img-thumbnail"
                        alt={product.name}
                    />
                    <div className="info">
                        <h6 className="mb-0">{product.name}</h6>
                    </div>
                </a>
            </div>

            <div className="col-lg-2 col-sm-2 col-4">
                ${product.price.toFixed(2)}
            </div>

            <div className="col-lg-2 col-sm-2 col-4">
                  <span
                      className={`badge rounded-pill ${statusClass(
                          product.status
                      )}`}
                  >
                    {product.status}
                  </span>
            </div>

            <div className="col-lg-1 col-sm-2 col-4">
                {product.created_at}
            </div>

            <div className="col-lg-2 col-sm-2 col-4 text-end">
                <button className="btn btn-sm btn-brand me-2">
                    Edit
                </button>
                <button className="btn btn-sm btn-light">
                    Delete
                </button>
            </div>

        </div>
    </article>)
}