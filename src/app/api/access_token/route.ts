import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { format } from "url";

export async function POST(request: Request, response: Request) {
  try {
    const data = await request.json();

    var myHeaders:HeadersInit = new Headers();
    myHeaders.set("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.set("Access-Control-Allow-Origin","*");

    var urlencoded = new URLSearchParams();
    urlencoded.append("code", data.code);
    urlencoded.append("client_id", data.client_id);
    urlencoded.append("grant_type", data.grant_type);
    urlencoded.append("redirect_uri", data.redirect_uri);
    urlencoded.append("client_secret", data.client_secret);

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      mode: 'no-cors',
      body: urlencoded,
      redirect: "follow",
    };

    const fetchedData = await fetch(
      "http://localhost:8080/realms/devicethread/protocol/openid-connect/token",
      requestOptions
    );

    let dataRes = JSON.parse(await fetchedData.text());

    return NextResponse.json({ data: dataRes });
  } catch (error) {
    console.log(error);
  }
}
