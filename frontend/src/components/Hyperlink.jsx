import React, { useState, useRef } from 'react';

const Hyperlink = () => {
  const editorRef = useRef(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, url: '' });

  const handleAddHyperlink = () => {
    const selectedText = window.getSelection().toString();
    const userUrl = prompt('Enter the URL:');
    if (userUrl) {
      document.execCommand('createLink', false, userUrl);
    }
  };

  const handleMouseOver = (e) => {
    if (e.target.tagName === 'A') {
      const rect = e.target.getBoundingClientRect();
      setTooltip({
        visible: true,
        x: rect.left,
        y: rect.top + window.scrollY,
        url: e.target.href,
      });
    }
  };

  const handleMouseOut = () => {
    setTooltip({ visible: false, x: 0, y: 0, url: '' });
  };

  const handleLinkClick = (e) => {
    if (e.target.tagName === 'A' && e.ctrlKey) {
      window.open(e.target.href, '_blank');
    }
  };

  return (
    <div style={{backgroundColor: 'white'}}>
      <div
        contentEditable
        ref={editorRef}
        onClick={handleLinkClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className="editor"
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          minHeight: '200px',
          marginBottom: '10px'
        }}
      >
        add text and click button add  hyperlink.
      </div>
      {tooltip.visible && (
        <div
          style={{
            position: 'absolute',
            top: tooltip.y + 20,
            left: tooltip.x,
            backgroundColor: 'white',
            border: '1px solid black',
            padding: '5px',
            zIndex: 1000,
            whiteSpace: 'nowrap',
          }}
        >
          <a href={tooltip.url} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
            {tooltip.url}
          </a>
        </div>
      )}
      <button onClick={handleAddHyperlink}>Add Hyperlink</button>
    </div>
  );
};

export default Hyperlink;