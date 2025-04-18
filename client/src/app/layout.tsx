"use client";

import useStore from "@/store";

export default function ChatRoom({
  children,
  login,
  chat,
}: Readonly<{
  children: React.ReactNode;
  login: React.ReactNode;
  chat: React.ReactNode;
}>) {
  const { isLoggedIn } = useStore();
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div>{!isLoggedIn ? login : chat}</div>
      </body>
    </html>
  );
}
