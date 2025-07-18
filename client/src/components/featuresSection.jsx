import { cn } from "@/lib/utils";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Dynamic Form Builder",
      description:
        "Easily create and customize forms with drag-and-drop simplicity.",
    },
    {
      title: "Rich Response Analytics",
      description:
        "Visualize feedback with clean dashboards and real-time metrics.",
    },
    {
      title: "JWT-Secured Admin Access",
      description:
        "Robust authentication ensures only verified admins manage forms.",
    },
    {
      title: "Public Shareable Links",
      description:
        "Effortlessly collect feedback using sharable, public form URLs.",
    },
    {
      title: "CSV Export & Reporting",
      description:
        "Export response data to CSV for offline reports or integration.",
    },
    {
      title: "Mobile-Responsive Design",
      description:
        "Beautiful UI that works across all devices and screen sizes.",
    },
    {
      title: "Custom Thank You Pages",
      description: "Add a personal touch to the end of every feedback journey.",
    },
    {
      title: "Fully Modular Dashboard",
      description:
        "Organized admin experience with detailed, per-form insights.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({ title, description, icon, index }) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
