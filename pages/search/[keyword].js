import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const router = useRouter();
  const { keyword } = router.query;

  const [data, setData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!keyword) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://apps.animekita.org/api/v1.1.6/search.php?keyword=${keyword}`
        );
        const result = await res.json();

        if (!result?.data?.[0]?.result?.length) {
          setNotFound(true);
        } else {
          setData(result.data[0]);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setNotFound(true);
      }
    };

    fetchData();
  }, [keyword]);

  if (notFound) return <div className={styles.container}>Not Found</div>;
  if (!data) return <div className={styles.container}>Loading...</div>;

  return (
    <main className={styles.container}>
    <Head>
      <title>Pencarian: {keyword}</title>
    </Head>
      <h2 className={styles.title}>
        Total <span className="font-bold">{data.jumlah}</span> hasil untuk "{keyword}"
      </h2>
      <div className={styles.grid}>
        {data.result.map((movie) => (
          <Link
            key={movie.id}
            href={`/details/${movie.url}`}
            className={styles.card}
          >
            <img
              src={movie.cover}
              alt={movie.judul}
              className={styles.cover}
            />
            <h2>{movie.judul}</h2>
            <p>{movie.lastch}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
