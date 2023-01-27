import Head from "next/head";
import Link from "next/link";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import Layout from "./layout/layout";
import styles from "@/styles/Form.module.css";
import { useState } from "react";
import { useFormik } from "formik";
import register_validate from "@/lib/registerValidate";
import { Axios } from "axios";
export default function Register() {
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: register_validate,
    onSubmit,
  });
  async function onSubmit(values) {
    try {
      const resp = await new Axios({
        method: "POST",
        url: `http://localhost:3000/api/auth/signup`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          userName: values.userName,
          email: values.email,
          password: values.password,
        },
      });
      console.log(resp);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <Layout>
      <Head>
        <title>Register Page</title>
      </Head>
      <section className="w-3/4 mx-auto flex  flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-900 text-4xl font-bold">Explore</h1>
          <p className="w-4/4 mx-auto text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum.
          </p>
        </div>
        {/* form login */}
        <form className="flex  flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div className={styles.input_group}>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              className={styles.input_text}
              {...formik.getFieldProps("userName")}
            />
            <span className="icon flex items-center px-4">
              <HiOutlineUser size={25} />
            </span>
          </div>
          {formik.errors.userName && formik.touched.userName && (
            <span className="text-red-500">{formik.errors.userName}</span>
          )}
          <div className={styles.input_group}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
              {...formik.getFieldProps("email")}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          {formik.errors.email && formik.touched.email && (
            <span className="text-red-500">{formik.errors.email}</span>
          )}
          <div className={styles.input_group}>
            <input
              type={`${show.password ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span
              title={`${
                show.password ? "hidden password" : "visible password"
              }`}
              className="icon flex items-center px-4 cursor-pointer"
              onClick={() => {
                setShow({ ...show, password: !show.password });
              }}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {formik.errors.password && formik.touched.password && (
            <span className="text-red-500">{formik.errors.password}</span>
          )}
          <div className={styles.input_group}>
            <input
              type={`${show.confirmPassword ? "text" : "password"}`}
              name="confirmPassword"
              placeholder="Confirm Password"
              className={styles.input_text}
              {...formik.getFieldProps("confirmPassword")}
            />
            <span
              title={`${
                show.confirmPassword ? "hidden password" : "visible password"
              }`}
              className="icon flex items-center px-4 cursor-pointer"
              onClick={() => {
                setShow({ ...show, confirmPassword: !show.confirmPassword });
              }}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <span className="text-red-500">
              {formik.errors.confirmPassword}
            </span>
          )}
          {/* login buttons */}
          <div className={styles.button}>
            <button type="submit">Login</button>
          </div>
        </form>
        {/*bottom */}
        <p className="text-center text-gray-500">
          Do you already have an account
          <Link href={"/login"}>
            <a className="text-blue-700"> Sign up</a>{" "}
          </Link>
        </p>
      </section>
    </Layout>
  );
}
