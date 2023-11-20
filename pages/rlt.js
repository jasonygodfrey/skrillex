// pages/rlt.js
import React, { useRef, useEffect } from 'react';
import Head from 'next/head';
import { initializeThreeJS } from '../utils/app2.js';  // Adjust path if necessary

export default function Rlt() {
    const mount = useRef(null);

    useEffect(() => {
        if (mount.current) {
            // This will be the DOM element where your Three.js scene will be attached
            const mountPoint = mount.current;
            initializeThreeJS(mountPoint);

            // Now you can use mountPoint in place of document.body
            // for appending your renderer's DOM element.
            // This will be done in your Three.js initialization code.
        }
    }, []);
  return (
    <div>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/rlt.css" />
        <title>Skrillex</title>
        <link rel="icon" href="skrillexlogoico.ico" type="image/x-icon" />
        <link href="https://fonts.googleapis.com/css2?family=Nimbus+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="container">
      <div className="title">RED LETTER TITLE</div>
        <div className="links-container">
          <a className="link" href="https://skrillex.lnk.to/QuestForFireAW">MUSIC</a>
          <a className="link" href="https://skrillex.lnk.to/VideosFC">VIDEOS</a> 
          <a className="link" href="https://skrillex.lnk.to/store">MERCH</a> 
        </div>
      </div>
      <div id="app2" ref={mount}>
        {/* Your app content goes here */}
      </div>
      <img id="footer-image" src="footerplaceholderorange.png" alt="Footer Image" /> 
    </div>
  );
}