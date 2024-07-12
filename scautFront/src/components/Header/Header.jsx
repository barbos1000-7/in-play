import style from "./Header.module.css";
import {useEffect, useState} from "react";
import convert from "xml-js";

const Header = ({check}) => {

    return (
        <>
            <header className={style.header}>
                <div className={style.title}>Scaut System TV</div>
            </header>
            <div onClick={() => check((prev) => !prev)} className={style.admin}>
                <div>Admin Panel</div>
            </div>
        </>
    );
};

export default Header;
