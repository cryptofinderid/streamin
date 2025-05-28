import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Promote.module.css"; // gunakan CSS modular

export default function PromotePage() {
  const data = [
    { posts: "1 Post", duration: "3 Days", price: "$10" },
    { posts: "3 Posts", duration: "1 Week", price: "$15" },
    { posts: "5 Posts", duration: "1 Week", price: "$20" },
    { posts: "7 Posts", duration: "2 Weeks", price: "$30" },
    { posts: "10 Posts", duration: "2 Weeks", price: "$40" },
    { posts: "12 Posts", duration: "3 Weeks", price: "$50" },
    { posts: "15 Posts", duration: "3 Weeks", price: "$60" },
    { posts: "18 Posts", duration: "1 Month", price: "$75" },
    { posts: "20 Posts", duration: "1 Month", price: "$85" },
    { posts: "25 Posts", duration: "1 Month", price: "$100" },
  ];

  return (
    <>
      <Head>
        <title>Promote Your Project | AirdropID Foundation</title>
        <meta
          name="description"
          content="Promote your crypto project easily on AirdropID Foundation."
        />
      </Head>

      <Header />

      <main className={styles.container}>
      <section className={styles.heroSection}>
          <h1 className={styles.heroTitle}>Promote Your Project</h1>
          <p className={styles.heroSubtitle}>Choose the best promotion package that fits your needs and get your project seen by more people.</p>
        </section>

        <section className={styles.section}>
          <h2>Promotion Pricing</h2>

          <div className={styles.tableWrapper}>
            <table className={styles.priceTable}>
              <thead>
                <tr>
                  <th scope="col">Posts</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.posts}</td>
                    <td>{item.duration}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
