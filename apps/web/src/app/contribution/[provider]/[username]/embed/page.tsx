import { GitProvider } from "@git-skyline/common";
import dynamic from "next/dynamic";
import Loading from "@/app/components/loading";
import "@/stylesheet/transparent-bg.css";

const ContributionVanilla = dynamic(
  () => import("@/app/components/contribution-vanilla"),
  {
    loading: () => <Loading />,
    ssr: false,
  }
);

interface PropType {
  params: { provider: string; username: string };
}

export default function Page({ params }: PropType): JSX.Element {
  return (
    <ContributionVanilla
      username={params.username}
      provider={GitProvider.parse(params.provider)}
    />
  );
}
