import "./globals.css";

import Link from "next/link";

export const metadata = {
  title: "Comida da Boa",
  description: "Comida da boa do Luís Silva",
};

const Title = () => {
  const possible_emogis = [
    "🍎",
    "🍐",
    "🍊",
    "🍋",
    "🍌",
    "🍉",
    "🍇",
    "🍓",
    "🫐",
    "🍒",
    "🥝",
    "🍍",
    "🥭",
    "🍑",
    "🍆",
    "🥑",
    "🫑",
    "🥕",
    "🌽",
    "🥦",
  ];

  const random_emoji =
    possible_emogis[Math.floor(Math.random() * possible_emogis.length)];

  return (
    <div className="text-4xl flex justify-center ">
      {random_emoji}

      <h1 className="text-4xl text-center font-bold mb-4">
        <Link href="/">Comida da boa </Link>
        <span className="text-sm font-normal">
          do{" "}
          <a className="underline" href="www.google.com">
            Luís Silva
          </a>
        </span>
      </h1>
    </div>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧑‍🍳</text></svg>"
        />
      </head>
      <body className="max-w-3xl mx-auto p-4 min-h-screen flex flex-col">
        <Title />

        {children}

        <spacer className="flex-grow"></spacer>
        <footer className="flex flex-row justify-between text-lg">
          <p>
            {" "}
            Voltar ao{" "}
            <Link className="underline text-blue-500 font-bold" href="/">
              Início
            </Link>
            🏠{" "}
          </p>
        </footer>
      </body>
    </html>
  );
}
