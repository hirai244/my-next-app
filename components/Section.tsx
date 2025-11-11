type SectionProps = {
  title: string;
  children: React.ReactNode;
};

export function Section({ title, children }: SectionProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">
        {title}
      </h2>
      {children}
    </div>
  );
}
