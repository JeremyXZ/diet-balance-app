import "./globals.css";

export const metadata = {
  title: "Diet Balance App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="candy-mesh">{children}</body>
    </html>
  );
}
