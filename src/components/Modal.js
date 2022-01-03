import React, { useState, useEffect } from 'react'
import './Modal.css'

export default function Modal(props) {
    return (
        <div className='container-modal' style={props.show ? { display: 'flex', justifyContent: 'center', alignItems: 'center' } : { display: 'none' }}>
            <div className='content-container-modal'>
                <div className='body-modal'>
                    {props.children}
                </div>
            </div>
        </div>
    )
}
