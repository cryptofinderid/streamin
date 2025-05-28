import styles from '../../styles/Detail.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router';

export async function getServerSideProps({ params }) {
  const res = await fetch(`https://apps.animekita.org/api/v1.1.6/series.php?url=${params.slug}`);
  const json = await res.json();
  const data = json.data?.[0] || null;

  return {
    props: { data },
  };
}

export default function DetailPage({ data }) {
  const router = useRouter();

  if (!data) return <div className={styles.container}>Data tidak ditemukan.</div>;

  // Handler klik episode: navigasi ke /stream/[slug] dengan slug episode
  const handleEpisodeClick = (episodeSlug) => {
    router.push(`/stream/${encodeURIComponent(episodeSlug)}`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{data.judul} - Streamin</title>
      </Head>
      <h1 className={styles.title}>{data.judul}</h1>
      <div className={styles.info}>
        <img src={data.cover} alt={data.judul} className={styles.cover} />
        <div className={styles.meta}>
          <p><strong>Tipe:</strong> {data.type}</p>
          <p><strong>Status:</strong> {data.status}</p>
          <p><strong>Rating:</strong> {data.rating}</p>
          <p><strong>Author:</strong> {data.author}</p>
          <p><strong>Published:</strong> {data.published}</p>
          <p><strong>Genre:</strong> {data.genre.join(', ')}</p>
        </div>
      </div>
      <div className={styles.section}>
        <h2>Sinopsis</h2>
        <p className={styles.sinopsis}>{data.sinopsis}</p>
      </div>
      <div className={styles.section}>
        <h2>Daftar Episode</h2>
        <ul className={styles.episodeList}>
          {data.chapter.map((ep) => (
            <li
              key={ep.id}
              className={styles.episode}
              style={{ cursor: 'pointer' }}
              onClick={() => handleEpisodeClick(ep.url)} // pastikan ep.url adalah slug episode
              title={`Episode ${ep.ch} - Klik untuk nonton`}
            >
              <span>Episode {ep.ch}</span>
              <span>{ep.date}</span>
              <span>{ep.views} views</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
