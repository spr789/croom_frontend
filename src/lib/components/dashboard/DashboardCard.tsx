"use client";

type DashboardCardProps = {
  title: string;
  href?: string;
  onClick?: () => void;
  color: string;
  icon: string;
};

export default function DashboardCard({
  title,
  href,
  onClick,
  color,
  icon,
}: DashboardCardProps) {
  const baseClasses = `text-white px-4 py-2 rounded hover:opacity-90`;

  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${color}`}>
        {icon} {title}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${color}`}>
      {icon} {title}
    </button>
  );
}
