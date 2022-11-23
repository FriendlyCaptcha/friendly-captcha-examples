import Head from "next/head";
import Link from "next/link";
import { useRef, useState } from "react";
import FriendlyCaptcha from "../../components/friendlyCaptcha";
import Layout from "../../components/layout";

const handleFormSubmit = async (event, setMessage, resetWidget) => {
  event.preventDefault();

  const res = await fetch("/api/submitBasic", {
    body: JSON.stringify({
      name: event.target.name.value,
      frcCaptchaSolution: event.target["frc-captcha-solution"].value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const result = await res.json(); // The endpoint currently returns `{msg: "some message"}
  setMessage(`${result.msg} (status ${res.status})`);

  // We should always reset the widget as a solution can not be used twice.
  resetWidget();
};

export default function BasicForm() {
  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);
  const [message, setMessage] = useState("");
  const widgetRef = useRef();
  const reset = () => {
    setSubmitButtonEnabled(false);
    if (widgetRef.current) {
      // The type of widgetRef.current is WidgetInstance, see the JS API details here:
      // https://docs.friendlycaptcha.com/#/widget_api?id=javascript-api
      widgetRef.current.reset();
    }
  };

  return (
    <Layout>
      <Head>
        <title>Basic Form Example</title>
      </Head>

      <h1>Basic Form</h1>
      <form className="column-form" onSubmit={(ev) => handleFormSubmit(ev, setMessage, reset)}>
        <label htmlFor="name">Your Name</label>
        <input
          className="mb-2"
          id="name"
          name="name"
          autoComplete="name"
          type="text"
          placeholder="Jane Doe"
          required="1"
        ></input>

        <FriendlyCaptcha
          ref={widgetRef}
          sitekey={process.env.NEXT_PUBLIC_FRIENDLY_CAPTCHA_SITEKEY}
          doneCallback={() => setSubmitButtonEnabled(true)}
          errorCallback={(err) => {
            setMessage("Anti-robot widget issue" + JSON.stringify(err)); // Should really never happen.
            setSubmitButtonEnabled(true);
          }}
        ></FriendlyCaptcha>

        <button className="mt-2" type="submit" disabled={submitButtonEnabled ? undefined : "null"}>
          Submit Form
        </button>
      </form>

      {message ? (
        <div className="card">
          <p>{message}</p>
        </div>
      ) : undefined}

      <div className="mt-2">
        <Link href="/">Back to home</Link>
      </div>
    </Layout>
  );
}
