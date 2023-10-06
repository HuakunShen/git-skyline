import Link from "next/link";
import { GitHubIcon } from "ui";

interface PropType {
  className?: string;
}

export default function Footer(props: PropType) {
  return (
    <div className={`${props.className} px-10 pt-5`}>
      <div className="flex">
        <Link href="/" className="flex items-center space-x-2">
          <GitHubIcon className="w-10 h-10" />
          <span className="text-xl font-semibold font-mono">Skyline</span>
        </Link>
      </div>
    </div>
  );
}
