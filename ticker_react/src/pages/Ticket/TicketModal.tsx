import React, { useContext, useState } from "react";
import { Button } from "../../components";
import { UserContext } from "../../userContext";
import { TicketStatus, TicketPriority, Ticket } from "../Board";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onCreateTicket: (
  //   title: string,
  //   description: string,
  //   status: TicketStatus,
  //   priority: TicketPriority
  // ) => void;
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

  const handleCreateTicket = () => {
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">새 티켓 생성</h2>
        <input
          type="text"
          className="w-full p-2 mb-4 border"
          placeholder="티켓 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 mb-4 border"
          placeholder="티켓 설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <select
          className="w-full p-2 mb-4 border"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TicketPriority)}
        >
          <option value={TicketPriority.LOW}>Low</option>
          <option value={TicketPriority.MEDIUM}>Medium</option>
          <option value={TicketPriority.HIGH}>High</option>
        </select>
        <div className="flex justify-end">
          <Button onClick={handleCreateTicket} optionalStyle="py-2 px-4">
            생성하기
          </Button>
          <Button onClick={onClose} optionalStyle="py-2 px-4 ml-2">
            취소
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
