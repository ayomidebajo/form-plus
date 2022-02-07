import React from "react";

const Card = ({ category, description, name }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title text-bold">{name}</div>
        <div className="card-text">
          <p>{description}</p>
          <p className="tags">
            Tags:{" "}
            {category.map((item) => (
              <span key={item} className={`${item} tag`}>
                {item}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className="card-footer">
        <p className="text-green">Use Tenplate</p>
      </div>
    </div>
  );
};

export default Card;
