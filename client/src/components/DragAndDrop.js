import { useState, useRef } from 'react';

const DragAndDrop = ({ children, onDragEnd }) => {
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const handleDragStart = (e) => {
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    setDragging(true);
  };

  const handleDragMove = (e) => {
    if (!dragging) return;

    const deltaX = e.clientX - dragStartPos.current.x;
    const deltaY = e.clientY - dragStartPos.current.y;

    if (dragRef.current) {
      dragRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
  };

  const handleDragEnd = (e) => {
    setDragging(false);

    if (dragRef.current) {
      dragRef.current.style.transform = 'none';
    }

    if (onDragEnd) {
      onDragEnd(e);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      ref={dragRef}
      className="drag-container"
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onDragOver={handleDragOver}
    >
      {children}
    </div>
  );
};

export default DragAndDrop;
