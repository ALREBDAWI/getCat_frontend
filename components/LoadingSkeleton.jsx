// components/LoadingSkeleton.jsx

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="h-96 bg-gray-200 rounded-2xl animate-pulse"
        />
      ))}
    </div>
  );
}