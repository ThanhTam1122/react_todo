import { TodoApp } from "@/components/TodoApp";
import Head from "next/head";

export default function Home() {
	return (
		<>
			<Head>
				<title>TODO アプリケーション</title>
				<meta
					name="description"
					content="TODO アプリケーション - タスク管理システム"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="min-h-screen bg-gray-50">
				<TodoApp />
			</main>
		</>
	);
}
