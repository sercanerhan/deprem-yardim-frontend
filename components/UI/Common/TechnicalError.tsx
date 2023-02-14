import styles from "./TechnicalError.module.css";
import Link from "next/link";

const TechnicalError = () => {
  return (
    <div className={styles.technicalErrorWrapper}>
      <div className={styles.technicalErrorParaContainer}>
        {/* ErrorOutlineIcon */}
        <svg className={styles.technicalErrorIcon} />
        <p className={styles.technicalErrorPara}>Teknik bir sorun yaşandı</p>
        <p className={styles.technicalErrorPara}>
          Lütfen birazdan tekrar deneyin
        </p>
        <Link href="/" className={styles.technicalErrorLink}>
          <p>Yeniden dene</p>
        </Link>
      </div>
    </div>
  );
};

export default TechnicalError;
