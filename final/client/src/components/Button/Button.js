////////////////////
// Imports
////////////////////

import React from "react";
import "./Button.css";

////////////////////
// Components
////////////////////

export default function Button({children, className, id, onClick}) {
    return (
        <button type="button" id={id} className={`btn ${className}`} onClick={onClick}>{children}</button>
    );
};
