import React, { useState, useEffect } from 'react';

const RoomVisualization = ({ 
  roomDimensions, 
  doors = [], 
  windows = [], 
  fixedElements = [], 
  furniture = [],
  selectedFurniture = []
}) => {
  // Default dimensions if not provided
  const { width = 4, length = 5 } = roomDimensions || {};
  
  // Scale factor (pixels per meter)
  const scale = 100;
  
  // SVG dimensions with padding
  const padding = 50;
  const svgWidth = width * scale + (padding * 2);
  const svgHeight = length * scale + (padding * 2);
  
  // Grid settings
  const gridSize = 20; // Size of grid squares in pixels
  
  // State for draggable furniture
  const [draggableFurniture, setDraggableFurniture] = useState([]);
  const [activeDragItem, setActiveDragItem] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  // Initialize draggable furniture when props change
  useEffect(() => {
    const initialFurniture = [...furniture];
    if (selectedFurniture && selectedFurniture.length > 0) {
      // Add selected furniture with default positions
      selectedFurniture.forEach((item, index) => {
        initialFurniture.push({
          ...item,
          id: `selected-${index}`,
          x: padding + (index * 50) % (width * scale),
          y: padding + Math.floor((index * 50) / (width * scale)) * 50
        });
      });
    }
    setDraggableFurniture(initialFurniture);
  }, [furniture, selectedFurniture, width, scale, padding]);
  
  // Handle drag start
  const handleDragStart = (e, item) => {
    const svgElement = e.target.closest('svg');
    const svgRect = svgElement.getBoundingClientRect();
    const offsetX = e.clientX - svgRect.left - item.x;
    const offsetY = e.clientY - svgRect.top - item.y;
    
    setActiveDragItem(item);
    setDragOffset({ x: offsetX, y: offsetY });
  };
  
  // Handle drag move
  const handleDragMove = (e) => {
    if (!activeDragItem) return;
    
    const svgElement = e.target.closest('svg');
    const svgRect = svgElement.getBoundingClientRect();
    const newX = e.clientX - svgRect.left - dragOffset.x;
    const newY = e.clientY - svgRect.top - dragOffset.y;
    
    // Ensure furniture stays within room boundaries
    const boundedX = Math.max(padding, Math.min(newX, padding + width * scale - activeDragItem.width));
    const boundedY = Math.max(padding, Math.min(newY, padding + length * scale - activeDragItem.depth));
    
    // Update furniture position
    setDraggableFurniture(prev => 
      prev.map(item => 
        item.id === activeDragItem.id 
          ? { ...item, x: boundedX, y: boundedY } 
          : item
      )
    );
  };
  
  // Handle drag end
  const handleDragEnd = () => {
    setActiveDragItem(null);
  };
  
  // Render grid lines
  const renderGrid = () => {
    const gridLines = [];
    
    // Vertical grid lines
    for (let x = 0; x <= width * scale; x += gridSize) {
      gridLines.push(
        <line 
          key={`v-${x}`} 
          x1={padding + x} 
          y1={padding} 
          x2={padding + x} 
          y2={padding + length * scale} 
          stroke="#e5e5e5" 
          strokeWidth="1" 
        />
      );
    }
    
    // Horizontal grid lines
    for (let y = 0; y <= length * scale; y += gridSize) {
      gridLines.push(
        <line 
          key={`h-${y}`} 
          x1={padding} 
          y1={padding + y} 
          x2={padding + width * scale} 
          y2={padding + y} 
          stroke="#e5e5e5" 
          strokeWidth="1" 
        />
      );
    }
    
    return gridLines;
  };
  
  // Render doors
  const renderDoors = () => {
    return doors.map((door, index) => {
      const { x, y, width: doorWidth, isOpen } = door;
      
      return (
        <g key={`door-${index}`}>
          <line 
            x1={padding + x * scale} 
            y1={padding + y * scale} 
            x2={padding + (x + doorWidth) * scale} 
            y2={padding + y * scale} 
            stroke="#333" 
            strokeWidth="3" 
          />
          {isOpen && (
            <path 
              d={`M ${padding + x * scale} ${padding + y * scale} A ${doorWidth * scale} ${doorWidth * scale} 0 0 1 ${padding + x * scale} ${padding + (y - doorWidth) * scale}`} 
              fill="none" 
              stroke="#333" 
              strokeWidth="1" 
              strokeDasharray="5,5" 
            />
          )}
        </g>
      );
    });
  };
  
  // Render windows
  const renderWindows = () => {
    return windows.map((window, index) => {
      const { x, y, width: windowWidth, wall } = window;
      
      // Determine window position based on wall
      let x1, y1, x2, y2;
      
      switch (wall) {
        case 'top':
          x1 = padding + x * scale;
          y1 = padding;
          x2 = padding + (x + windowWidth) * scale;
          y2 = padding;
          break;
        case 'right':
          x1 = padding + width * scale;
          y1 = padding + y * scale;
          x2 = padding + width * scale;
          y2 = padding + (y + windowWidth) * scale;
          break;
        case 'bottom':
          x1 = padding + x * scale;
          y1 = padding + length * scale;
          x2 = padding + (x + windowWidth) * scale;
          y2 = padding + length * scale;
          break;
        case 'left':
        default:
          x1 = padding;
          y1 = padding + y * scale;
          x2 = padding;
          y2 = padding + (y + windowWidth) * scale;
          break;
      }
      
      return (
        <g key={`window-${index}`}>
          <line 
            x1={x1} 
            y1={y1} 
            x2={x2} 
            y2={y2} 
            stroke="#6b9ac4" 
            strokeWidth="6" 
          />
          <line 
            x1={x1} 
            y1={y1} 
            x2={x2} 
            y2={y2} 
            stroke="#d1e5f9" 
            strokeWidth="4" 
          />
        </g>
      );
    });
  };
  
  // Render fixed elements
  const renderFixedElements = () => {
    return fixedElements.map((element, index) => {
      const { x, y, width: elementWidth, depth: elementDepth, type } = element;
      
      // Different styles based on element type
      let fill = "#ccc";
      let stroke = "#999";
      
      switch (type) {
        case 'column':
          fill = "#aaa";
          break;
        case 'fireplace':
          fill = "#d9a282";
          break;
        case 'stairs':
          fill = "#b0b0b0";
          break;
        default:
          break;
      }
      
      return (
        <rect 
          key={`fixed-${index}`}
          x={padding + x * scale} 
          y={padding + y * scale} 
          width={elementWidth * scale} 
          height={elementDepth * scale} 
          fill={fill} 
          stroke={stroke} 
          strokeWidth="1" 
        />
      );
    });
  };
  
  // Render furniture
  const renderFurniture = () => {
    return draggableFurniture.map((item) => {
      const { id, x, y, width: itemWidth, depth: itemDepth, type, color = "#e4d4a7" } = item;
      
      // Different styles based on furniture type
      let fill = color;
      let stroke = "#666";
      let icon = null;
      
      switch (type) {
        case 'bed':
          icon = (
            <g>
              <rect 
                x={x + itemWidth * scale * 0.1} 
                y={y + itemDepth * scale * 0.2} 
                width={itemWidth * scale * 0.8} 
                height={itemDepth * scale * 0.6} 
                fill="#fff" 
                stroke="#ddd" 
              />
              <rect 
                x={x + itemWidth * scale * 0.1} 
                y={y + itemDepth * scale * 0.1} 
                width={itemWidth * scale * 0.8} 
                height={itemDepth * scale * 0.1} 
                fill="#ddd" 
                stroke="#ccc" 
              />
            </g>
          );
          break;
        case 'desk':
          icon = (
            <line 
              x1={x + itemWidth * scale * 0.2} 
              y1={y + itemDepth * scale * 0.5} 
              x2={x + itemWidth * scale * 0.8} 
              y2={y + itemDepth * scale * 0.5} 
              stroke="#333" 
              strokeWidth="2" 
            />
          );
          break;
        case 'sofa':
          icon = (
            <g>
              <rect 
                x={x + itemWidth * scale * 0.1} 
                y={y + itemDepth * scale * 0.6} 
                width={itemWidth * scale * 0.8} 
                height={itemDepth * scale * 0.3} 
                fill="#ddd" 
                stroke="#ccc" 
              />
              <rect 
                x={x + itemWidth * scale * 0.1} 
                y={y + itemDepth * scale * 0.3} 
                width={itemWidth * scale * 0.8} 
                height={itemDepth * scale * 0.3} 
                fill="#eee" 
                stroke="#ddd" 
              />
            </g>
          );
          break;
        default:
          break;
      }
      
      return (
        <g 
          key={id}
          onMouseDown={(e) => handleDragStart(e, item)}
          style={{ cursor: 'move' }}
        >
          <rect 
            x={x} 
            y={y} 
            width={itemWidth * scale} 
            height={itemDepth * scale} 
            fill={fill} 
            stroke={stroke} 
            strokeWidth="2" 
            rx="2" 
            ry="2" 
          />
          {icon}
          <text 
            x={x + itemWidth * scale / 2} 
            y={y + itemDepth * scale / 2} 
            textAnchor="middle" 
            dominantBaseline="middle" 
            fontSize="12" 
            fill="#333"
          >
            {type}
          </text>
        </g>
      );
    });
  };
  
  // Render measurements
  const renderMeasurements = () => {
    return (
      <g>
        {/* Width measurement */}
        <line 
          x1={padding} 
          y1={padding + length * scale + 20} 
          x2={padding + width * scale} 
          y2={padding + length * scale + 20} 
          stroke="#333" 
          strokeWidth="1" 
        />
        <line 
          x1={padding} 
          y1={padding + length * scale + 15} 
          x2={padding} 
          y2={padding + length * scale + 25} 
          stroke="#333" 
          strokeWidth="1" 
        />
        <line 
          x1={padding + width * scale} 
          y1={padding + length * scale + 15} 
          x2={padding + width * scale} 
          y2={padding + length * scale + 25} 
          stroke="#333" 
          strokeWidth="1" 
        />
        <text 
          x={padding + width * scale / 2} 
          y={padding + length * scale + 35} 
          textAnchor="middle" 
          fontSize="12" 
          fill="#333"
        >
          {width} m
        </text>
        
        {/* Length measurement */}
        <line 
          x1={padding - 20} 
          y1={padding} 
          x2={padding - 20} 
          y2={padding + length * scale} 
          stroke="#333" 
          strokeWidth="1" 
        />
        <line 
          x1={padding - 25} 
          y1={padding} 
          x2={padding - 15} 
          y2={padding} 
          stroke="#333" 
          strokeWidth="1" 
        />
        <line 
          x1={padding - 25} 
          y1={padding + length * scale} 
          x2={padding - 15} 
          y2={padding + length * scale} 
          stroke="#333" 
          strokeWidth="1" 
        />
        <text 
          x={padding - 35} 
          y={padding + length * scale / 2} 
          textAnchor="middle" 
          fontSize="12" 
          fill="#333"
          transform={`rotate(-90 ${padding - 35} ${padding + length * scale / 2})`}
        >
          {length} m
        </text>
      </g>
    );
  };
  
  return (
    <div className="room-visualization">
      <svg 
        width={svgWidth} 
        height={svgHeight} 
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        className="bg-white border border-gray-300 rounded-lg"
      >
        {/* Room outline */}
        <rect 
          x={padding} 
          y={padding} 
          width={width * scale} 
          height={length * scale} 
          fill="#f9f9f9" 
          stroke="#333" 
          strokeWidth="2" 
        />
        
        {/* Grid */}
        {renderGrid()}
        
        {/* Windows */}
        {renderWindows()}
        
        {/* Doors */}
        {renderDoors()}
        
        {/* Fixed elements */}
        {renderFixedElements()}
        
        {/* Furniture */}
        {renderFurniture()}
        
        {/* Measurements */}
        {renderMeasurements()}
      </svg>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Click and drag furniture items to reposition them. The grid represents 20cm squares.</p>
      </div>
    </div>
  );
};

export default RoomVisualization;
