import { Card } from "@/components/ui/card";

type QuizStatsCardProps = {
  title: string;
  value: number;
  description: string;
};

const QuizStatsCard = ({ title, value, description }: QuizStatsCardProps) => {
  return (
    <Card className="w-full py-3 px-4 rounded bg-card">
      <p className="flex items-center justify-between">
        {title} <span className="font-semibold text-primary">{value}</span>
      </p>
      <p className="text-muted-foreground text-sm">{description}</p>
    </Card>
  );
};
export default QuizStatsCard;
