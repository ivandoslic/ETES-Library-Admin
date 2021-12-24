import React from 'react'
import './LibrariansChoicePreview.css'
import * as MdIcons from 'react-icons/md'

// TODO: fetch the latest librarians' choice info from the server

export default function LibrariansChoicePreview() {
    return (
        <div className="main-container-lcp" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.75)), url("https://firebasestorage.googleapis.com/v0/b/eteslib.appspot.com/o/KrlezaLibrariansChoice.png?alt=media&token=335bf513-0a65-4f5e-875c-b6c8d75afce3")', backgroundSize: 'cover' }}>
            <p className="librarians-choice-string-lcp">Librarians' Choice</p>
            <div className="librarians-choice-tdiv-lcp">
                <p className="librarians-choice-title-lcp">Title placeholder</p>
                <MdIcons.MdArrowForwardIos className="librarians-choice-forward-arrow-lcp" size={26} />
            </div>
        </div>
    )
}
