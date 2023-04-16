import styles from "../src/styles/Layout.module.css";
const layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-blue-400">
      <div className="m-auto bg-slate-50 rounded-md h-screen w-4/5 sm:w-3/5 grid lg:grid-cols-2">
        <div className={styles.imgStyle}>
          <div className={styles.cartoonImg}></div>
          <div className={styles.cloud_one}></div>
          <div className={styles.cloud_two}></div>
        </div>
        <div className="right flex flex-col justify-evenly">
          <div className="text-center">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default layout;
