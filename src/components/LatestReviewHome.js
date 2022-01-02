import React from 'react'
import './LatestReviewHome.css'
import * as MdIcons from 'react-icons/md'
import ReviewRatingComponent from './ReviewRatingComponent'

export default function LatestReviewHome() {
    return (
        <div className="container-lrh">
            <div className="lastest-upper-lrh">
                <div className="latest-label-lrh">
                    <p>Latest review:</p>
                </div>
                <div className="profile-stack-lrh">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/eteslib.appspot.com/o/User_Profile_Image1635433564586.jpg?alt=media&token=76166081-ccfc-4e8b-8fbb-1cd528681cdf"
                        alt="User Profile Image"
                        className="profile-icon-lrh"
                    />
                    <p>username</p>
                </div>
            </div>
            <div className="content-container-lrh">
                <MdIcons.MdOutlineFormatQuote size={42} style={{ color: 'white' }} />
                <div className="review-info-lrh">
                    <p className="review-info-title-lrh">" Title "</p>
                    <p className="review-info-desc-lrh">description</p>
                    {/*<ReviewRatingComponent rating={4.5} starSize={24} />*/}
                </div>
                <MdIcons.MdOutlineFormatQuote size={42} style={{ color: 'white' }} className="right-quote-lrh" />
            </div>
        </div>
    )
}
