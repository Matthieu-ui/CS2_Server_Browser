import React from 'react';

const NewsItem = ({ title, url, author, date, imgSrc, imgAlt }) => {
  return (
    <div className="flex items-center p-4 nm-convex-secondary-sm rounded-lg mb-4">
      {imgSrc && (
        <div className="w-36 h-36 mr-4">
          <img src={imgSrc} alt={imgAlt} className="w-full h-full object-cover rounded" />
        </div>
      )}
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-lg mb-2">
            <a href={url}
            className='text-accent hover:text-accent-hover'
            target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </h2>
   
          <p className="text-gray-300 mb-2">{author}</p>
          <p className="text-gray-500">{new Date(date).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;