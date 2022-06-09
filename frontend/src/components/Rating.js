import React from "react";

const Rating = ({ numReviews, rating }) => {
  let stars = [1, 2, 3, 4, 5];

  return (
    <div className="rating text-warning">
      {stars.map((star) => (
        <span
          key={star}
          className={
            rating >= star
              ? "fas fa-star"
              : rating >= `${star - 1}.5`
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></span>
      ))}
      <span className="ms-2">{numReviews} reviews</span>
    </div>
  );
};

export default Rating;
