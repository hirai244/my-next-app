import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface JobCardProps {
  title: string;
  description: string;
  children?: React.ReactNode; //
}

export function JobCard({ title, description, children }: JobCardProps) {
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
