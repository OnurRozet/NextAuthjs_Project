import React from 'react'

type InputProps = {
    className?: string
    placeholder?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
    name?: string
}

const Input: React.FC<InputProps> = ({
                                         className, placeholder, value, onChange, type
                                         , name
                                     }) => {
    return (
        <input
            placeholder={placeholder}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
            value={value}
            onChange={onChange}
            type={type}
            name={name}
        />
    )
}
export default Input
