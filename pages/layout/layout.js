import styles from "@/styles/Layout.module.css";
const Layout = ({ children }) => {
  return (
    <section className={"flex h-screen bg-blue-400  "}>
      <div className="m-auto bg-slate-50 rounded-l-xl w-3/5 h-6/6 grid lg:grid-cols-2"> 
        <div className={styles.imgStyle}>
          <div className={styles.cartoonImg}></div>
          <div className={styles.cloudOne}></div>
          <div className={styles.cloudTwo}></div>
        </div>
        <div className="right flex flex-col justify-evenly">
          <div className="text-center py-10">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default Layout;
