export default function FilterBar({
  services,
  serviceType,
  setServiceType,
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-10">

      <button
        onClick={() => setServiceType("")}
        className={`px-4 py-2 rounded-full border ${
          serviceType === ""
            ? "bg-blue-600 text-white"
            : "bg-white"
        }`}
      >
        Tous les services
      </button>

      {services.map((service) => (
        <button
          key={service.serviceId}
          onClick={() =>
            setServiceType(service.serviceType)
          }
          className={`px-4 py-2 rounded-full border ${
            serviceType === service.serviceType
              ? "bg-blue-600 text-white"
              : "bg-white"
          }`}
        >
          {service.serviceType}
        </button>
      ))}
    </div>
  );
}