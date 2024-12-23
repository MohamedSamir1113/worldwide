// Uses the same styles as Product
import styles from "./Product/Product.module.css";
import PageNav from "../components/PageNav/PageNav";
export default function Product() {
  return (
    <main className={styles.product}>
      
      <section>
        <div className={styles.content}>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </p>
        </div>
        <div>
          <img
            src="img-2.jpg"
            alt="overview of a large city with skyscrapers"
          />
        </div>
      </section>
    </main>
  );
}
