import ModuleCard from "@/components/modules/module-card";
import { KeyRound } from "lucide-react";
import React from "react";

const Dashboard = () => {
  return (
    <div className="p-5 pt-10 space-y-10">
      <h1 className="font-bold text-3xl">Dashboard</h1>
      <div className="flex items-center justify-center gap-x-10 flex-wrap">
        <ModuleCard icon={<KeyRound size={20} />} number="100" title="Total Passwords" />
        <ModuleCard icon={<KeyRound size={20} />} number="100" title="Total Passwords" />
      </div>
    </div>
  );
};

export default Dashboard;
