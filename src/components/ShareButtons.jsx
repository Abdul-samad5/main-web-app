import React from 'react';

const ShareButtons = ({image}) => {
  const shareOnFacebook = (imageUrl, imageTitle, facebookImage) => {
    // const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}&t=${encodeURIComponent(imageTitle)}`;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(facebookImage)}&t=${encodeURIComponent("invoice")}`;
    openShareWindow(url);
  };

  const shareOnTwitter = (imageUrl, imageTitle, twitterImage) => {
    // const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(imageUrl)}&text=${encodeURIComponent(imageTitle)}`;
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(twitterImage)}&text=${encodeURIComponent("invoice")}`;
    openShareWindow(url);
  };

  const shareOnWhatsApp = (imageUrl, imageTitle, whatsappImage) => {
    // const url = `https://wa.me/?text=${encodeURIComponent(imageTitle + ' ' + imageUrl)}`;
    const url = `https://wa.me/?text=${encodeURIComponent(imageTitle + ' ' + whatsappImage)}`;
    openShareWindow(url);
  };

  const openShareWindow = (url) => {
    const width = 600;
    const height = 400;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);

    window.open(url, 'shareWindow', `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`);
  };

  const handleShareClick = (platform, image) => {
    const imageElement = document.getElementById('imageToShare');
    const imageUrl = imageElement.src;
    const imageTitle = imageElement.alt;

    if (platform === 'facebook') {
      shareOnFacebook(imageUrl, imageTitle, image);
    } else if (platform === 'twitter') {
      shareOnTwitter(imageUrl, imageTitle, image);
    } else if (platform === 'whatsapp') {
      shareOnWhatsApp(imageUrl, imageTitle, image);
    }
  };

  return (
    <div className='flex justify-between'>
      {/* <img id="imageToShare" src="image_url_here" alt="image_title_here" /> */}
      <button id="shareFacebook" onClick={() => handleShareClick('facebook', image)}>Share on Facebook</button>
      <button id="shareTwitter" onClick={() => handleShareClick('twitter', image)}>Share on Twitter</button>
      <button id="shareWhatsApp" onClick={() => handleShareClick('whatsapp', image)}>Share on WhatsApp</button>
    </div>
  );
};

export default ShareButtons;