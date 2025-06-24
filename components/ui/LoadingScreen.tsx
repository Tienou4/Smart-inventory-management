import Loader from "@/components/ui/loader"

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-slate-900 text-center space-y-4">
      <Loader />
      <p className="text-muted-foreground text-sm">Veuillez patienter...</p>
    </div>
  );
}
