import Spinner from "./Spinner/Spinner";
import styles from "./Spinner/SpinnerFullPage.module.css";

function SpinnerFullPage() {
  return (
    <div className={styles.spinnerFullpage}>
      <Spinner />
    </div>
  );
}

export default SpinnerFullPage;
