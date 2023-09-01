import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { format } from "url";

export async function POST(request: Request, response: Request) {
  console.log("Started ");
  const data = await request.json();

  var myHeaders: HeadersInit = new Headers();
  myHeaders.set("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.set("Access-Control-Allow-Origin", "*");

  console.log("Header ", myHeaders);

  var urlencoded = new URLSearchParams();
  urlencoded.append("code", data.code);
  urlencoded.append("client_id", data.client_id);
  urlencoded.append("grant_type", data.grant_type);
  urlencoded.append("redirect_uri", data.redirect_uri);
  urlencoded.append("client_secret", data.client_secret);

  console.log("urlencoded ", urlencoded);

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  console.log("requestOptions ", requestOptions);

  const kcTokenUrl = format({
    protocol: "http",
    port: 8080,
    hostname: "localhost",
    pathname: "/realms/devicethread/protocol/openid-connect/token",
  });
  fetch(kcTokenUrl, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log("data", result);
      return NextResponse.json({ data: "Hello" });
    })
    .catch((error) => {
      console.log("kc access token", error);
      return NextResponse.json({ data: "Hello" });
    });
  // const fetchedData = await fetch(kcTokenUrl, requestOptions);

  // let dataRes = JSON.parse(await fetchedData.text());

  // return NextResponse.json({ data: "Hello" });
}
