import React from "react";
import { Link } from "react-router-dom";

const Card = ({ category, description, name }) => {
  return (
    <div className="card" data-testid="card">
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
        <p className="text-green">
          <Link>Use Tenplate</Link>
        </p>
      </div>
    </div>
  );
};

export default Card;
