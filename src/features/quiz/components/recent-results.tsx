import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dot } from "lucide-react";

const RecentResults = () => {
  return (
    <Card className="gap-3 ">
      <CardHeader className="max-h-16">
        <CardTitle>Recent Results</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <ul className="space-y-1.5">
          <div className="flex items-center gap-3.5 ">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div>
              <h4 className="text-[.9rem]">John Doe</h4>
              <div className="flex items-center text-muted-foreground gap-1 text-[.8rem]">
                Mathematics
                <div className="flex items-center">
                  <span> 101 </span>
                  <Dot className="w-4 h-4" />
                  <span>{45}%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3.5 ">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div>
              <h4 className="text-[.9rem]">John Doe</h4>
              <div className="flex items-center text-muted-foreground gap-1 text-[.8rem]">
                Mathematics
                <div className="flex items-center">
                  <span> 101 </span>
                  <Dot className="w-4 h-4" />
                  <span>{45}%</span>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </CardContent>
    </Card>
  );
};
export default RecentResults;
