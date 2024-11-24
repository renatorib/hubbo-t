import "server-only";

const antiFouc = /* js */ `
;{
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const systemDark = (localStorage.theme === "system" || !("theme" in localStorage)) && prefersDark;

  if (localStorage.theme === 'dark' || systemDark) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}
`;

export const AntiFOUCScript = () => (
  <script type="text/javascript" async={true} dangerouslySetInnerHTML={{ __html: antiFouc }} />
);
