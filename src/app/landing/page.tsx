"use client";

import Image from "next/image";
import DTLogo from "../img/dt-logo-text.png";
import TextField from "./components/textfield";
import { useState, useEffect } from "react";
import Scopes from "./components/scopes";

export default function Landing() {
  const [clientIDValue, setClientIDValue] = useState("");
  const [redirectURIValue, setRedirectURIValue] = useState("");
  const [oAuthUrl, setOAuthUrl] = useState("");
  const [checkedScopes, setCheckedScopes] = useState([]);

  useEffect(() => {
    const oAuthUrl = `https://87b6-49-204-163-144.ngrok-free.app/v1.1/oauth?client_id=${clientIDValue}&response_type=code&redirect_uri=${redirectURIValue}&scope=${checkedScopes.join(
      " "
    )}`;
    setOAuthUrl(oAuthUrl);
  }, [clientIDValue, redirectURIValue, checkedScopes]);

  const handleClientIDValueChange = (e: any) => {
    setClientIDValue(e.target.value);
  };

  const handleCheckedScopes = (e: any) => {
    handleCheckedScopes(e.target.value);
  };

  const handleRedirectURIValueChange = (e: any) => {
    setRedirectURIValue(e.target.value);
  };

  const onConnectClick = () => {
    window.open(oAuthUrl, "_blank");
  };

  const onCheckScope = (scopes: []) => {
    console.log(scopes);
    setCheckedScopes(scopes);
  };

  return (
    <main className="bg-custom-bg-light h-screen flex justify-center items-center ">
      <div>
        <div className="bg-white flex flex-col items-center w-96 rounded-sm p-5">
          <Image
            src={DTLogo}
            width={180}
            height={50}
            alt="DT-logo"
            className="m-5"
          />
          <TextField
            label="Client ID"
            value={clientIDValue}
            placeholder="Enter client id"
            onChange={handleClientIDValueChange}
          ></TextField>
          <TextField
            value={redirectURIValue}
            label="Redirect URL"
            placeholder="Enter redirect url"
            onChange={handleRedirectURIValueChange}
          ></TextField>
          <Scopes getCheckList={onCheckScope}></Scopes>
          <button
            className="bg-accent-color hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 mb-4 rounded-sm w-full"
            disabled={
              !clientIDValue && !redirectURIValue && checkedScopes.length === 0
            }
            onClick={onConnectClick}
          >
            Connect
          </button>
          <code className="bg-custom-bg-light text-black p-2 rounded-sm font-mono m-2 w-full overflow-scroll text-sm ">
            {oAuthUrl}
          </code>
        </div>
      </div>
    </main>
  );
}
