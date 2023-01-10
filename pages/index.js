import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    window.addEventListener('m-authenticated', async (event) => {
      // Get the data client instance
      const client = event.detail.client;

      // Get the NFTs owned by the currently connected wallet
      // Data client API's can be found here: https://docs.manifold.xyz/v/manifold-for-developers/client-widgets/connect-widget/data-client-apis
      setNfts(await client.getNFTsOfOwner());
      setAuthenticated(true);
    })
    window.addEventListener('m-unauthenticated', async (event) => {
      console.log('m-unauth event: ', event);
      setNfts([]);
      setAuthenticated(false);
    })
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>LTL</title>
        <meta name="description" content="LTL x Manifold" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://docs.manifold.xyz/v/manifold-for-developers/client-widgets/overview">
            Manifold
          </a>
          <span> </span>
          <a href="https://livethelife.tv">
            x LTL
          </a>
        </h1>
        <br />

        <div dangerouslySetInnerHTML={{ 
          __html: 
            `<div
              data-widget="m-connect"
              data-app-name='${process.env.NEXT_APP_MANIFOLD_APP_NAME}'
              data-client-id='${process.env.NEXT_APP_MANIFOLD_CLIENT_ID}'
              data-network='${process.env.NEXT_APP_NETWORK}'
            ></div>`
        }} />
      
      {/* Display NFTs */}
      {authenticated && <h2 className={styles.title}>Your NFTs</h2>}
      <div id="nfts">
        {nfts.map((nft) => {
          return (
            <img key={`${nft.tokenId}-${nft.contractAddress}`} src={nft.image} height={200} width={200}></img>
          )
        })}
      </div>
      </main>
    </div>
  )
}
