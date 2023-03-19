////////////////////
// Imports
////////////////////

import React from "react";
import {apiURL} from "../../../util/constants.js";

////////////////////
// Components
////////////////////

export default function AdminPage() {
    async function sendText() {
        const address = `${apiURL}/send_dummy`;
        const response = await fetch(
            address,
            {
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                }
            },
        );
    }


    return (
        <div>
            <div className="big-container flex-wrapper flex-column flex-center">
                <div className="little-container flex-wrapper">
                    <button type="button" onClick={sendText}>send text</button>
                </div>
            </div>
        </div>
    );
};
