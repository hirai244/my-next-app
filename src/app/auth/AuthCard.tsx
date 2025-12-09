import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode; //
}

export default function AuthCard({
  title,
  description,
  children,
}: AuthCardProps) {
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
