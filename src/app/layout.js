import './globals.css';


export const metadata = {
  title: 'Mentora Chatbot',
  description: 'Mental health chatbot frontend',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">{children}</body>
    </html>
  );
}
