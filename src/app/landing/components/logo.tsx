import Image from "next/image";
import DTLogo from "../img/dt-logo-text.png";

const Logo = () => {
  return (
    <>
      <a href="https://www.devicethread.com/" target="_blank">
        <Image
          src={DTLogo}
          width={180}
          height={50}
          alt="DT-logo"
          className="m-5"
        />
      </a>
    </>
  );
};

export default Logo;
