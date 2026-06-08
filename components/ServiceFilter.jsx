// components/ServiceFilter.jsx

export default function ServiceFilter({
  serviceTypes,
  serviceType,
  setServiceType,
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-10">

      {serviceTypes.map((service) => (
        <button
          key={service.value}
          onClick={() => setServiceType(service.value)}
          className={`px-4 py-2 rounded-full border
            ${
              serviceType === service.value
                ? "bg-blue-600 text-white"
                : "bg-white"
            }
          `}
        >
          {service.label}
        </button>
      ))}

    </div>
  );
}