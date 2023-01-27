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
import login_validate from "@/lib/loginValidate";
import { useRouter } from "next/router";
const Login = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit,
  });
  async function onSubmit(values) {
    setLoading(true);
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });
    if (status.ok) {
      setLoading(false);
      setTimeout(() => {
        setMessage("success connect");
      }, 500);
      setTimeout(() => {
        router.push(status.url);
      }, 1000);
    }
    if (status) {
      setMessage(status.error);
    } else {
      setMessage(null);
    }
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
          {formik.errors.email && formik.touched.email && (
            <span className="text-red-500">{formik.errors.email}</span>
          )}
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
          {formik.errors.password && formik.touched.password && (
            <span className="text-red-500">{formik.errors.password}</span>
          )}
          {message !== null ? (
            <span
              className={`${
                message === "success connect"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </span>
          ) : null}
          {/* login buttons */}
          <div className={styles.button}>
            <button type="submit">{loading ? "Loading...!" : "Login"}</button>
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
          dont have an account yet&nbsp;
          <Link href={"/register"} className="text-blue-700">
            Sign up
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default Login;
