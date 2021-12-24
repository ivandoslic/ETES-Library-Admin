import React from 'react'
import './AchievementsOpenHome.css'
import logo from "../res/achievements-badge.png"

export default function AchievementsOpenHome() {
    return (
        <div className="container-aoh" style={{ userSelect: "none" }}>
            <img src={logo} alt="Achievements Logo" />
            <div className="label-button-container-aoh">
                <p className="label-aoh">ACHIEVEMENT SYSTEM</p>
                <div className="button-aoh">
                    <p>SOON</p>
                </div>
            </div>
        </div>
    )
}
