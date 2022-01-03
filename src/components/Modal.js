import React, { useState, useEffect } from 'react'
import './Modal.css'
import * as MdIcons from 'react-icons/md'

export default function Modal(props) {
    return (
        <div className='container-modal' style={props.show ? { display: 'flex', justifyContent: 'center', alignItems: 'center' } : { display: 'none' }}>
            <div className='content-container-modal'>
                <div className='header-modal'>
                    <h1 className='title-modal'>{props.title}</h1>
                    <MdIcons.MdClose color='white' size={36} className='close-icon-modal' onClick={props.setShow} />
                </div>
                <div className='body-modal'>
                    {props.children}
                </div>
            </div>
        </div>
    )
}
