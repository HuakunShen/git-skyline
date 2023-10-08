import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="h-full flex flex-col">
      <Header className="flex-none" />
      <div className="grow">{children}</div>
      <Footer className="flex-none" />
    </div>
  );
}
