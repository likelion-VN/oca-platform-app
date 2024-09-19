export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
}
