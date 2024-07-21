// import React, { useContext, useState } from "react";
// import { Button } from "../../components";
// import { UserContext } from "../../userContext";
// import { TicketStatus, TicketPriority, Ticket } from "../Board";
// import { Icon } from "../../theme/daisyui";

// interface TicketModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onCreateTicket: (ticket: Omit<Ticket, "id">) => void;
// }

// const TicketModal: React.FC<TicketModalProps> = ({
//   isOpen,
//   onClose,
//   onCreateTicket,
// }) => {
//   const userContext = useContext(UserContext);
//   const { name, team } = userContext;

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState<TicketStatus>(TicketStatus.TODO);
//   const [priority, setPriority] = useState<TicketPriority>(
//     TicketPriority.MEDIUM
//   );

//   const handleCreateTicket = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const newTicket: Omit<Ticket, "id"> = {
//       title,
//       description,
//       requester: name,
//       team: team,
//       status,
//       priority,
//     };
//     onCreateTicket(newTicket);
//     setTitle("");
//     setDescription("");
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-4 rounded shadow-lg">
//         <div className="flex flex-row justify-between">
//           <h2 className="text-lg font-bold mb-4">새로운 티켓</h2>
//           <Icon
//             name="remove"
//             className="btn-error btn-xs"
//             onClick={onClose}
//           ></Icon>
//         </div>
//         <form onSubmit={handleCreateTicket}>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="ticketTitle"
//             >
//               티켓 제목
//             </label>
//             <input
//               type="text"
//               id="ticketTitle"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full p-2 mb-4 border"
//               placeholder="티켓 제목"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="ticketDescription"
//             >
//               티켓 설명
//             </label>
//             <textarea
//               id="ticketDescription"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full p-2 mb-4 border"
//               placeholder="티켓 설명"
//               required
//             ></textarea>
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="ticketPriority"
//             >
//               우선 순위
//             </label>
//             <select
//               id="ticketPriority"
//               className="w-full p-2 mb-4 border"
//               value={priority}
//               onChange={(e) => setPriority(e.target.value as TicketPriority)}
//             >
//               <option value={TicketPriority.LOW}>Low</option>
//               <option value={TicketPriority.MEDIUM}>Medium</option>
//               <option value={TicketPriority.HIGH}>High</option>
//             </select>
//           </div>
//           <div className="flex justify-end">
//             <Button type="submit" optionalStyle="w-30">
//               생성
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TicketModal;

import React, { useContext, useState } from "react";
import { Button } from "../../components";
import { UserContext } from "../../userContext";
import { TicketStatus, TicketPriority, Ticket } from "../Board";
import { Icon } from "../../theme/daisyui";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTicket: (ticket: Omit<Ticket, "id">) => void;
}

const TicketModal: React.FC<TicketModalProps> = ({
  isOpen,
  onClose,
  onCreateTicket,
}) => {
  const userContext = useContext(UserContext);
  const { name, team } = userContext;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TicketStatus>(TicketStatus.TODO);
  const [priority, setPriority] = useState<TicketPriority>(
    TicketPriority.MEDIUM
  );

  const handleCreateTicket = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTicket: Omit<Ticket, "id"> = {
      title,
      description,
      requester: name,
      team: team,
      status,
      priority,
    };
    onCreateTicket(newTicket);
    setTitle("");
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex flex-row justify-between">
          <h3 className="text-lg font-bold mb-4">새로운 티켓</h3>
          <Icon
            name="remove"
            className="btn-error btn-xs"
            onClick={onClose}
          ></Icon>
        </div>
        <form onSubmit={handleCreateTicket}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="ticketTitle"
            >
              티켓 제목
            </label>
            <input
              type="text"
              id="ticketTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mb-4 border"
              placeholder="티켓 제목"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="ticketDescription"
            >
              티켓 설명
            </label>
            <textarea
              id="ticketDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mb-4 border"
              placeholder="티켓 설명"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="ticketPriority"
            >
              우선 순위
            </label>
            <select
              id="ticketPriority"
              className="w-full p-2 mb-4 border"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TicketPriority)}
            >
              <option value={TicketPriority.LOW}>Low</option>
              <option value={TicketPriority.MEDIUM}>Medium</option>
              <option value={TicketPriority.HIGH}>High</option>
            </select>
          </div>
          <div className="flex justify-end">
            <Button type="submit" optionalStyle="w-30">
              생성
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketModal;
