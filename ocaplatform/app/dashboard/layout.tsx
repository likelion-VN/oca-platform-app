"use client";

import { Provider } from "react-redux";
import store from "../store";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <div className="dashboard-layout">
        <div className="dashboard-content">{children}</div>
      </div>
    </Provider>
  );
}
