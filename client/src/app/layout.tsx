import type { Metadata } from "next";
import { Stack, Divider, Container } from "@mui/material";
export const metadata: Metadata = {
  title: "Create Nesswxt App",
  description: "Generated by create next app",
};

export default function RootLayout({
  chat,
  userList,
  children,
  test,
}: Readonly<{
  chat: React.ReactNode;
  userList: React.ReactNode;
  children: React.ReactNode;
  test: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        {test}
        <Container
          maxWidth="xl"
          sx={{
            height: "100%",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
        >
          <RowWithDivider userList={userList} chat={chat} />
        </Container>
      </body>
    </html>
  );
}

interface RowWithDividerProps {
  userList: React.ReactNode;
  chat: React.ReactNode;
}

const RowWithDivider = ({ userList, chat }: RowWithDividerProps) => (
  <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "row" }}>
    <Container maxWidth="xs">{userList}</Container>
    <Container>{chat}</Container>
  </Container>
);
