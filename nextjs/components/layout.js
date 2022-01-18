export default function Layout({ children }) {
  return (
    <div className="container">
      <main>{children}</main>
      <footer>
        <a href="https://docs.friendlycaptcha.com" target="_blank">
          <b>Friendly Captcha documentation</b>
        </a>
      </footer>
    </div>
  );
}
