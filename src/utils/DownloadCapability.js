import React from 'react';

const DownloadCapability = {
  // Function to download room layout as SVG
  downloadAsSVG: (svgElement, filename = 'ikea-room-layout.svg') => {
    if (!svgElement) {
      console.error('SVG element not found');
      return;
    }
    
    // Clone the SVG element to avoid modifying the original
    const clonedSvg = svgElement.cloneNode(true);
    
    // Add IKEA branding to the SVG
    const brandingText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    brandingText.setAttribute('x', '10');
    brandingText.setAttribute('y', '20');
    brandingText.setAttribute('font-family', 'Arial, sans-serif');
    brandingText.setAttribute('font-size', '12');
    brandingText.setAttribute('fill', '#0051BA');
    brandingText.textContent = 'Created with IKEA Room Planner';
    
    clonedSvg.appendChild(brandingText);
    
    // Get SVG as string
    const svgData = new XMLSerializer().serializeToString(clonedSvg);
    
    // Create a Blob from the SVG string
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },
  
  // Function to download room layout as PNG
  downloadAsPNG: (svgElement, filename = 'ikea-room-layout.png') => {
    if (!svgElement) {
      console.error('SVG element not found');
      return;
    }
    
    // Clone the SVG element to avoid modifying the original
    const clonedSvg = svgElement.cloneNode(true);
    
    // Add IKEA branding to the SVG
    const brandingText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    brandingText.setAttribute('x', '10');
    brandingText.setAttribute('y', '20');
    brandingText.setAttribute('font-family', 'Arial, sans-serif');
    brandingText.setAttribute('font-size', '12');
    brandingText.setAttribute('fill', '#0051BA');
    brandingText.textContent = 'Created with IKEA Room Planner';
    
    clonedSvg.appendChild(brandingText);
    
    // Get SVG dimensions
    const svgWidth = clonedSvg.getAttribute('width');
    const svgHeight = clonedSvg.getAttribute('height');
    
    // Get SVG as string
    const svgData = new XMLSerializer().serializeToString(clonedSvg);
    
    // Create a Blob from the SVG string
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);
    
    // Create an Image object to draw to canvas
    const img = new Image();
    
    img.onload = () => {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      canvas.width = svgWidth;
      canvas.height = svgHeight;
      
      // Get canvas context and draw the image
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      // Convert canvas to PNG
      canvas.toBlob((blob) => {
        // Create download link
        const pngUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = filename;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(pngUrl);
      }, 'image/png');
      
      // Clean up SVG URL
      URL.revokeObjectURL(url);
    };
    
    // Set image source to SVG URL
    img.src = url;
  },
  
  // Function to download room layout as JSON
  downloadAsJSON: (roomData, filename = 'ikea-room-layout.json') => {
    // Add metadata to the room data
    const dataWithMetadata = {
      ...roomData,
      metadata: {
        creator: 'IKEA Room Planner',
        version: '1.0.0',
        createdAt: new Date().toISOString()
      }
    };
    
    // Convert room data to JSON string
    const jsonString = JSON.stringify(dataWithMetadata, null, 2);
    
    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },
  
  // Function to download shopping list as PDF
  downloadShoppingListAsPDF: (productList, filename = 'ikea-shopping-list.pdf') => {
    // This is a placeholder for PDF generation
    // In a real implementation, you would use a library like jsPDF
    
    // For now, we'll create a simple text file
    let content = 'IKEA SHOPPING LIST\n\n';
    content += 'Created with IKEA Room Planner\n';
    content += `Date: ${new Date().toLocaleDateString()}\n\n`;
    
    // Add products to the list
    content += 'PRODUCTS:\n';
    productList.forEach((product, index) => {
      content += `${index + 1}. ${product.name} - ${product.description}\n`;
      content += `   Price: $${product.price}\n`;
      content += `   Dimensions: ${product.dimensions}\n`;
      content += `   Article Number: ${product.id}\n\n`;
    });
    
    // Add total price
    const totalPrice = productList.reduce((sum, product) => sum + product.price, 0);
    content += `TOTAL: $${totalPrice}\n\n`;
    
    content += 'Thank you for shopping at IKEA!';
    
    // Create a Blob from the text content
    const blob = new Blob([content], { type: 'text/plain' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename.replace('.pdf', '.txt');
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },
  
  // Component for download buttons
  DownloadButtons: ({ svgRef, roomData, productList }) => {
    return (
      <div className="download-buttons flex flex-wrap gap-2 mt-4">
        <button 
          className="bg-ikea-blue text-white px-4 py-2 rounded-ikea hover:bg-ikea-dark-blue transition-colors"
          onClick={() => DownloadCapability.downloadAsSVG(svgRef.current)}
        >
          Download as SVG
        </button>
        
        <button 
          className="bg-ikea-blue text-white px-4 py-2 rounded-ikea hover:bg-ikea-dark-blue transition-colors"
          onClick={() => DownloadCapability.downloadAsPNG(svgRef.current)}
        >
          Download as PNG
        </button>
        
        <button 
          className="bg-ikea-yellow text-black px-4 py-2 rounded-ikea hover:bg-yellow-500 transition-colors"
          onClick={() => DownloadCapability.downloadAsJSON(roomData)}
        >
          Save Layout
        </button>
        
        {productList && productList.length > 0 && (
          <button 
            className="bg-green-600 text-white px-4 py-2 rounded-ikea hover:bg-green-700 transition-colors"
            onClick={() => DownloadCapability.downloadShoppingListAsPDF(productList)}
          >
            Download Shopping List
          </button>
        )}
      </div>
    );
  }
};

export default DownloadCapability;
