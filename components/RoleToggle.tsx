"use client";

export type Role = "customer" | "carrier";

export function RoleToggle({
  value,
  onChange,
}: {
  value: Role;
  onChange: (role: Role) => void;
}) {
  const options: { role: Role; label: string }[] = [
    { role: "customer", label: "Customer" },
    { role: "carrier", label: "Carrier" },
  ];

  return (
    <div className="inline-flex gap-1 rounded-field border border-border bg-surface p-1">
      {options.map(({ role, label }) => {
        const active = value === role;
        return (
          <button
            key={role}
            type="button"
            onClick={() => onChange(role)}
            className={
              active
                ? "rounded-[8px] bg-accent px-5 py-2.5 text-sm font-medium text-accent-onaccent"
                : "rounded-[8px] px-5 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
