import { useHandleTranslations } from "@/lib/handleTranslations";
import { Link } from "../../../navigation";
import Example from "@/components/Phone";

export default function Home() {
  // Use the hook to get translations as an object
  const t = useHandleTranslations("Homepage");

  return (
    <div>
      <h1>{t.title}</h1>
      <p>{t.content}</p>
      <Link href="/about">about</Link>
      <Example />
    </div>
  );
}
