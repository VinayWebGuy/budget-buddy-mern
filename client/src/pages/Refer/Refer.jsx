import React, { useState } from "react";
import "./Refer.scss";
import {
  FaInstagram,
  FaLinkedin,
  FaRegCopy,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const Refer = () => {
  const referLink =
    "https://budget-buddy.com?referrer=vinay_munjal&mobile=7206881088&shared_on=whatsapp";
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referLink).then(() => {
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    });
  };

  return (
    <div className="refer box">
      <div className="pageHeading">Refer a friend</div>
      <p>You can earn rewards by referring your friends to budget buddy.</p>
      <div className="refer-link">
        <span>{referLink}</span>
        <FaRegCopy className="copyIcon" onClick={copyToClipboard} />
      </div>
      {copySuccess && <div className="copied">Copied!</div>}
      <div className="social-share">
        <FaWhatsapp />
        <FaInstagram />
        <FaTwitter />
        <FaLinkedin />
      </div>
    </div>
  );
};

export default Refer;
