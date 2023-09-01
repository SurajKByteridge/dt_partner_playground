"use client";

import { useEffect, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import Logo from "../playground/components/logo";
import TextField from "../playground/components/textfield";
import { Constants } from "../constants";
import { format } from "url";

export default function Token() {
  const [clientIDValue, setClientIDValue] = useState("");
  const [redirectURIValue, setRedirectURIValue] = useState("");
  const [clientSecretValue, setClientSecretValue] = useState("");
  const [authCodeValue, setAuthCodeValue] = useState("");
  const [responseBody, setResponseBody] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const clientID = localStorage.getItem("clientID");
    const redirectUri = localStorage.getItem("redirectUri");
    const code = localStorage.getItem("code");
    setClientIDValue(clientID ?? "");
    setRedirectURIValue(redirectUri ?? "");
    setAuthCodeValue(code ?? "");
  }, []);

  const onGetTokenClick = () => {
    try {
      const myHeaders: HeadersInit = new Headers();
      myHeaders.set("Content-Type", "application/json");
      myHeaders.set("Access-Control-Allow-Origin","*");

      const body = JSON.stringify({
        client_id: clientIDValue,
        redirect_uri: redirectURIValue,
        client_secret: clientSecretValue,
        code: authCodeValue,
        grant_type: "authorization_code",
      });

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: body,
      };

      const tokenUrl = format({
        protocol: "https",
        hostname: Constants.devicethreadApi,
        pathname: "/api/access_token",
      });

      fetch(tokenUrl, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("data", result);
          const { error } = result.data;
          setHasError(error);
          setResponseBody(JSON.stringify(result.data, null, 1));
        })
        .catch((error) => console.log("Can't get the access token", error));
    } catch (error) {
      console.log("get Token Error", error)
    }
  };

  const handleClientSecret = (e: any) => {
    setClientSecretValue(e.target.value);
  };

  const handleAuthCodeValueChange = (e: any) => {
    setAuthCodeValue(e.target.value);
  };

  const handleCopy = () => {
    const { access_token } = JSON.parse(responseBody).data;
    navigator.clipboard.writeText(access_token).catch((error) => {
      console.error("Failed to copy code to clipboard:", error);
    });
  };

  return (
    <main className="bg-custom-bg-light h-screen flex justify-center items-center ">
      <div>
        <div className="bg-white flex flex-col items-center w-96 rounded-sm p-5">
          <Logo />
          <TextField
            label="Client Secret"
            value={clientSecretValue}
            hideContent={true}
            placeholder="Enter client secret"
            onChange={handleClientSecret}
          ></TextField>
          <TextField
            value={authCodeValue}
            label="Code"
            placeholder="Enter authorization code"
            onChange={handleAuthCodeValueChange}
          ></TextField>
          <button
            className="bg-accent-color text-white text-sm hover:bg-blue-700 py-2 px-4 my-4 rounded-sm w-full disabled:bg-custom-bg-light disabled:text-gray-400"
            disabled={!clientSecretValue || !authCodeValue}
            onClick={onGetTokenClick}
          >
            Get Access Token
          </button>
          {responseBody ? (
            <div className="flex flex-row w-full relative">
              <code className="bg-custom-bg-light text-gray-500 p-4 rounded-sm overflow-scroll font-mono my-2 w-full transition-height duration-300 text-xs ease">
                <pre>
                  {" "}
                  {responseBody}{" "}
                  {!hasError ? (
                    <button>
                      <IoCopyOutline
                        className="text-gray-500 absolute top-4 right-2 mx-2 hover:cursor-pointer hover:text-accent-color"
                        onClick={handleCopy}
                      ></IoCopyOutline>
                    </button>
                  ) : (
                    <></>
                  )}
                </pre>
              </code>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </main>
  );
}
