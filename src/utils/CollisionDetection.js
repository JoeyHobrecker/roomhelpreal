import React from 'react';

const CollisionDetection = {
  // Check if two furniture items are colliding
  checkCollision: (item1, item2) => {
    return (
      item1.x < item2.x + item2.width &&
      item1.x + item1.width > item2.x &&
      item1.y < item2.y + item2.depth &&
      item1.y + item1.depth > item2.y
    );
  },
  
  // Check if furniture is colliding with any fixed elements
  checkFixedElementCollisions: (furniture, fixedElements) => {
    for (const element of fixedElements) {
      if (CollisionDetection.checkCollision(furniture, element)) {
        return {
          colliding: true,
          with: `fixed element (${element.type})`
        };
      }
    }
    return { colliding: false };
  },
  
  // Check if furniture is colliding with any doors
  checkDoorCollisions: (furniture, doors, room) => {
    for (const door of doors) {
      // Create a rectangle representing the door area
      let doorRect = { x: 0, y: 0, width: 0, depth: 0 };
      
      switch (door.wall) {
        case 'top':
          doorRect = {
            x: door.x,
            y: 0,
            width: door.width,
            depth: 0.3 // Door depth approximation
          };
          break;
        case 'right':
          doorRect = {
            x: room.width - 0.3,
            y: door.y,
            width: 0.3,
            depth: door.width
          };
          break;
        case 'bottom':
          doorRect = {
            x: door.x,
            y: room.length - 0.3,
            width: door.width,
            depth: 0.3
          };
          break;
        case 'left':
          doorRect = {
            x: 0,
            y: door.y,
            width: 0.3,
            depth: door.width
          };
          break;
      }
      
      if (CollisionDetection.checkCollision(furniture, doorRect)) {
        return {
          colliding: true,
          with: 'door'
        };
      }
      
      // Check door swing area if door is open
      if (door.isOpen) {
        let swingRect = { x: 0, y: 0, width: 0, depth: 0 };
        
        switch (door.wall) {
          case 'top':
            swingRect = {
              x: door.x,
              y: 0,
              width: door.width,
              depth: door.width
            };
            break;
          case 'right':
            swingRect = {
              x: room.width - door.width,
              y: door.y,
              width: door.width,
              depth: door.width
            };
            break;
          case 'bottom':
            swingRect = {
              x: door.x,
              y: room.length - door.width,
              width: door.width,
              depth: door.width
            };
            break;
          case 'left':
            swingRect = {
              x: 0,
              y: door.y,
              width: door.width,
              depth: door.width
            };
            break;
        }
        
        if (CollisionDetection.checkCollision(furniture, swingRect)) {
          return {
            colliding: true,
            with: 'door swing area'
          };
        }
      }
    }
    
    return { colliding: false };
  },
  
  // Check if furniture is colliding with any windows
  checkWindowCollisions: (furniture, windows, room) => {
    for (const window of windows) {
      // Create a rectangle representing the window area
      let windowRect = { x: 0, y: 0, width: 0, depth: 0 };
      
      switch (window.wall) {
        case 'top':
          windowRect = {
            x: window.x,
            y: 0,
            width: window.width,
            depth: 0.2 // Window depth approximation
          };
          break;
        case 'right':
          windowRect = {
            x: room.width - 0.2,
            y: window.y,
            width: 0.2,
            depth: window.width
          };
          break;
        case 'bottom':
          windowRect = {
            x: window.x,
            y: room.length - 0.2,
            width: window.width,
            depth: 0.2
          };
          break;
        case 'left':
          windowRect = {
            x: 0,
            y: window.y,
            width: 0.2,
            depth: window.width
          };
          break;
      }
      
      if (CollisionDetection.checkCollision(furniture, windowRect)) {
        return {
          colliding: true,
          with: 'window'
        };
      }
    }
    
    return { colliding: false };
  },
  
  // Check if furniture is colliding with any other furniture
  checkFurnitureCollisions: (furniture, allFurniture) => {
    for (const otherFurniture of allFurniture) {
      // Skip checking against itself
      if (furniture.id === otherFurniture.id) continue;
      
      if (CollisionDetection.checkCollision(furniture, otherFurniture)) {
        return {
          colliding: true,
          with: otherFurniture.type
        };
      }
    }
    
    return { colliding: false };
  },
  
  // Check if furniture is outside room boundaries
  checkRoomBoundaries: (furniture, room) => {
    if (
      furniture.x < 0 ||
      furniture.y < 0 ||
      furniture.x + furniture.width > room.width ||
      furniture.y + furniture.depth > room.length
    ) {
      return {
        colliding: true,
        with: 'room boundary'
      };
    }
    
    return { colliding: false };
  },
  
  // Check all collisions for a furniture item
  checkAllCollisions: (furniture, room, allFurniture, fixedElements, doors, windows) => {
    // Check room boundaries
    const boundaryCollision = CollisionDetection.checkRoomBoundaries(furniture, room);
    if (boundaryCollision.colliding) {
      return boundaryCollision;
    }
    
    // Check fixed element collisions
    const fixedElementCollision = CollisionDetection.checkFixedElementCollisions(furniture, fixedElements);
    if (fixedElementCollision.colliding) {
      return fixedElementCollision;
    }
    
    // Check door collisions
    const doorCollision = CollisionDetection.checkDoorCollisions(furniture, doors, room);
    if (doorCollision.colliding) {
      return doorCollision;
    }
    
    // Check window collisions
    const windowCollision = CollisionDetection.checkWindowCollisions(furniture, windows, room);
    if (windowCollision.colliding) {
      return windowCollision;
    }
    
    // Check furniture collisions
    const furnitureCollision = CollisionDetection.checkFurnitureCollisions(furniture, allFurniture);
    if (furnitureCollision.colliding) {
      return furnitureCollision;
    }
    
    return { colliding: false };
  },
  
  // Find a valid position for furniture
  findValidPosition: (furniture, room, allFurniture, fixedElements, doors, windows) => {
    const originalPosition = { x: furniture.x, y: furniture.y };
    const gridSize = 0.2; // 20cm grid
    
    // Try the original position first
    const originalCollision = CollisionDetection.checkAllCollisions(
      furniture, room, allFurniture, fixedElements, doors, windows
    );
    
    if (!originalCollision.colliding) {
      return originalPosition;
    }
    
    // Try positions in a spiral pattern from the original position
    const maxIterations = 100; // Limit search to prevent infinite loops
    let iteration = 0;
    let layer = 1;
    
    while (iteration < maxIterations) {
      // Try positions in the current layer (spiral outward)
      for (let dx = -layer; dx <= layer; dx++) {
        for (let dy = -layer; dy <= layer; dy++) {
          // Skip positions not on the perimeter of the current layer
          if (Math.abs(dx) !== layer && Math.abs(dy) !== layer) continue;
          
          const testPosition = {
            x: originalPosition.x + dx * gridSize,
            y: originalPosition.y + dy * gridSize
          };
          
          const testFurniture = {
            ...furniture,
            x: testPosition.x,
            y: testPosition.y
          };
          
          const collision = CollisionDetection.checkAllCollisions(
            testFurniture, room, allFurniture, fixedElements, doors, windows
          );
          
          if (!collision.colliding) {
            return testPosition;
          }
          
          iteration++;
          if (iteration >= maxIterations) break;
        }
        
        if (iteration >= maxIterations) break;
      }
      
      layer++;
    }
    
    // If no valid position found, try to place against a wall
    const wallPositions = [
      { x: 0, y: originalPosition.y }, // Left wall
      { x: room.width - furniture.width, y: originalPosition.y }, // Right wall
      { x: originalPosition.x, y: 0 }, // Top wall
      { x: originalPosition.x, y: room.length - furniture.depth } // Bottom wall
    ];
    
    for (const position of wallPositions) {
      const testFurniture = {
        ...furniture,
        x: position.x,
        y: position.y
      };
      
      const collision = CollisionDetection.checkAllCollisions(
        testFurniture, room, allFurniture, fixedElements, doors, windows
      );
      
      if (!collision.colliding) {
        return position;
      }
    }
    
    // If still no valid position, return the original position and let the user handle it
    return originalPosition;
  }
};

export default CollisionDetection;
