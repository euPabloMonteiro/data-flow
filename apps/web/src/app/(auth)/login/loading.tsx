import { Loader2 } from "lucide-react";

export default function LoginLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-df-bg-primary">
      <Loader2 className="w-8 h-8 text-df-accent animate-spin" />
    </div>
  );
}
