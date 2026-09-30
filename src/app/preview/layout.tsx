import { PreviewShell } from "@/components/PreviewShell";

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <PreviewShell>{children}</PreviewShell>;
}
