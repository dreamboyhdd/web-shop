import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {  useLocation } from "react-router-dom";
import { GROUPID } from "../../Services/Api";
import { mainAction } from "../../Redux/Actions";
import { EncodeString } from "../../Utils";
import { FormContact } from "../Contacts";
export const ContactPage = () => {
    const dispatch = useDispatch();

    return (
        <>
            <section>
                <FormContact
                    KeyMap={1}
                    KeyTitle={1}
                />
            </section>
        </>
    );
};
