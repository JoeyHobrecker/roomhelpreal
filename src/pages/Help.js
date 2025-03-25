import React from 'react';

const Help = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Help & FAQ</h1>
      
      <div className="max-w-3xl mx-auto mb-12">
        <p className="text-lg mb-6">
          Welcome to the Help and FAQ page for our IKEA-inspired Room Planning tool. 
          Here you'll find answers to common questions and guidance on how to get the most out of our application.
        </p>
      </div>
      
      {/* Getting Started Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-ikea">
            <h3 className="text-xl font-bold mb-3">How do I start planning my room?</h3>
            <p className="mb-4">
              To start planning your room, click on the "Room Planner" link in the navigation menu or the "Start Planning Now" 
              button on the homepage. This will take you to our step-by-step room planning wizard.
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Enter your room dimensions and basic information</li>
              <li>Add doors, windows, and fixed elements</li>
              <li>Select your room goal (Productivity, Relaxation, Social)</li>
              <li>Add any existing furniture you want to keep</li>
              <li>Select desired new furniture</li>
              <li>View your optimized room layout with explanations</li>
            </ol>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-ikea">
            <h3 className="text-xl font-bold mb-3">Do I need to create an account?</h3>
            <p>
              No, you don't need to create an account to use our room planning tool. However, creating an account 
              would allow you to save your room plans and access them later. This feature is coming soon!
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-ikea">
            <h3 className="text-xl font-bold mb-3">Is this tool affiliated with IKEA?</h3>
            <p>
              No, this room planning tool is not officially affiliated with IKEA. It's a prototype demonstration 
              that uses IKEA's design aesthetics and showcases furniture similar to IKEA products.
            </p>
          </div>
        </div>
      </section>
      
      {/* Using the Room Planner Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Using the Room Planner</h2>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-ikea">
            <h3 className="text-xl font-bold mb-3">How accurate are the room measurements?</h3>
            <p>
              Our room planner uses the measurements you provide to create a scaled visualization of your space. 
              For the most accurate results, measure your room carefully, including the location of doors, 
              windows, and any fixed elements like built-in shelving or fireplaces.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-ikea">
            <h3 className="text-xl font-bold mb-3">What are room goals and how do they affect my layout?</h3>
            <p className="mb-4">
              Room goals help our system understand the primary purpose of your room, which influences 
              which design principles we apply to your layout:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Productivity:</strong> Optimizes for work, focus, and efficiency using modern design research</li>
              <li><strong>Relaxation:</strong> Creates a calm, peaceful space for rest using Feng Shui principles</li>
              <li><strong>Social:</strong> Designs for gatherings and conversation using Scandinavian design principles</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-ikea">
            <h3 className="text-xl font-bold mb-3">Can I modify the suggested layout?</h3>
            <p>
              Yes! After our system generates an optimized layout, you can drag and drop furniture items 
              to adjust their positions. Keep in mind that moving items may affect the design principles 
              being applied, and our system will notify you if a placement contradicts recommended guidelines.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-ikea">
            <h3 className="text-xl font-bold mb-3">How do I save or share my room design?</h3>
            <p>
              On the final results page, you'll find a "Download Layout" button that allows you to save your 
              room design as an image file. You can then share this image with friends, family, or interior designers.
              In a future update, we plan to add direct sharing options to social media and email.
            </p>
          </div>
        </div>
      </section>
      
      {/* Design Principles Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Design Principles</h2>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-ikea">
            <h3 className="text-xl font-bold mb-3">What design principles does the planner use?</h3>
            <p className="mb-4">
              Our room planner incorporates principles from three main design currents:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Feng Shui:</strong> Ancient Chinese practice focused on energy flow and balance</li>
              <li><strong>Modern Design Science:</strong> Contemporary approaches based on ergonomics and psychology</li>
              <li><strong>Scandinavian Design:</strong> Minimalist approach emphasizing functionality and light</li>
            </ul>
            <p className="mt-4">
              Visit our <a href="/design-principles" className="text-ikea-blue hover:underline">Design Principles</a> page to learn more about each approach.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-ikea">
            <h3 className="text-xl font-bold mb-3">Why do some furniture placements contradict each other?</h3>
            <p>
              Different design currents sometimes have contradicting rules. When this happens, our system prioritizes 
              rules based on your selected room goal. For example, if you choose "Relaxation" as your goal, 
              Feng Shui principles will take precedence when they conflict with other design approaches.
            </p>
          </div>
        </div>
      </section>
      
      {/* IKEA Product Recommendations Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">IKEA Product Recommendations</h2>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-ikea">
            <h3 className="text-xl font-bold mb-3">How are product recommendations generated?</h3>
            <p>
              Our system recommends furniture based on your room dimensions, selected goal, and design preferences. 
              We consider factors like size compatibility, style consistency, and functional requirements to suggest 
              appropriate IKEA-style products that would work well in your space.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-ikea">
            <h3 className="text-xl font-bold mb-3">Can I filter recommendations by budget?</h3>
            <p>
              Yes, on the product recommendations page, you can filter items by budget category:
              Budget-Friendly, Mid-Range, or Premium. This helps you find options that fit your price range.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-ikea">
            <h3 className="text-xl font-bold mb-3">Are these actual IKEA products?</h3>
            <p>
              The product recommendations are styled to resemble IKEA products but are sample representations 
              for demonstration purposes. In a production version, these would link to actual available products.
            </p>
          </div>
        </div>
      </section>
      
      {/* Technical Issues Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Technical Issues</h2>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-ikea">
            <h3 className="text-xl font-bold mb-3">The room visualization isn't loading. What should I do?</h3>
            <p className="mb-4">
              If you're experiencing issues with the room visualization, try these troubleshooting steps:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Refresh your browser page</li>
              <li>Clear your browser cache and cookies</li>
              <li>Try using a different web browser (Chrome, Firefox, Safari)</li>
              <li>Ensure your browser is updated to the latest version</li>
              <li>Check that JavaScript is enabled in your browser settings</li>
            </ol>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-ikea">
            <h3 className="text-xl font-bold mb-3">Can I use this tool on mobile devices?</h3>
            <p>
              Yes, our room planning tool is designed to be responsive and work on mobile devices, tablets, and desktop computers. 
              However, for the best experience with the interactive room visualization, we recommend using a device with a larger screen.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="bg-ikea-gray p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          If you couldn't find the answer to your question, please contact our support team.
          We're here to help you create your perfect room layout!
        </p>
        <button className="btn-primary text-lg">
          Contact Support
        </button>
      </section>
    </div>
  );
};

export default Help;
