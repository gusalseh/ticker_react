// import React from "react";
// import { TicketStatus, TicketPriority } from "../pages/Board";

// interface BadgeProps {
//   children: React.ReactNode;
//   className: string;
// }

// const Badge: React.FC<BadgeProps> = ({ children, className }) => (
//   <span className={`px-2 py-1 rounded-full text-xs font-semibold ${className}`}>
//     {children}
//   </span>
// );

// interface StatusBadgeProps {
//   status: TicketStatus;
// }

// export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
//   const statusStyles = {
//     [TicketStatus.TODO]: "bg-gray-200 text-gray-800",
//     [TicketStatus.INPROGRESS]: "bg-blue-200 text-blue-800",
//     [TicketStatus.PENDING]: "bg-yellow-200 text-yellow-800",
//     [TicketStatus.RESOLVED]: "bg-green-200 text-green-800",
//     [TicketStatus.CLOSED]: "bg-red-200 text-red-800",
//     [TicketStatus.ARCHIVED]: "bg-purple-200 text-purple-800",
//   };

//   return <Badge className={statusStyles[status]}>{status}</Badge>;
// };

// interface PriorityBadgeProps {
//   priority: TicketPriority;
// }

// export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
//   const priorityStyles = {
//     [TicketPriority.LOW]: "bg-green-200 text-green-800",
//     [TicketPriority.MEDIUM]: "bg-yellow-200 text-yellow-800",
//     [TicketPriority.HIGH]: "bg-red-200 text-red-800",
//   };

//   return <Badge className={priorityStyles[priority]}>{priority}</Badge>;
// };

import React from "react";
import { TicketStatus, TicketPriority } from "../pages/Board";

interface BadgeProps {
  children: React.ReactNode;
  className: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${className}`}>
    {children}
  </span>
);

interface StatusBadgeProps {
  status: TicketStatus;
  onChange: (newStatus: TicketStatus) => void;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  onChange,
}) => {
  const statusStyles = {
    [TicketStatus.TODO]: "bg-gray-200 text-gray-800",
    [TicketStatus.INPROGRESS]: "bg-blue-200 text-blue-800",
    [TicketStatus.PENDING]: "bg-yellow-200 text-yellow-800",
    [TicketStatus.RESOLVED]: "bg-green-200 text-green-800",
    [TicketStatus.CLOSED]: "bg-red-200 text-red-800",
    [TicketStatus.ARCHIVED]: "bg-purple-200 text-purple-800",
  };

  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value as TicketStatus)}
      className={`${statusStyles[status]} px-2 py-1 rounded-full text-xs font-semibold cursor-pointer`}
    >
      {Object.values(TicketStatus).map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
};

interface PriorityBadgeProps {
  priority: TicketPriority;
  onChange: (newPriority: TicketPriority) => void;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  onChange,
}) => {
  const priorityStyles = {
    [TicketPriority.LOW]: "bg-green-200 text-green-800",
    [TicketPriority.MEDIUM]: "bg-yellow-200 text-yellow-800",
    [TicketPriority.HIGH]: "bg-red-200 text-red-800",
  };

  //   return <Badge className={priorityStyles[priority]}>{priority}</Badge>;
  return (
    <select
      value={priority}
      onChange={(e) => onChange(e.target.value as TicketPriority)}
      className={`${priorityStyles[priority]} px-2 py-1 rounded-full text-xs font-semibold cursor-pointer`}
    >
      {Object.values(TicketPriority).map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
};
