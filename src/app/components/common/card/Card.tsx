import React from 'react';

const Card = ({ title, views }) => {
  return (
    <div className="tw-shadow tw-rounded tw-max-w-lg">
      <p>Title: {title}</p>
      <p>Views: {views}</p>
    </div>
  )
}

export default Card;