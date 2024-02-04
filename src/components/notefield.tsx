

import React, { useState } from 'react';

const Notefield: React.FC = () => {
  const [note, setNote] = useState<string>('');

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Note Taking Field</h2>
      <textarea
        className="border border-gray-300 rounded-md p-2 w-full"
        rows={5}
        placeholder="Take a note..."
        value={note}
        onChange={handleNoteChange}
      ></textarea>
    </div>
  );
};

export default Notefield;

