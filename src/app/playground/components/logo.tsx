import Image from "next/image";
import DTLogo from "../img/logo.png";

const Logo = () => {
  return (
    <>
      <header className="flex flex-row justify-center items-center mb-4">
        <a href="https://www.devicethread.com/" target="_blank">
          <Image
            src={DTLogo}
            width={50}
            height={50}
            alt="DT-logo"
            className="m-2"
          />
        </a>
        <p className="text-accent-color font-medium">Devicethread Playground</p>
      </header>
    </>
  );
};

export default Logo;
