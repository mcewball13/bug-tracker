import { ReactElement } from "react";
import Layout from "../../layouts";



GeneralDashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default function GeneralDashboard() {
  return <>Hello Dashboard</>;
}
