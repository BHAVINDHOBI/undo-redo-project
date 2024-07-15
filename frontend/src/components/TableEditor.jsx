import React, { useState, useRef } from "react";
import Modal from "react-modal";
import "../styles/TableEditor.css";
import ToolBarImage from "../assets/Utility";

Modal.setAppElement("#root");

const TableEditor = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rows, setRows] = useState(1);
  const [columns, setColumns] = useState(1);
  const [borderColor, setBorderColor] = useState("#ccc");
  const [hasHeader, setHasHeader] = useState(false);
  const [headerColor, setHeaderColor] = useState("#f1f1f1");
  const contentEditableRef = useRef(null);

  const insertTable = () => {
    setModalIsOpen(true);
  };

  const handleInsertTable = () => {
    const tableHtml = generateTableHtml(
      rows,
      columns,
      borderColor,
      hasHeader,
      headerColor
    );
    contentEditableRef.current.innerHTML += tableHtml;
    setModalIsOpen(false);
  };

  const generateTableHtml = (
    rows,
    columns,
    borderColor,
    hasHeader,
    headerColor
  ) => {
    let tableHtml = `<table style="border-collapse: collapse; border-color: ${borderColor};"><tbody>`;
    if (hasHeader) {
      tableHtml += `<tr style="background-color: ${headerColor}; border-color: ${borderColor};">`;
      for (let j = 0; j < columns; j++) {
        tableHtml += `<th contenteditable='true' style="border: 1px solid ${borderColor};">Header</th>`;
      }
      tableHtml += "</tr>";
    }
    for (let i = 0; i < rows; i++) {
      tableHtml += "<tr>";
      for (let j = 0; j < columns; j++) {
        tableHtml += `<td contenteditable='true' oninput='resizeColumn(this)' style="border: 1px solid ${borderColor};"></td>`;
      }
      tableHtml += "</tr>";
    }
    tableHtml += "</tbody></table>";
    return tableHtml;
  };

  return (
    <div>
      <div
        contentEditable
        ref={contentEditableRef}
        className="content-editable"
        dangerouslySetInnerHTML={{ __html: "" }}
      />
      <button onClick={insertTable} className="insert-table-button">
        <img src={ToolBarImage.Table} alt="Table" className="table-icon" />
        Insert Table
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Insert Table</h2>
        <label>
          Rows:
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value))}
            min="1"
          />
        </label>
        <br />
        <label>
          Columns:
          <input
            type="number"
            value={columns}
            onChange={(e) => setColumns(parseInt(e.target.value))}
            min="1"
          />
        </label>
        <br />
        <label>
          Border Color:
          <input
            type="color"
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
          />
        </label>
        <br />
        <label className="Header">
          <input
            type="checkbox"
            checked={hasHeader}
            onChange={(e) => setHasHeader(e.target.checked)}
          />
          Include Header
        </label>
        {hasHeader && (
          <>
            <br />
            <label>
              Header Color:
              <input
                type="color"
                value={headerColor}
                onChange={(e) => setHeaderColor(e.target.value)}
              />
            </label>
          </>
        )}
        <br />
        <button onClick={handleInsertTable}>Insert</button>
        <button onClick={() => setModalIsOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
};

export default TableEditor;

// Helper function to resize columns dynamically
window.resizeColumn = function (cell) {
  const colIndex = cell.cellIndex;
  const table = cell.closest("table");
  const cells = table.querySelectorAll(
    `td:nth-child(${colIndex + 1}), th:nth-child(${colIndex + 1})`
  );
  let maxWidth = 0;

  cells.forEach((cell) => {
    const cellWidth = cell.scrollWidth;
    if (cellWidth > maxWidth) {
      maxWidth = cellWidth;
    }
  });

  cells.forEach((cell) => {
    cell.style.width = maxWidth + "px";
  });
};
