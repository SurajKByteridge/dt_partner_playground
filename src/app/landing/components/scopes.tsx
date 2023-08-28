"use client";

import { useEffect, useState } from "react";
import { Constants } from "../../constants";

const Scopes = ({ getCheckList }: { getCheckList: Function }) => {
  const [data, setData] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  useEffect(() => {
    setData([
      "Reservations:CREATE",
      "Reservations:GET",
      "Reservations:PUT",
      "Reservations:DELETE",
    ]);
    //   fetch(`${Constants.devicethreadApi}/realm/scopes`, {
    //     credentials: "include",
    //   })
    //     .then((response) => response.json())
    //     .then((data) => setData(data))
    //     .catch((error) => console.log(error));
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
      <div className="grid grid-cols-2 gap-1">
        {data.length ? (
          data.map((item: string) => (
            <div
              key={item}
              className="flex flex-row justify-start items-center gap-2 py-1 cursor-pointer"
            >
              <input
                type="checkbox"
                className="form-checkbox h-3 w-3 focus:ring-gray-500 text-accent-color rounded-sm cursor-pointer"
                id={item}
                name={item}
                value={item}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor={item}
                className=" text-gray-500 text-xs cursor-pointer"
              >
                {item}
              </label>
            </div>
          ))
        ) : (
          <div>
            <h1 className="text-gray-400 text-xs mb-1">
              No scopes are available
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scopes;
