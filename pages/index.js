import React, { useRef, useEffect } from 'react';
import Head from 'next/head';
import styles from './Home.module.css';
import { initializeThreeJS } from '../utils/app.js';  // Adjust path if necessary


export default function Home() {

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
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="/style.css" />
                <title>Skrillex</title>
                <link rel="icon" href="/skrillexlogoico.ico" type="image/x-icon" />
                <link href="https://fonts.googleapis.com/css2?family=Nimbus+Sans:wght@400;700&display=swap" rel="stylesheet" />
            </Head>

            <div className={styles.container}>
                <a className={styles.link} href="/rlt">RED LETTER TITLE</a>
                <a className={styles.link} href="/br">BR</a>
            </div>

            <div id="app" ref={mount}>
                {/* Your app content goes here */}
            </div>

            {/* If your app.js has React code, you can import it here.
                Otherwise, you'll need to refactor it to work with React and Next.js */}
        </div>
    )
}