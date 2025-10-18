
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Select from '../../components/Select';
import styles from '../../styles/Stream.module.css';

export default function Stream() {
  const router = useRouter();
  const { slug, title: queryTitle, episode: queryEpisode } = router.query;

  const [currentUrl, setCurrentUrl] = useState('');
  const [data, setData] = useState({ data: [] });
  const [currentIndex, setCurrentIndex] = useState(0);

  const [title, setTitle] = useState('');
  const [episode, setEpisode] = useState('');

  // Ambil title & episode dari query (URL)
  useEffect(() => {
    if (queryTitle) setTitle(queryTitle);
    if (queryEpisode) setEpisode(queryEpisode);
  }, [queryTitle, queryEpisode]);

  const handleGetData = async (slug) => {
    const response = await fetch(
      `https://apps.animekita.org/api/v1.1.6/chapter.php?url=${slug}&reso=720p`
    );
    const result = await response.json();
    return result;
  };

  useEffect(() => {
    if (!slug) return;

    const getData = async () => {
      const result = await handleGetData(slug);
      setData(result);

      const info = result?.data?.[0];
      const allStreams = info?.stream || [];

      // Cari video yang sesuai dengan slug dan jadikan currentUrl
      const matchedIndex = allStreams.findIndex((s) => s.link.includes(slug));

      if (matchedIndex >= 0) {
        setCurrentIndex(matchedIndex);
        setCurrentUrl(allStreams[matchedIndex].link);
      } else if (allStreams.length > 0 && !currentUrl) {
        // fallback: pilih server pertama jika tidak ada kecocokan
        setCurrentIndex(0);
        setCurrentUrl(allStreams[0].link);
      }

      // Jika title/episode tidak dikirim lewat query, coba ambil dari response
      if (!title) {
        const detectedTitle = info?.judul_anime || info?.anime || info?.title || '';
        if (detectedTitle) setTitle(detectedTitle);
      }
      if (!episode) {
        const detectedEp = info?.episode || info?.ch || '';
        if (detectedEp) setEpisode(detectedEp);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]); // intentionally only depend on slug

  // Sinkronisasi currentIndex setiap kali currentUrl atau daftar stream berubah
  useEffect(() => {
    const streamList = data.data?.[0]?.stream || [];
    if (!streamList.length || !currentUrl) return;
    const idx = streamList.findIndex((item) => item.link === currentUrl);
    if (idx >= 0 && idx !== currentIndex) {
      setCurrentIndex(idx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUrl, data]);

  if (!data.data.length || !currentUrl) {
    return <div>Loading...</div>;
  }

  const streamList = data.data[0]?.stream || [];

  const serverOptions = streamList.map((item) => ({
    label: item.link.split('/')[2] || item.link,
    value: item.link,
  }));

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setCurrentUrl(streamList[newIndex].link);
    }
  };

  const handleNext = () => {
    if (currentIndex < streamList.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setCurrentUrl(streamList[newIndex].link);
    }
  };

  const handleSelectChange = (value) => {
    const index = streamList.findIndex((item) => item.link === value);
    if (index >= 0) setCurrentIndex(index);
    setCurrentUrl(value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{title ? `${title} - Episode ${episode || currentIndex + 1}` : 'Streaming Player'}</title>
      </Head>

      <div className={styles.headerInfo}>
        <h1 className={styles.title}>{title || 'Judul Tidak Diketahui'}</h1>
        {episode && <p className={styles.episodeInfo}>Episode {episode}</p>}
      </div>

      {/* Pilihan Server */}
      <div className={styles.selectWrapper}>
        <Select
          value={currentUrl}
          onChange={handleSelectChange}
          options={serverOptions}
          placeholder="Select server"
        />
      </div>

      {/* Video Player */}
      <div className={styles.videoWrapper}>
        <video controls key={currentUrl} className={styles.videoPlayer}>
          <source src={currentUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Tombol Navigasi */}
      <div className={styles.navButtons}>
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`${styles.navButton} ${currentIndex === 0 ? styles.disabled : ''}`}
        >
          ⬅ Prev
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === streamList.length - 1}
          className={`${styles.navButton} ${currentIndex === streamList.length - 1 ? styles.disabled : ''}`}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}
