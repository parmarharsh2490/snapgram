import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import { IoMdCheckmark } from "react-icons/io";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

const ShareButtons = ({ url, title, description }) => {
  const iconSize = 32; // Desired icon size
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    });
  };
  return (
    <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
      <FacebookShareButton url={url} title={title}>
        <FacebookIcon size={iconSize} round />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={iconSize} round />
      </TwitterShareButton>

      <WhatsappShareButton url={url} title={title} separator=" - ">
        <WhatsappIcon size={iconSize} round />
      </WhatsappShareButton>

      <div style={{ width: iconSize-8, height: iconSize, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        onClick={handleCopy}
        style={{
          width: iconSize - 8,
          height: iconSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <FaCopy color="black" size={iconSize} />
        {copied && (
          <span style={{ marginLeft: '8px', color: 'green' }}><IoMdCheckmark color='black' className='border' size={iconSize}/></span>
        )}
      </div>
      </div>
    </div>
  );
};

export default ShareButtons;
