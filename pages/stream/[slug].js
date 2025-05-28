import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Select from '../../components/Select'; // custom Select
import styles from '../../styles/Stream.module.css';

export default function Stream() {
  const router = useRouter();
  const { slug } = router.query;

  const [currentUrl, setCurrentUrl] = useState('');
  const [data, setData] = useState({ data: [] });

  const handleGetData = async (slug) => {
    const response = await fetch(
      `https://apps.animekita.org/api/v1.1.6/chapter.php?url=${slug}&reso=720p`
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    if (!slug) return; // jangan fetch jika slug belum ada

    const getData = async () => {
      const data = await handleGetData(slug);
      setData(data);
      setCurrentUrl(data.data[0]?.stream[0]?.link || '');
    };

    getData();
  }, [slug]);

  if (currentUrl === '') {
    return <div>Loading...</div>;
  }

  const serverOptions = data.data[0]?.stream?.map((item) => ({
    label: item.link.split('/')[2],
    value: item.link,
  })) || [];

  return (
    <div className={styles.container}>
    <Head>
      <title>Streamin</title>
    </Head>
      <div className={styles.selectWrapper}>
        <Select
          value={currentUrl}
          onChange={setCurrentUrl}
          options={serverOptions}
          placeholder="Select server"
        />
      </div>
      <div>
        <video controls key={currentUrl} className={styles.videoPlayer}>
          <source src={currentUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
