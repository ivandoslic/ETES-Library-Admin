import React from 'react'
import './SideActionButtons.css'
import * as FiIcons from 'react-icons/fi';

export default function SidebarActionButtons() {
    return (
        <div className='main-container-action'>
            <FiIcons.FiLogOut size={28} className='action-button-icon' />
            <FiIcons.FiSettings size={28} className='action-button-icon' />
            <FiIcons.FiInfo size={28} className='action-button-icon' />
        </div>
    )
}
