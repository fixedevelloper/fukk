import Link from "next/link";

export function HeaderAdmin() {
    return (
        <header className="main-header navbar d-flex align-items-center justify-content-between px-3">
            {/* Search */}
            <div className="col-search flex-grow-1 me-3">
                <form className="searchform">
                    <div className="input-group">
                        <input
                            className="form-control"
                            list="search_terms"
                            type="text"
                            placeholder="Search term"
                        />
                        <button className="btn btn-light bg" type="button">
                            <span className="material-icons md-search">search</span>
                        </button>
                    </div>
                    <datalist id="search_terms">
                        <option value="Products" />
                        <option value="New orders" />
                        <option value="Apple iPhone" />
                        <option value="Ahmed Hassan" />
                    </datalist>
                </form>
            </div>

            {/* Navigation / Icons */}
            <div className="col-nav d-flex align-items-center gap-2">
                {/* Mobile toggle */}
                <button
                    className="btn btn-icon btn-mobile me-auto"
                    data-trigger="#offcanvas_aside"
                >
                    <span className="material-icons md-apps">apps</span>
                </button>

                <ul className="nav d-flex align-items-center gap-2 list-unstyled mb-0">
                    <li className="nav-item">
                        <a className="nav-link btn-icon position-relative" href="#">
              <span className="material-icons md-notifications animation-shake">
                notifications
              </span>
                            <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
                3
              </span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link btn-icon darkmode" href="#">
                            <span className="material-icons md-nights_stay">nights_stay</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link btn-icon requestfullscreen" href="#">
                            <span className="material-icons md-cast">cast</span>
                        </a>
                    </li>

                    {/* Language Dropdown */}
                    <li className="dropdown nav-item">
                        <a
                            className="dropdown-toggle nav-link"
                            id="dropdownLanguage"
                            data-bs-toggle="dropdown"
                            href="#"
                            aria-expanded="false"
                        >
                            <span className="material-icons md-public">public</span>
                        </a>
                        <div
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="dropdownLanguage"
                        >
                            <a className="dropdown-item text-brand" href="#">
                                <img src="/assets/imgs/theme/flag-us.png" alt="English" /> English
                            </a>
                            <a className="dropdown-item" href="#">
                                <img src="/assets/imgs/theme/flag-fr.png" alt="Français" /> Français
                            </a>

                        </div>
                    </li>

                    {/* Account Dropdown */}
                    <li className="dropdown nav-item">
                        <a
                            className="dropdown-toggle nav-link"
                            id="dropdownAccount"
                            data-bs-toggle="dropdown"
                            href="#"
                            aria-expanded="false"
                        >
                            <img
                                className="img-xs rounded-circle"
                                src="/assets/imgs/people/avatar2.jpg"
                                alt="User"
                            />
                        </a>
                        <div
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="dropdownAccount"
                        >
                            <a className="dropdown-item" href="#">
                                <span className="material-icons md-perm_identity"></span> Edit Profile
                            </a>
                            <a className="dropdown-item" href="#">
                                <span className="material-icons md-settings"></span> Account Settings
                            </a>
                            <a className="dropdown-item" href="#">
                                <span className="material-icons md-account_balance_wallet"></span> Wallet
                            </a>
                            <a className="dropdown-item" href="#">
                                <span className="material-icons md-receipt"></span> Billing
                            </a>
                            <a className="dropdown-item" href="#">
                                <span className="material-icons md-help_outline"></span> Help center
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item text-danger" href="#">
                                <span className="material-icons md-exit_to_app"></span> Logout
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </header>
    );
}
