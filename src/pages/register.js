import Head from "next/head";
import Layout from "../../layout/layout";
import styles from "../styles/Form.module.css";
import Link from "next/link";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { RegisterValidation } from "../../validation/RegisterValidation";

const Register = () => {
  const [show, setShow] = useState({ password: false, cpassword: false });
  const [registerError, setRegisterError] = useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate: RegisterValidation,
    onSubmit: onSubmit,
  });

  async function onSubmit(values) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    try {
      const response = await fetch("/api/auth/signup", options);
      const data = await response.json();

      if (data.error) {
        setRegisterError(data.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      setRegisterError("An error occurred. Please try again later.");
    }
  }

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-6">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
          <p className=" mx-auto text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
            officia?
          </p>
        </div>

        {/* form */}
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          {registerError && (
            <span className="text-sm text-rose-500"> {registerError}</span>
          )}
          <div className={styles.input_group}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className={styles.input_text}
              {...formik.getFieldProps("username")}
            />
            <span className="icon flex items-center px-4">
              <HiOutlineUser size={25} />
            </span>
          </div>
          {formik.errors.username && formik.touched.username ? (
            <span className="text-sm text-rose-500">
              {formik.errors.username}
            </span>
          ) : (
            <></>
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
          {formik.errors.email && formik.touched.email ? (
            <span className="text-sm text-rose-500">{formik.errors.email}</span>
          ) : (
            <></>
          )}
          <div className={styles.input_group}>
            <input
              type={`${show.password ? "text" : "password"}`}
              name="password"
              placeholder="password"
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow({ ...show, password: !show.password })}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <span className="text-sm text-rose-500">
              {formik.errors.password}
            </span>
          ) : (
            <></>
          )}

          <div className={styles.input_group}>
            <input
              type={`${show.cpassword ? "text" : "password"}`}
              name="cpassword"
              placeholder="Confirm Password"
              className={styles.input_text}
              {...formik.getFieldProps("cpassword")}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {formik.errors.cpassword && formik.touched.cpassword ? (
            <span className="text-sm text-rose-500">
              {formik.errors.cpassword}
            </span>
          ) : (
            <></>
          )}

          {/* login buttons */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Sign Up
            </button>
          </div>
        </form>

        {/* bottom */}
        <p className="text-center text-gray-400 ">
          Have an account?{" "}
          <Link href={"/login"} className="text-blue-700">
            Sign In
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default Register;
