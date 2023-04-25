import React from 'react';

const NewsItem = ({ title, url, author, date, imgSrc, imgAlt }) => {
  return (
    <div className="p-4 nm-convex-secondary-sm rounded-lg mb-4">
      <div className="flex justify-between">
        <h2 className="font-bold text-lg mb-2">
          <a href={url}
          className='text-accent hover:text-accent-hover'
          target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        {imgSrc && (
          <div className="w-24 h-24">
            <img src={imgSrc} alt={imgAlt} className="w-full h-full object-cover rounded" />
          </div>
        )}
      </div>
      <p className="text-gray-300 mb-2">{author}</p>
      <p className="text-gray-500">{new Date(date).toLocaleDateString()}</p>
    </div>
  );
};

export default NewsItem;
