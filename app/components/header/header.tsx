import { useEffect, useState } from "react";

export default function Header() {
  const [company, setCompany] = useState<string>("");
  useEffect(() => {
    setCompany(window.localStorage.getItem("name"));
  }, []);
  return (
    <header className="w-full flex items-center justify-between text-bg-gray-900 bg-gray-300 dark:bg-gray-800 dark:text-white p-4">
      <h1 className="text-xl font-semibold">Code Viewer</h1>
      <p>{company}</p>
    </header>
  );
}
