import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ELEMENT_TYPES = {
  TEXT: "TEXT",
  INPUT: "INPUT",
  DROPDOWN: "DROPDOWN",
  DATE: "DATE",
};

// Sidebar Component to Drag Items
const SidebarItem = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: "8px",
        margin: "4px",
        backgroundColor: isDragging ? "#ddd" : "#f0f0f0",
        cursor: "grab",
        border: "1px solid #ccc",
      }}
    >
      {label}
    </div>
  );
};

// Drop Area Component
const DropArea = ({ onDrop, components }) => {
  const [, drop] = useDrop(() => ({
    accept: Object.values(ELEMENT_TYPES),
    drop: (item: any) => {
      onDrop(item.type);
    },
  }));

  return (
    <div
      ref={drop}
      style={{
        width: "100%",
        minHeight: "400px",
        border: "2px dashed #ccc",
        padding: "16px",
        backgroundColor: "#fafafa",
      }}
    >
      <h3>Drop your elements here:</h3>
      {components.map((component: any, index: any) => {
        switch (component.type) {
          case ELEMENT_TYPES.TEXT:
            return <p key={index}>Text Box</p>;
          case ELEMENT_TYPES.INPUT:
            return <input key={index} type="text" placeholder="Input Field" />;
          case ELEMENT_TYPES.DROPDOWN:
            return (
              <select key={index}>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            );
          case ELEMENT_TYPES.DATE:
            return <input key={index} type="date" />;
          default:
            return null;
        }
      })}
    </div>
  );
};

// Main App Component
const Dashboard = () => {
  const [components, setComponents] = useState([]);

  const handleDrop = (type: any) => {
    setComponents((prev: any) => [...prev, { type }]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", gap: "16px", padding: "16px" }}>
        {/* Sidebar */}
        <div
          style={{
            width: "200px",
            border: "1px solid #ccc",
            padding: "8px",
            borderRadius: "4px",
            backgroundColor: "#fff",
          }}
        >
          <h3>Drag Elements</h3>
          <SidebarItem type={ELEMENT_TYPES.TEXT} label="Text Box" />
          <SidebarItem type={ELEMENT_TYPES.INPUT} label="Input Field" />
          <SidebarItem type={ELEMENT_TYPES.DROPDOWN} label="Dropdown" />
          <SidebarItem type={ELEMENT_TYPES.DATE} label="Date Picker" />
        </div>

        {/* Drop Area */}
        <DropArea onDrop={handleDrop} components={components} />
      </div>
    </DndProvider>
  );
};

export default Dashboard;
