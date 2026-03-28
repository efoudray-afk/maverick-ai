export default function Header() {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__name">
          <span>Maverick</span> Companies
        </span>
        <span className="header__subtitle">AI Assistant</span>
        <span className="header__location">
          <svg width="9" height="11" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
          </svg>
          Excelsior, MN
        </span>
      </div>
      <a
        className="header__cta"
        href="mailto:wfoudray@maverickcos.com?subject=Consultation%20Request"
      >
        Schedule a Consultation
      </a>
    </header>
  );
}
