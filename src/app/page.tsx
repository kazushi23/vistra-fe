import Image from "next/image";
import Heading from "../components/heading"
import List from "../components/list";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main>
        <Heading/>
        <List/>
      </main>
    </div>
  );
}
