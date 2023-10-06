import { GitProvider } from "@git-skyline/common";

export default function ContributionPage(): JSX.Element {
  return (
    <div>
      <h1>List of Git Providers</h1>
      <ul>
        <li>{GitProvider.Enum.github}</li>
      </ul>
    </div>
  );
}
