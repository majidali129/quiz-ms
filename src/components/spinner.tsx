import { LucideLoaderCircle } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex-1 h-full flex items-center justify-center flex-col self-center">
      <LucideLoaderCircle className="h-16 w-16 animate-spin text-primary" />
    </div>
  );
};
export default Spinner;
