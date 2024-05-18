import styles from "./Product/Product.module.css";
import PageNav from "../components/PageNav/PageNav"
export default function PageNotFound() {
  return (
    <div className={styles.product}>
      <PageNav />
      <h1
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "5rem",
        }}
      >
        Page not found 😢
      </h1>
    </div>
  );
}
