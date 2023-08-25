"use client";

import { useEffect, useState } from "react";

const Scopes = ({ getCheckList }: { getCheckList: Function }) => {
  const [data, setData] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  useEffect(() => {
    // setData([
    //   "Reservations: CREATE",
    //   "Reservations: GET",
    //   "Reservations: PUT",
    //   "Reservations: DELETE",
    // ]);
    fetch("https://87b6-49-204-163-144.ngrok-free.app/realm/scopes", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getCheckList(checkedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedItems]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked }: { name: string; checked: boolean } = event.target;

    if (checked) {
      setCheckedItems((prev) => [...prev, name]);
    } else {
      setCheckedItems((prev) => prev.filter((item) => item !== name));
    }
  };

  return (
    <div className="flex flex-col w-full mb-2">
      <h1 className="text-gray-600 text-xs mb-2">Scopes</h1>
      {data.map((item: string) => (
        <div
          key={item}
          className="flex flex-row justify-start items-center gap-2 py-1"
        >
          <input
            type="checkbox"
            className="form-checkbox h-3 w-3 text-accent-color rounded-sm cursor-pointer"
            id={item}
            name={item}
            value={item}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={item} className="text-xs cursor-pointer">
            {item}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Scopes;
