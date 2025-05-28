import Link from 'next/link';
import styles from '../styles/Home.module.css';

export async function getServerSideProps() {
    const res = await fetch('https://apps.animekita.org/api/v1.1.6/terbaru.php');
    const data = await res.json();

    return {
        props: {
            movies: data,
        },
    };
}

export default function Home({ movies }) {
    return (
        <main className={styles.container}>
            <Head>
                <title>Streamin - Streaming Anime Sub Indo</title>
                <meta name="description" content="Tempat Streaming Anime Subtitle Indonesia" />
            </Head>
            <h2 className={styles.title}>Upload Terbaru</h2>
            <div className={styles.grid}>
                {movies.map((movie) => (
                    <Link href={`/details/${movie.url}`} className={styles.card}>
                        <img src={movie.cover} alt={movie.judul} className={styles.cover} />
                        <h2>{movie.judul}</h2>
                        <p>{movie.lastch} • {movie.lastup}</p>
                    </Link>
                ))}
            </div>
        </main>
    );
}
