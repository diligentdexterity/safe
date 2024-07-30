import React, { FC } from "react";

const ModuleCard: FC<{ title: string; number: string; icon: React.ReactNode }> = ({ title, number, icon }) => {
  return (
    <div className="w-[350px] bg-primary/15 h-fit rounded-xl px-5 py-3 space-y-2">
      <div className="flex items-center justify-between">
        <p className="font-bold">{title}</p>
        {icon}
      </div>
      <h1 className="text-3xl font-bold">{number}</h1>
      <p className="text-sm text-muted-foreground font-semibold">All of your passwords are safe</p>
    </div>
  );
};

export default ModuleCard;
