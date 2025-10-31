"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
type AccordionFormProps = {
  value: string;
  title: string;
  children: React.ReactNode;
  hasError?: boolean;
  className?: string;
};

export function AccordionForm({
  value,
  title,
  children,
  hasError,
  className,
}: AccordionFormProps) {
  return (
    <AccordionItem
      value={value}
      className="font-semibold text-lg hover:no-underline"
    >
      <AccordionTrigger>
        <div className="flex items-center justify-between w-full">
          <span>{title}</span>
          {hasError && (
            <span className="text-red-500 text-sm ml-4">(入力エラーあり)</span>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4 border-l border-r border-gray-200 rounded-b-lg">
        <div className="space-y-4">{children}</div>
      </AccordionContent>
    </AccordionItem>
  );
}
