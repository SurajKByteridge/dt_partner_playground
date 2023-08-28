"use client";

import TextField from "./components/textfield";
import { format } from "url";
import { useState, useEffect } from "react";
import Scopes from "./components/scopes";
import Logo from "./components/logo";
import { Constants } from "../constants";

export default function Landing() {
  const [clientIDValue, setClientIDValue] = useState("");
  const [redirectURIValue, setRedirectURIValue] = useState("");
  const [oAuthUrl, setOAuthUrl] = useState("");
  const [checkedScopes, setCheckedScopes] = useState([]);

  useEffect(() => {
    const oAuthUrl = format({
      protocol: "http",
      hostname: Constants.devicethreadApi,
      pathname: "/v1.1/oauth",
      query: {
        client_id: clientIDValue,
        response_type: "code",
        redirect_uri: redirectURIValue,
        scope: checkedScopes.join(" "),
      },
    });

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
    if (typeof window !== "undefined") {
      window.open(oAuthUrl, "_blank");
    }
  };

  const onCheckScope = (scopes: []) => {
    setCheckedScopes(scopes);
  };

  return (
    <main className="bg-custom-bg-light h-screen flex justify-center items-center ">
      <div>
        <div className="bg-white flex flex-col items-center w-96 rounded-sm p-5">
          <Logo />
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
            className="bg-accent-color text-white text-sm hover:bg-blue-700 py-2 px-4 my-4 rounded-sm w-full disabled:bg-custom-bg-light disabled:text-gray-400"
            disabled={
              !clientIDValue || !redirectURIValue || !checkedScopes.length
            }
            onClick={onConnectClick}
          >
            Connect
          </button>
          <code className="bg-custom-bg-light text-gray-500 p-2 rounded-sm overflow-scroll font-mono m-2 w-full transition-height duration-300 text-xs ease">
            {decodeURIComponent(oAuthUrl)}
          </code>
        </div>
      </div>
    </main>
  );
}
