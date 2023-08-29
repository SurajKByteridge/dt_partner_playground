"use client";

import React from "react";

const TextField = ({
  label,
  placeholder,
  onChange,
  value,
  hideContent = false,
}: {
  label: string;
  placeholder: string;
  onChange: Function;
  value: string;
  hideContent?: boolean;
}) => {
  return (
    <div className="flex flex-col w-full mb-4">
      <label className="text-gray-600 text-xs mb-1" htmlFor={placeholder}>
        {label}
      </label>
      <input
        id={label}
        type={hideContent ? "password" : "text"}
        placeholder={placeholder}
        value={value}
        className="border border-gray-300 rounded-sm p-2 text-sm focus:outline-none focus:border-accent-color"
        onChange={(e) => {
          onChange(e);
        }}
      />
    </div>
  );
};

export default TextField;
