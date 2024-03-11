import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/index.scss";
import "react-toastify/dist/ReactToastify.css";
import Providers from "./provider";

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
			</head>
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
