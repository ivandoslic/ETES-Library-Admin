import React from 'react'
import './GlobalNotificationsCreate.css'
import logo from '../res/notifications-logo.png'

export default function GlobalNotificationsCreate() {
    return (
        <div className="container-gnc" style={{ userSelect: "none" }}>
            <img src={logo} alt="Notifications Logo" className="logo-gnc" />
            <p className="label-gnc">GLOBAL NOTIFICATIONS</p>
            <div className="create-button-gnc">
                <p>CREATE</p>
            </div>
        </div>
    )
}
