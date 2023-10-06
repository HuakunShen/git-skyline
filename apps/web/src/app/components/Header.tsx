import GitHubIcon from "@/app/components/icons/GitHub";

interface Props {
  className?: string;
}

export default function Footer(props: Props) {
  return (
    <div className={props.className + " px-10 pt-5"}>
      <span className="flex items-center space-x-2">
        <GitHubIcon className="w-10 h-10" />
        <span className="text-xl font-semibold font-mono">Skyline</span>
      </span>
    </div>
  );
}
