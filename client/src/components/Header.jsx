import React, { useState } from 'react'

const Header = ({headerTitle, headerDescription}) => {

    const [title, setTitle] = useState(headerTitle)
    const [description, setDescription] = useState(headerDescription)


    return (
    
            <div className="header flex nm-concave-primary-sm p-5 flex-col">

                <span className="flex">
                  
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-300 to-red-600 drop-shadow-sm tracking-wider p-5 ml-5">
                    {title}
                    </h1>
                </span>

                <div className="flex-1 flex text-sm">
                    <p className="mt-1 text-orange-600 w-1/2 opacity-80 ml-10">
                     {description}
                    </p>
                </div>
            </div>

    )
}

export default Header
