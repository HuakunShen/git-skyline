import { GitProvider } from "@git-skyline/common";
import dynamic from "next/dynamic";
import Loading from "@/app/components/loading";

const Contribution = dynamic(() => import("@/app/components/contribution"), {
  loading: () => <Loading />,
  ssr: false,
});

interface PropType {
  params: { provider: string; username: string };
}

export default function Page({ params }: PropType): JSX.Element {
  return (
    <Contribution
      username={params.username}
      provider={GitProvider.parse(params.provider)}
    />
  );
}
