import React from 'react'
import { useEffect, useState } from 'react/cjs/react.development'
import * as BsIcons from 'react-icons/bs'

export default function ReviewRatingComponent(props) {
    const [rating, setRating] = useState(props.rating);
    const [starSize, setStarSize] = useState(props.starSize)
    const [stars, setStars] = useState([]);

    useEffect(() => {
        for (var i = 0; i < 5; i++) {
            if (rating - i < 0) {
                stars.push(<BsIcons.BsStar style={{ color: "#FF7E3D" }} size={starSize} />)
            } else if (rating - i > 0 && rating - i < 1) {
                stars.push(<BsIcons.BsStarHalf style={{ color: "#FF7E3D" }} size={starSize} />)
            } else {
                stars.push(<BsIcons.BsStarFill style={{ color: "#FF7E3D" }} size={starSize} />)
            }
        }
    }, [rating]);

    return (
        <div className="review-rating-component">
            {stars}
        </div>
    )
}
