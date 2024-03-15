import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/index.scss";
import "react-toastify/dist/ReactToastify.css";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import Providers from "./provider";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Voting App",
	description: "Solana based voting app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<title>Voting System</title>
				<meta
					name="description"
					content="Voting system powered by Solana contract"
				/>
				<link rel="icon" href="/favicon.ico" />
				<Script async src="https://www.googletagmanager.com/gtag/js?id=G-2X867N3PGK"></Script>
			</head>
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
			<GoogleAnalytics gaId="G-2X867N3PGK" />
		</html>
	);
}
