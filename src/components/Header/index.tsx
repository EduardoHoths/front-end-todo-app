import React from "react";
import { Link } from "react-router-dom";

import "./style.scss";

export const Header = () => {

    function handleLogout(){
        document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 GMT";'
    }
    return (
        <header>
            <div>
                <h1>Todo App</h1>

                <Link to="/" onClick={handleLogout}>Sair</Link>
            </div>
        </header>
    );
};
