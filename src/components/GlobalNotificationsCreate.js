import React, { useContext } from 'react'
import './GlobalNotificationsCreate.css'
import logo from '../res/notifications-logo.png'
import { AuthContext } from '../Auth';
import { getAuth, signOut } from 'firebase/auth';

export default function GlobalNotificationsCreate({ buttonAction }) {
    return (
        <div className="container-gnc" style={{ userSelect: "none" }}>
            <img src={logo} alt="Notifications Logo" className="logo-gnc" />
            <p className="label-gnc">GLOBAL NOTIFICATIONS</p>
            <div className="create-button-gnc" onClick={buttonAction}>
                <p>CREATE</p>
            </div>
        </div>
    )
}
