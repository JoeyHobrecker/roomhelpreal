import React from 'react';

const DesignPrinciples = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Design Principles</h1>
      
      <div className="max-w-3xl mx-auto mb-12">
        <p className="text-lg mb-6">
          Our room planning application is based on established design principles from different currents.
          We've researched and implemented concrete rules from Feng Shui, modern interior design science,
          and Scandinavian design to help you create harmonious and functional spaces.
        </p>
        <p className="text-lg">
          Learn about each design current below and how their principles influence our room planning recommendations.
        </p>
      </div>
      
      {/* Feng Shui Section */}
      <section id="feng-shui" className="mb-16">
        <div className="bg-ikea-gray p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Feng Shui Principles</h2>
          <p className="mb-4">
            Feng Shui is an ancient Chinese practice that aims to create balance and harmony in living spaces.
            It is based on the belief that the arrangement of objects in a space can affect the flow of energy (chi)
            and impact various aspects of your life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Key Feng Shui Rules</h3>
            <ul className="space-y-4">
              <li className="border-l-4 border-ikea-blue pl-4 py-2">
                <h4 className="font-medium">Bed Placement</h4>
                <p>Don't position the bed facing the window as it disrupts sleep energy. Place the bed against a solid wall with a view of the door.</p>
              </li>
              <li className="border-l-4 border-ikea-blue pl-4 py-2">
                <h4 className="font-medium">Door Alignment</h4>
                <p>Avoid positioning your bed in direct line with the door (known as the "death position"). Instead, place it diagonally across from the door.</p>
              </li>
              <li className="border-l-4 border-ikea-blue pl-4 py-2">
                <h4 className="font-medium">Mirror Placement</h4>
                <p>Don't place mirrors facing the bed as they can reflect and amplify energy, which can be disruptive to restful sleep.</p>
              </li>
              <li className="border-l-4 border-ikea-blue pl-4 py-2">
                <h4 className="font-medium">Balance and Symmetry</h4>
                <p>Create balance with matching nightstands on both sides of the bed to promote relationship harmony and stability.</p>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Application in Room Planning</h3>
            <div className="bg-white p-4 rounded-lg shadow-ikea mb-6">
              <div className="aspect-w-4 aspect-h-3 bg-ikea-gray mb-4 flex items-center justify-center">
                <p>Feng Shui Bedroom Layout</p>
              </div>
              <p>
                When you select "Relaxation" as your room goal, our planner applies Feng Shui principles
                to create a space that promotes rest, balance, and positive energy flow.
              </p>
            </div>
            <div className="bg-ikea-yellow bg-opacity-20 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Why It Matters</h4>
              <p>
                Proper furniture placement according to Feng Shui can improve sleep quality, reduce stress,
                and create a more harmonious environment that supports your well-being.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Modern Interior Design Section */}
      <section id="modern" className="mb-16">
        <div className="bg-ikea-gray p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Modern Interior Design Science</h2>
          <p className="mb-4">
            Modern interior design science combines ergonomics, psychology, and mathematical principles
            to create spaces that are not only aesthetically pleasing but also functional and conducive to their intended purpose.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Key Modern Design Rules</h3>
            <ul className="space-y-4">
              <li className="border-l-4 border-ikea-blue pl-4 py-2">
                <h4 className="font-medium">The Golden Ratio (60/30/10)</h4>
                <p>Apply the 60/30/10 rule for color schemes, furniture placement, and room layouts to create visually balanced spaces.</p>
              </li>
              <li className="border-l-4 border-ikea-blue pl-4 py-2">
                <h4 className="font-medium">Ergonomic Workspace</h4>
                <p>Position desk perpendicular to windows to reduce eye strain while maximizing natural light. Maintain proper desk and chair height.</p>
              </li>
              <li className="border-l-4 border-ikea-blue pl-4 py-2">
                <h4 className="font-medium">Traffic Flow</h4>
                <p>Allow 30-36 inches for walkways between furniture pieces to ensure comfortable movement throughout the space.</p>
              </li>
              <li className="border-l-4 border-ikea-blue pl-4 py-2">
                <h4 className="font-medium">Furniture Proportions</h4>
                <p>Coffee tables should be approximately 2/3 the length of the sofa. Accessories should be no taller than 1/3 the height of what they sit on.</p>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Application in Room Planning</h3>
            <div className="bg-white p-4 rounded-lg shadow-ikea mb-6">
              <div className="aspect-w-4 aspect-h-3 bg-ikea-gray mb-4 flex items-center justify-center">
                <p>Modern Office Layout</p>
              </div>
              <p>
                When you select "Productivity" as your room goal, our planner applies modern design science
                to create a workspace that maximizes efficiency, comfort, and focus.
              </p>
            </div>
            <div className="bg-ikea-yellow bg-opacity-20 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Why It Matters</h4>
              <p>
                Scientific approaches to interior design can reduce physical strain, improve focus and productivity,
                and create spaces that function optimally for their intended purpose.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Scandinavian Design Section */}
      <section id="scandinavian" className="mb-16">
        <div className="bg-ikea-gray p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Scandinavian Design Principles</h2>
          <p className="mb-4">
            Scandinavian design is characterized by a minimal, clean approach that seeks to combine functionality with beauty.
            It focuses on simplicity, clean lines, and light spaces, devoid of clutter.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Key Scandinavian Design Rules</h3>
            <ul className="space-y-4">
              <li className="border-l-4 border-ikea-blue pl-4 py-2">
                <h4 className="font-medium">Minimalism</h4>
                <p>Keep only essential furniture pieces and avoid overcrowding rooms to create open, airy spaces.</p>
              </li>
              <li className="border-l-4 border-ikea-blue pl-4 py-2">
                <h4 className="font-medium">Natural Materials</h4>
                <p>Incorporate wood, wool, linen, and other natural materials to create warmth and connection to nature.</p>
              </li>
              <li className="border-l-4 border-ikea-blue pl-4 py-2">
                <h4 className="font-medium">Light Maximization</h4>
                <p>Maximize natural light with minimal window treatments and use light colors to brighten spaces.</p>
              </li>
              <li className="border-l-4 border-ikea-blue pl-4 py-2">
                <h4 className="font-medium">Functional Zoning</h4>
                <p>Arrange furniture to create distinct functional areas while maintaining an open feel.</p>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Application in Room Planning</h3>
            <div className="bg-white p-4 rounded-lg shadow-ikea mb-6">
              <div className="aspect-w-4 aspect-h-3 bg-ikea-gray mb-4 flex items-center justify-center">
                <p>Scandinavian Living Room</p>
              </div>
              <p>
                When you select "Social" as your room goal, our planner applies Scandinavian design principles
                to create a welcoming, functional space that encourages interaction and comfort.
              </p>
            </div>
            <div className="bg-ikea-yellow bg-opacity-20 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Why It Matters</h4>
              <p>
                Scandinavian design creates spaces that are not only beautiful but also practical and livable,
                promoting a sense of calm and well-being through simplicity and connection to nature.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Universal Principles Section */}
      <section id="universal" className="mb-16">
        <div className="bg-ikea-blue text-white p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Universal Design Principles</h2>
          <p className="mb-4">
            Some design principles are universal and apply to most room layouts regardless of the specific goal.
            These fundamental rules help create spaces that are functional, comfortable, and aesthetically pleasing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-ikea">
            <h3 className="text-xl font-bold mb-3">Balance</h3>
            <p>
              Distribute visual weight evenly throughout the space to create a sense of equilibrium.
              This doesn't mean perfect symmetry, but rather a harmonious arrangement of elements.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-ikea">
            <h3 className="text-xl font-bold mb-3">Proportion</h3>
            <p>
              Ensure furniture and accessories are appropriately sized for the space and in relation to each other.
              Proper scaling creates visual harmony and functional comfort.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-ikea">
            <h3 className="text-xl font-bold mb-3">Functionality</h3>
            <p>
              Design spaces that work well for their intended purpose. Consider traffic flow, accessibility,
              and how people will actually use the space in daily life.
            </p>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-ikea-yellow bg-opacity-20 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Apply These Principles?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Our room planning tool automatically applies these design principles based on your room goals and preferences.
          Start planning your perfect room now!
        </p>
        <button className="btn-primary text-lg">
          Go to Room Planner
        </button>
      </section>
    </div>
  );
};

export default DesignPrinciples;
