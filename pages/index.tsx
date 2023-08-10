import Clock from "@/components/Clock";
import SearchBox from "@/components/searchBox";

export default function Home() {
  return (
    <main
      className={`flex min-h-screen w-screen flex-col items-center p-4 align-middle sm:px-32`}
    >
      <Clock />
      <SearchBox />
    </main>
  );
}
