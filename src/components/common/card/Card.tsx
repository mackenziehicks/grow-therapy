import React from 'react';

const Card = ({ title, views }) => {
  return (
    <div>
      <p>Title: {title}</p>
      <p>Views: {views}</p>
    </div>
  )
}

export default Card;