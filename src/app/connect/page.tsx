"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error") ?? "";
    if (error) {
      push("/error");
    }
    localStorage.setItem("code", searchParams.get("code") ?? "");
    push("/token");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
