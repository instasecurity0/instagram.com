const FOOTER_LINKS = [
  "Meta", "About", "Blog", "Jobs", "Help", "API",
  "Privacy", "Terms", "Locations", "Instagram Lite",
  "Contact Uploading & Non-Users", "Meta Verified",
] as const;

interface FooterProps {
  visible?: boolean;
}

export default function Footer({ visible = true }: FooterProps) {
  return (
    <footer
      style={{
        zIndex: 1,
        paddingBottom: 28,
        paddingTop: 12,
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transition: "opacity 1s ease 0.4s",
      }}
    >
      <nav aria-label="Footer links">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "6px 16px",
            marginBottom: 10,
          }}
        >
          {FOOTER_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              style={{
                color: "#737373",
                fontSize: 12,
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#a8a8a8")}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "#737373")}
            >
              {link}
            </a>
          ))}
        </div>
      </nav>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          color: "#737373",
          fontSize: 12,
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            cursor: "pointer",
            background: "none",
            border: "none",
            color: "#737373",
            fontSize: 12,
            fontFamily: "inherit",
            padding: 0,
          }}
          aria-label="Change language"
        >
          English
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <polyline
              points="2,3.5 5,6.5 8,3.5"
              stroke="#737373"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span>© 2026 Instagram from Meta</span>
      </div>
    </footer>
  );
}