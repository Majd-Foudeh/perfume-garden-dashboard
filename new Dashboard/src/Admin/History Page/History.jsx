import { TableOfHistory } from "./TableOfHistory";

export const History = () => {
  return (
    <div>
      <main className="p-4 px-8  md:ml-64 h-auto pt-20 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 mb-4">
          <TableOfHistory />
        </div>
      </main>
    </div>
  );
};
