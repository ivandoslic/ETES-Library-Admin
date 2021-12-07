import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import './Navbar.css'

export default function Navbar() {
    const [active, setActive] = useState("HOME");

    return (
        <div className="navBar">
            <img
                src="https://firebasestorage.googleapis.com/v0/b/eteslib.appspot.com/o/LogoTextLeft.png?alt=media&token=556b7e04-db70-4ab7-8d12-391f4c5873b4"
                alt="ETES Lib Logo"
                className="nav-logo"
            />
            <nav>
                <ul>
                    {SidebarData.map((item, idx) => {
                        return (
                            <li key={idx}
                                className={active === item.title ? 'nav-text-selected' : item.cName}
                                onClick={() => setActive(item.title)}
                            >
                                <Link to={item.path} className="nav-link">
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}
