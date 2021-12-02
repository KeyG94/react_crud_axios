import { useState } from "react";

export default function StatusDropdown({ register, status }) {
  const [currentStatus] = useState([status]);

  return (
    <select name="status" {...register("status")}>
      <option value={currentStatus}>{currentStatus}</option>
      <option value="future">future</option>
      <option value="draft">draft</option>
      <option value="pending">pending</option>
      <option value="private">private</option>
    </select>
  );
}
