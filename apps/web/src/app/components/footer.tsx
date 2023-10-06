import Link from "next/link";
import { GitHubIcon } from "ui";

interface PropType {
  className?: string;
}

export default function Footer(props: PropType) {
  return (
    <div className="px-10 pb-5 font-mono">
      <div className="flex justify-between">
        <p>
          Made with 🤍 by
          <Link href="https://github.com/HuakunShen"> Huakun</Link>
        </p>
        <p>
          <Link
            href="https://github.com/HuakunShen/git-skyline"
            target="_blank"
          >
            <GitHubIcon />
          </Link>
        </p>
      </div>
    </div>
  );
}
