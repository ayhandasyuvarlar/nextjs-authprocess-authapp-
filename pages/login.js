/* eslint-disable react/jsx-no-comment-textnodes */
import Head from "next/head";
import Link from "next/link";
import Layout from "./layout/layout";
import styles from "@/styles/Form.module.css";
import github from "@/public/assets/github.svg";
import google from "@/public/assets/google.svg";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { HiFingerPrint, HiAtSymbol } from "react-icons/hi";
import { useState } from "react";
import { useFormik } from "formik";
const Login = () => {
  const [show, setShow] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });
  async function onSubmit(values) {
    console.log(values);
  }
  // google handler function
  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }
  // github handler function
  async function handleGithubSignin() {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  }

  return (
    <Layout>
      <Head>
        <title>Login Page</title>
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
          <div className={styles.input_group}>
            <input
              type={`${show ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span
              title={`${show ? "hidden password" : "visible password"}`}
              className="icon flex items-center px-4 cursor-pointer"
              onClick={() => {
                setShow(!show);
              }}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {/* login buttons */}
          <div className={styles.button}>
            <button type="submit">Login</button>
          </div>
          <div className="input-button">
            <button
              type="button"
              onClick={handleGoogleSignin}
              className={styles.button_custom}
            >
              Sign In with Google
              <Image
                src={"/assets/google.svg"}
                width={20}
                height={20}
                alt={"google-icon"}
              />
            </button>
          </div>
          <div className="input-button">
            <button
              type="button"
              className={styles.button_custom}
              onClick={handleGithubSignin}
            >
              Sign In with Github
              <Image
                src={"/assets/github.svg"}
                width={20}
                height={20}
                alt={"github-icon"}
              />
            </button>
          </div>
        </form>
        {/*bottom */}
        <p className="text-center text-gray-500">
          dont have an account yet
          <Link href={"/register"} className="text-blue-700">
            Sign up
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default Login;
