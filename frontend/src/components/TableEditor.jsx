import React, { useState, useImperativeHandle, forwardRef } from "react";
import Modal from "react-modal";
import "../styles/TableEditor.css";

Modal.setAppElement("#root");

const TableEditor = forwardRef(({ editorRef }, ref) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rows, setRows] = useState(1);
  const [columns, setColumns] = useState(1);
  const [borderColor, setBorderColor] = useState("#ccc");
  const [hasHeader, setHasHeader] = useState(false);
  const [headerColor, setHeaderColor] = useState("#f1f1f1");

  useImperativeHandle(ref, () => ({
    insertTable: () => {
      setModalIsOpen(true);
    },
  }));

  const handleInsertTable = () => {
    if (editorRef.current) {
      const tableHtml = generateTableHtml(
        rows,
        columns,
        borderColor,
        hasHeader,
        headerColor
      );
      editorRef.current.innerHTML += tableHtml;
      setModalIsOpen(false);
    }
  };

  const handleCloseModal = () => {
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
        tableHtml += `<td contenteditable='true' style="border: 1px solid ${borderColor};"></td>`;
      }
      tableHtml += "</tr>";
    }
    tableHtml += "</tbody></table>";
    return tableHtml;
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      closeTimeoutMS={200} // Optional: Smooth close animation
    >
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
      <button onClick={handleCloseModal}>Cancel</button>
    </Modal>
  );
});

export default TableEditor;
