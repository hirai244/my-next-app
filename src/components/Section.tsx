type SectionProps = {
  title: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
};
export function Section({ title, icon, children }: SectionProps) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
        {icon && <div className="text-green-600">{icon}</div>}
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}
