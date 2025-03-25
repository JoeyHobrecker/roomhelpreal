import React from 'react';

const WallSnapping = {
  // Constants for snapping thresholds
  SNAP_THRESHOLD: 0.3, // 30cm threshold for snapping
  WALL_PADDING: 0.05, // 5cm padding from wall
  
  // Check if furniture should snap to a wall
  shouldSnapToWall: (furniture, room) => {
    // Check distance to left wall
    if (furniture.x < WallSnapping.SNAP_THRESHOLD) {
      return {
        shouldSnap: true,
        wall: 'left',
        distance: furniture.x
      };
    }
    
    // Check distance to right wall
    const distanceToRight = room.width - (furniture.x + furniture.width);
    if (distanceToRight < WallSnapping.SNAP_THRESHOLD) {
      return {
        shouldSnap: true,
        wall: 'right',
        distance: distanceToRight
      };
    }
    
    // Check distance to top wall
    if (furniture.y < WallSnapping.SNAP_THRESHOLD) {
      return {
        shouldSnap: true,
        wall: 'top',
        distance: furniture.y
      };
    }
    
    // Check distance to bottom wall
    const distanceToBottom = room.length - (furniture.y + furniture.depth);
    if (distanceToBottom < WallSnapping.SNAP_THRESHOLD) {
      return {
        shouldSnap: true,
        wall: 'bottom',
        distance: distanceToBottom
      };
    }
    
    return { shouldSnap: false };
  },
  
  // Snap furniture to the nearest wall
  snapToWall: (furniture, room) => {
    const snapResult = WallSnapping.shouldSnapToWall(furniture, room);
    
    if (!snapResult.shouldSnap) {
      return furniture;
    }
    
    const snappedFurniture = { ...furniture };
    
    switch (snapResult.wall) {
      case 'left':
        snappedFurniture.x = WallSnapping.WALL_PADDING;
        break;
      case 'right':
        snappedFurniture.x = room.width - furniture.width - WallSnapping.WALL_PADDING;
        break;
      case 'top':
        snappedFurniture.y = WallSnapping.WALL_PADDING;
        break;
      case 'bottom':
        snappedFurniture.y = room.length - furniture.depth - WallSnapping.WALL_PADDING;
        break;
    }
    
    return snappedFurniture;
  },
  
  // Check if furniture should snap to align with another furniture item
  shouldSnapToFurniture: (furniture, otherFurniture) => {
    // Skip checking against itself
    if (furniture.id === otherFurniture.id) {
      return { shouldSnap: false };
    }
    
    // Check horizontal alignment (top edges)
    if (Math.abs(furniture.y - otherFurniture.y) < WallSnapping.SNAP_THRESHOLD) {
      return {
        shouldSnap: true,
        direction: 'horizontal',
        edge: 'top',
        target: otherFurniture.y
      };
    }
    
    // Check horizontal alignment (bottom edges)
    if (Math.abs((furniture.y + furniture.depth) - (otherFurniture.y + otherFurniture.depth)) < WallSnapping.SNAP_THRESHOLD) {
      return {
        shouldSnap: true,
        direction: 'horizontal',
        edge: 'bottom',
        target: otherFurniture.y + otherFurniture.depth - furniture.depth
      };
    }
    
    // Check vertical alignment (left edges)
    if (Math.abs(furniture.x - otherFurniture.x) < WallSnapping.SNAP_THRESHOLD) {
      return {
        shouldSnap: true,
        direction: 'vertical',
        edge: 'left',
        target: otherFurniture.x
      };
    }
    
    // Check vertical alignment (right edges)
    if (Math.abs((furniture.x + furniture.width) - (otherFurniture.x + otherFurniture.width)) < WallSnapping.SNAP_THRESHOLD) {
      return {
        shouldSnap: true,
        direction: 'vertical',
        edge: 'right',
        target: otherFurniture.x + otherFurniture.width - furniture.width
      };
    }
    
    return { shouldSnap: false };
  },
  
  // Snap furniture to align with another furniture item
  snapToFurniture: (furniture, allFurniture) => {
    let snappedFurniture = { ...furniture };
    let closestSnap = null;
    let minDistance = WallSnapping.SNAP_THRESHOLD;
    
    for (const otherFurniture of allFurniture) {
      const snapResult = WallSnapping.shouldSnapToFurniture(furniture, otherFurniture);
      
      if (snapResult.shouldSnap) {
        let distance;
        
        if (snapResult.direction === 'horizontal') {
          if (snapResult.edge === 'top') {
            distance = Math.abs(furniture.y - snapResult.target);
          } else { // bottom
            distance = Math.abs((furniture.y + furniture.depth) - (snapResult.target + furniture.depth));
          }
        } else { // vertical
          if (snapResult.edge === 'left') {
            distance = Math.abs(furniture.x - snapResult.target);
          } else { // right
            distance = Math.abs((furniture.x + furniture.width) - (snapResult.target + furniture.width));
          }
        }
        
        if (distance < minDistance) {
          minDistance = distance;
          closestSnap = snapResult;
        }
      }
    }
    
    if (closestSnap) {
      if (closestSnap.direction === 'horizontal') {
        snappedFurniture.y = closestSnap.target;
      } else { // vertical
        snappedFurniture.x = closestSnap.target;
      }
    }
    
    return snappedFurniture;
  },
  
  // Check if furniture should snap to a grid
  shouldSnapToGrid: (furniture, gridSize) => {
    const xRemainder = furniture.x % gridSize;
    const yRemainder = furniture.y % gridSize;
    
    if (xRemainder < WallSnapping.SNAP_THRESHOLD || xRemainder > gridSize - WallSnapping.SNAP_THRESHOLD ||
        yRemainder < WallSnapping.SNAP_THRESHOLD || yRemainder > gridSize - WallSnapping.SNAP_THRESHOLD) {
      return {
        shouldSnap: true,
        xRemainder,
        yRemainder
      };
    }
    
    return { shouldSnap: false };
  },
  
  // Snap furniture to the nearest grid point
  snapToGrid: (furniture, gridSize) => {
    const snapResult = WallSnapping.shouldSnapToGrid(furniture, gridSize);
    
    if (!snapResult.shouldSnap) {
      return furniture;
    }
    
    const snappedFurniture = { ...furniture };
    
    // Snap X coordinate
    if (snapResult.xRemainder < WallSnapping.SNAP_THRESHOLD) {
      snappedFurniture.x = Math.floor(furniture.x / gridSize) * gridSize;
    } else if (snapResult.xRemainder > gridSize - WallSnapping.SNAP_THRESHOLD) {
      snappedFurniture.x = Math.ceil(furniture.x / gridSize) * gridSize;
    }
    
    // Snap Y coordinate
    if (snapResult.yRemainder < WallSnapping.SNAP_THRESHOLD) {
      snappedFurniture.y = Math.floor(furniture.y / gridSize) * gridSize;
    } else if (snapResult.yRemainder > gridSize - WallSnapping.SNAP_THRESHOLD) {
      snappedFurniture.y = Math.ceil(furniture.y / gridSize) * gridSize;
    }
    
    return snappedFurniture;
  },
  
  // Apply all snapping rules to furniture
  applyAllSnapping: (furniture, room, allFurniture, gridSize = 0.2) => {
    // First try to snap to walls (highest priority)
    let snappedFurniture = WallSnapping.snapToWall(furniture, room);
    
    // Then try to snap to other furniture
    snappedFurniture = WallSnapping.snapToFurniture(snappedFurniture, allFurniture);
    
    // Finally, snap to grid
    snappedFurniture = WallSnapping.snapToGrid(snappedFurniture, gridSize);
    
    return snappedFurniture;
  }
};

export default WallSnapping;
