import React from 'react';

const DesignRuleEngine = {
  // Feng Shui design rules
  fengShui: {
    bedPlacement: (room, furniture) => {
      const { doors, windows } = room;
      const bed = furniture.find(item => item.type === 'bed');
      
      if (!bed) return null;
      
      // Rule: Don't position bed facing the window
      const facingWindow = windows.some(window => {
        // Check if bed is positioned against a wall with a window
        if (window.wall === 'top' && bed.y < 1) return true;
        if (window.wall === 'bottom' && bed.y + bed.depth > room.length - 1) return true;
        if (window.wall === 'left' && bed.x < 1) return true;
        if (window.wall === 'right' && bed.x + bed.width > room.width - 1) return true;
        return false;
      });
      
      if (facingWindow) {
        return {
          furniture: 'Bed',
          rule: 'Bed should not face a window',
          explanation: 'In Feng Shui, beds facing windows can disrupt sleep energy and reduce quality of rest.',
          current: 'feng-shui',
          severity: 'high'
        };
      }
      
      // Rule: Bed should not be in direct line with the door (death position)
      const inLineWithDoor = doors.some(door => {
        // Simplified check for demonstration
        if (door.wall === 'top' && bed.x < door.x + door.width && bed.x + bed.width > door.x) return true;
        if (door.wall === 'bottom' && bed.x < door.x + door.width && bed.x + bed.width > door.x) return true;
        if (door.wall === 'left' && bed.y < door.y + door.width && bed.y + bed.depth > door.y) return true;
        if (door.wall === 'right' && bed.y < door.y + door.width && bed.y + bed.depth > door.y) return true;
        return false;
      });
      
      if (inLineWithDoor) {
        return {
          furniture: 'Bed',
          rule: 'Bed should not be in direct line with the door',
          explanation: 'This position, known as the "death position" in Feng Shui, can create feelings of vulnerability and disrupt sleep.',
          current: 'feng-shui',
          severity: 'high'
        };
      }
      
      // Rule: Bed should be against a solid wall
      const againstWall = (
        bed.x < 0.5 || 
        bed.y < 0.5 || 
        bed.x + bed.width > room.width - 0.5 || 
        bed.y + bed.depth > room.length - 0.5
      );
      
      if (!againstWall) {
        return {
          furniture: 'Bed',
          rule: 'Bed should be placed against a solid wall',
          explanation: 'Placing your bed against a solid wall provides a sense of security and stability according to Feng Shui principles.',
          current: 'feng-shui',
          severity: 'medium'
        };
      }
      
      return {
        furniture: 'Bed',
        rule: 'Bed is properly placed according to Feng Shui',
        explanation: 'Your bed is positioned against a solid wall, not facing a window, and not in direct line with the door.',
        current: 'feng-shui',
        severity: 'positive'
      };
    },
    
    deskPlacement: (room, furniture) => {
      const desk = furniture.find(item => item.type === 'desk');
      
      if (!desk) return null;
      
      // Rule: Desk should not have your back to the door
      const { doors } = room;
      const backToDoor = doors.some(door => {
        // Simplified check for demonstration
        if (door.wall === 'top' && desk.y > door.y) return true;
        if (door.wall === 'bottom' && desk.y < door.y) return true;
        if (door.wall === 'left' && desk.x > door.x) return true;
        if (door.wall === 'right' && desk.x < door.x) return true;
        return false;
      });
      
      if (backToDoor) {
        return {
          furniture: 'Desk',
          rule: 'Desk should be positioned so you don\'t have your back to the door',
          explanation: 'In Feng Shui, having your back to the door while working creates vulnerability and reduces focus.',
          current: 'feng-shui',
          severity: 'medium'
        };
      }
      
      return {
        furniture: 'Desk',
        rule: 'Desk is properly placed according to Feng Shui',
        explanation: 'Your desk is positioned so you won\'t have your back to the door, creating a sense of security and control.',
        current: 'feng-shui',
        severity: 'positive'
      };
    }
  },
  
  // Modern design science rules
  modern: {
    deskPlacement: (room, furniture) => {
      const { windows } = room;
      const desk = furniture.find(item => item.type === 'desk');
      
      if (!desk) return null;
      
      // Rule: Desk should be perpendicular to windows to reduce eye strain
      const perpendicularToWindow = windows.some(window => {
        if ((window.wall === 'left' || window.wall === 'right') && 
            (desk.y < window.y + window.width && desk.y + desk.depth > window.y)) {
          return true;
        }
        if ((window.wall === 'top' || window.wall === 'bottom') && 
            (desk.x < window.x + window.width && desk.x + desk.width > window.x)) {
          return true;
        }
        return false;
      });
      
      if (!perpendicularToWindow && windows.length > 0) {
        return {
          furniture: 'Desk',
          rule: 'Position desk perpendicular to windows',
          explanation: 'This reduces eye strain by preventing glare while still maximizing natural light.',
          current: 'modern',
          severity: 'medium'
        };
      }
      
      return {
        furniture: 'Desk',
        rule: 'Desk is properly placed according to ergonomic principles',
        explanation: 'Your desk is positioned to reduce eye strain and maximize natural light.',
        current: 'modern',
        severity: 'positive'
      };
    },
    
    trafficFlow: (room, furniture) => {
      // Rule: Allow 30-36 inches for walkways between furniture
      const minDistance = 0.75; // 30 inches in meters
      
      // Check distances between furniture pieces
      const violations = [];
      
      for (let i = 0; i < furniture.length; i++) {
        for (let j = i + 1; j < furniture.length; j++) {
          const item1 = furniture[i];
          const item2 = furniture[j];
          
          // Calculate the closest distance between the two items
          const horizontalOverlap = (
            item1.x < item2.x + item2.width && 
            item1.x + item1.width > item2.x
          );
          
          const verticalOverlap = (
            item1.y < item2.y + item2.depth && 
            item1.y + item1.depth > item2.y
          );
          
          // If there's no overlap in either direction, calculate the minimum distance
          if (!horizontalOverlap || !verticalOverlap) {
            let distance;
            
            if (horizontalOverlap) {
              // Items are aligned horizontally, check vertical distance
              if (item1.y > item2.y) {
                distance = item1.y - (item2.y + item2.depth);
              } else {
                distance = item2.y - (item1.y + item1.depth);
              }
            } else if (verticalOverlap) {
              // Items are aligned vertically, check horizontal distance
              if (item1.x > item2.x) {
                distance = item1.x - (item2.x + item2.width);
              } else {
                distance = item2.x - (item1.x + item1.width);
              }
            } else {
              // No overlap in either direction, calculate diagonal distance (simplified)
              const dx = Math.min(
                Math.abs(item1.x - (item2.x + item2.width)),
                Math.abs(item2.x - (item1.x + item1.width))
              );
              const dy = Math.min(
                Math.abs(item1.y - (item2.y + item2.depth)),
                Math.abs(item2.y - (item1.y + item1.depth))
              );
              distance = Math.sqrt(dx * dx + dy * dy);
            }
            
            if (distance < minDistance && distance > 0) {
              violations.push({
                furniture: `${item1.type.charAt(0).toUpperCase() + item1.type.slice(1)} and ${item2.type.charAt(0).toUpperCase() + item2.type.slice(1)}`,
                rule: 'Allow at least 75cm (30 inches) for walkways',
                explanation: 'Proper spacing between furniture ensures comfortable movement throughout the space.',
                current: 'modern',
                severity: 'medium'
              });
            }
          }
        }
      }
      
      return violations.length > 0 ? violations[0] : {
        furniture: 'All Furniture',
        rule: 'Proper traffic flow maintained',
        explanation: 'Your furniture arrangement allows for comfortable movement throughout the space.',
        current: 'modern',
        severity: 'positive'
      };
    }
  },
  
  // Scandinavian design rules
  scandinavian: {
    minimalism: (room, furniture) => {
      // Rule: Keep only essential furniture pieces
      const roomArea = room.width * room.length;
      const furnitureArea = furniture.reduce((total, item) => {
        return total + (item.width * item.depth);
      }, 0);
      
      const occupancyRatio = furnitureArea / roomArea;
      
      if (occupancyRatio > 0.5) {
        return {
          furniture: 'All Furniture',
          rule: 'Maintain open, airy spaces',
          explanation: 'Scandinavian design emphasizes minimalism. Your room appears crowded with too many furniture pieces.',
          current: 'scandinavian',
          severity: 'medium'
        };
      }
      
      return {
        furniture: 'All Furniture',
        rule: 'Good balance of furniture and open space',
        explanation: 'Your room maintains the Scandinavian principle of open, airy spaces with just the essential furniture.',
        current: 'scandinavian',
        severity: 'positive'
      };
    },
    
    lightMaximization: (room, furniture) => {
      const { windows } = room;
      
      // Rule: Don't block natural light sources
      const blockingWindow = furniture.some(item => {
        return windows.some(window => {
          if (window.wall === 'top' && item.y < 1 && 
              item.x < window.x + window.width && item.x + item.width > window.x) {
            return true;
          }
          if (window.wall === 'bottom' && item.y + item.depth > room.length - 1 && 
              item.x < window.x + window.width && item.x + item.width > window.x) {
            return true;
          }
          if (window.wall === 'left' && item.x < 1 && 
              item.y < window.y + window.width && item.y + item.depth > window.y) {
            return true;
          }
          if (window.wall === 'right' && item.x + item.width > room.width - 1 && 
              item.y < window.y + window.width && item.y + item.depth > window.y) {
            return true;
          }
          return false;
        });
      });
      
      if (blockingWindow) {
        return {
          furniture: 'Window-adjacent Furniture',
          rule: 'Avoid blocking natural light sources',
          explanation: 'Scandinavian design prioritizes maximizing natural light. Avoid placing tall furniture in front of windows.',
          current: 'scandinavian',
          severity: 'medium'
        };
      }
      
      return {
        furniture: 'Window-adjacent Furniture',
        rule: 'Natural light is maximized',
        explanation: 'Your furniture arrangement allows natural light to flow freely into the space, a key principle of Scandinavian design.',
        current: 'scandinavian',
        severity: 'positive'
      };
    }
  },
  
  // Universal design rules
  universal: {
    proportions: (room, furniture) => {
      // Rule: Coffee tables should be approximately 2/3 the length of the sofa
      const sofa = furniture.find(item => item.type === 'sofa');
      const coffeeTable = furniture.find(item => item.type === 'coffee-table');
      
      if (sofa && coffeeTable) {
        const ratio = coffeeTable.width / sofa.width;
        
        if (ratio < 0.5 || ratio > 0.8) {
          return {
            furniture: 'Coffee Table',
            rule: 'Coffee table should be approximately 2/3 the length of the sofa',
            explanation: 'This proportion creates visual balance and ensures the table is functional for all seating positions.',
            current: 'universal',
            severity: 'low'
          };
        }
      }
      
      // Rule: Rugs should extend beyond furniture
      const rug = furniture.find(item => item.type === 'rug');
      
      if (rug) {
        const furnitureOnRug = furniture.filter(item => 
          item.type !== 'rug' && 
          item.x >= rug.x && 
          item.x + item.width <= rug.x + rug.width &&
          item.y >= rug.y && 
          item.y + item.depth <= rug.y + rug.depth
        );
        
        if (furnitureOnRug.length < furniture.length - 1) { // -1 to exclude the rug itself
          return {
            furniture: 'Rug',
            rule: 'Rug should be large enough to accommodate all furniture in the grouping',
            explanation: 'A properly sized rug unifies the space and creates a defined area for the furniture grouping.',
            current: 'universal',
            severity: 'low'
          };
        }
      }
      
      return {
        furniture: 'All Furniture',
        rule: 'Good proportions between furniture pieces',
        explanation: 'Your furniture sizes are well-proportioned relative to each other and the room size.',
        current: 'universal',
        severity: 'positive'
      };
    },
    
    balance: (room, furniture) => {
      // Rule: Distribute visual weight evenly
      
      // Calculate the center of the room
      const roomCenterX = room.width / 2;
      const roomCenterY = room.length / 2;
      
      // Calculate the "center of mass" of the furniture
      let totalWeight = 0;
      let weightedX = 0;
      let weightedY = 0;
      
      furniture.forEach(item => {
        const weight = item.width * item.depth; // Simple approximation of visual weight
        const centerX = item.x + (item.width / 2);
        const centerY = item.y + (item.depth / 2);
        
        totalWeight += weight;
        weightedX += centerX * weight;
        weightedY += centerY * weight;
      });
      
      const furnitureCenterX = weightedX / totalWeight;
      const furnitureCenterY = weightedY / totalWeight;
      
      // Calculate the distance between the room center and furniture center
      const distanceX = Math.abs(roomCenterX - furnitureCenterX);
      const distanceY = Math.abs(roomCenterY - furnitureCenterY);
      
      // Check if the furniture is significantly off-center
      if (distanceX > room.width * 0.2 || distanceY > room.length * 0.2) {
        return {
          furniture: 'All Furniture',
          rule: 'Distribute visual weight evenly throughout the space',
          explanation: 'Your furniture arrangement is visually unbalanced. Try to distribute larger pieces more evenly around the room.',
          current: 'universal',
          severity: 'low'
        };
      }
      
      return {
        furniture: 'All Furniture',
        rule: 'Good visual balance in the space',
        explanation: 'Your furniture is well-distributed, creating a sense of equilibrium in the room.',
        current: 'universal',
        severity: 'positive'
      };
    }
  },
  
  // Apply all relevant rules based on the selected goal
  applyRules: (room, furniture, goal) => {
    const decisions = [];
    
    // Apply universal rules for all goals
    decisions.push(DesignRuleEngine.universal.proportions(room, furniture));
    decisions.push(DesignRuleEngine.universal.balance(room, furniture));
    
    // Apply specific rules based on goal
    switch (goal) {
      case 'productivity':
        // Modern design principles for productivity
        decisions.push(DesignRuleEngine.modern.deskPlacement(room, furniture));
        decisions.push(DesignRuleEngine.modern.trafficFlow(room, furniture));
        break;
        
      case 'relaxation':
        // Feng Shui principles for relaxation
        decisions.push(DesignRuleEngine.fengShui.bedPlacement(room, furniture));
        decisions.push(DesignRuleEngine.fengShui.deskPlacement(room, furniture));
        break;
        
      case 'social':
        // Scandinavian design principles for social spaces
        decisions.push(DesignRuleEngine.scandinavian.minimalism(room, furniture));
        decisions.push(DesignRuleEngine.scandinavian.lightMaximization(room, furniture));
        break;
        
      default:
        // If no specific goal, apply a mix of principles
        decisions.push(DesignRuleEngine.fengShui.bedPlacement(room, furniture));
        decisions.push(DesignRuleEngine.modern.deskPlacement(room, furniture));
        decisions.push(DesignRuleEngine.scandinavian.lightMaximization(room, furniture));
        break;
    }
    
    // Filter out null decisions (rules that don't apply)
    return decisions.filter(decision => decision !== null);
  },
  
  // Get the primary design current based on the goal
  getDesignCurrent: (goal) => {
    switch (goal) {
      case 'productivity':
        return 'modern';
      case 'relaxation':
        return 'feng-shui';
      case 'social':
        return 'scandinavian';
      default:
        return null;
    }
  },
  
  // Generate an optimized layout based on room and goal
  generateOptimizedLayout: (room, selectedFurniture, goal) => {
    const layout = [];
    const designCurrent = DesignRuleEngine.getDesignCurrent(goal);
    
    // Place furniture based on the design current and room constraints
    selectedFurniture.forEach(item => {
      const placedItem = { ...item };
      
      switch (item.type) {
        case 'bed':
          if (designCurrent === 'feng-shui') {
            // Place bed against a wall, not facing window or door
            placedItem.x = 0.5;
            placedItem.y = 0.5;
          } else {
            // Default placement
            placedItem.x = room.width / 2 - item.width / 2;
            placedItem.y = room.length / 2 - item.depth / 2;
          }
          break;
          
        case 'desk':
          if (designCurrent === 'modern') {
            // Place desk perpendicular to window if possible
            const window = room.windows[0];
            if (window) {
              if (window.wall === 'top' || window.wall === 'bottom') {
                placedItem.x = window.x;
                placedItem.y = room.length / 2;
              } else {
                placedItem.x = room.width / 2;
                placedItem.y = window.y;
              }
            } else {
              // No window, place against wall
              placedItem.x = 0.5;
              placedItem.y = room.length / 2;
            }
          } else if (designCurrent === 'feng-shui') {
            // Place desk with view of the door
            const door = room.doors[0];
            if (door) {
              if (door.wall === 'top') {
                placedItem.x = room.width / 2;
                placedItem.y = room.length - item.depth - 0.5;
              } else {
                placedItem.x = room.width / 2;
                placedItem.y = 0.5;
              }
            } else {
              // No door, default placement
              placedItem.x = room.width / 2;
              placedItem.y = 0.5;
            }
          } else {
            // Default placement
            placedItem.x = room.width / 2;
            placedItem.y = room.length / 2;
          }
          break;
          
        case 'sofa':
          if (designCurrent === 'scandinavian') {
            // Place sofa to maximize open space
            placedItem.x = 0.5;
            placedItem.y = room.length / 2;
          } else {
            // Default placement
            placedItem.x = room.width / 2 - item.width / 2;
            placedItem.y = room.length - item.depth - 0.5;
          }
          break;
          
        default:
          // Default placement in the center of the room
          placedItem.x = room.width / 2 - item.width / 2;
          placedItem.y = room.length / 2 - item.depth / 2;
          break;
      }
      
      layout.push(placedItem);
    });
    
    return layout;
  }
};

export default DesignRuleEngine;
