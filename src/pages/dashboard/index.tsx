import { ReactElement } from "react";
import DashboardLayout from "../../layouts/dashboard";



GeneralDashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

export default function GeneralDashboard() {
  return <>Hello Dashboard</>;
}
