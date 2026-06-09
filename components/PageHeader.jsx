export default function PageHeader({ count }) {
  return (
    <div className="mb-8">

      <h1 className="text-4xl font-bold text-gray-900">
        Trouvez la meilleure aide pour votre animal
      </h1>

      <p className="text-gray-500 mt-2">
        Garde, promenade, pension et soins vétérinaires.
      </p>

      <p className="mt-3 text-sm text-gray-400">
        {count} annonces trouvées
      </p>

    </div>
  );
}