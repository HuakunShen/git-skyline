import Link from "next/link";
import Image from "next/image";
import GitHubIcon from "@/app/components/icons/GitHub";

interface Props {
  className?: string;
}

export default function Footer(props: Props) {
  return (
    <div className="px-10 pb-5 font-mono">
      <div className="flex justify-between">
        <p>
          Made with 🤍 by{" "}
          <Link href="https://github.com/HuakunShen">Huakun</Link>
        </p>
        <p>
          <Link href="https://github.com/HuakunShen/git-skyline" target="_blank">
            <GitHubIcon />
          </Link>
        </p>
      </div>
    </div>
  );
}
