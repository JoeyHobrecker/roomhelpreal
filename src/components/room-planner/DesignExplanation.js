import React from 'react';

const DesignExplanation = ({ designDecisions, designCurrent }) => {
  // Map design currents to their descriptions and colors
  const designCurrentInfo = {
    'feng-shui': {
      name: 'Feng Shui',
      description: 'Ancient Chinese practice focused on energy flow and balance',
      color: 'bg-red-100 border-red-300',
      icon: '☯'
    },
    'modern': {
      name: 'Modern Design Science',
      description: 'Contemporary approaches based on ergonomics and psychology',
      color: 'bg-blue-100 border-blue-300',
      icon: '📐'
    },
    'scandinavian': {
      name: 'Scandinavian Design',
      description: 'Minimalist approach emphasizing functionality and light',
      color: 'bg-green-100 border-green-300',
      icon: '🌿'
    },
    'universal': {
      name: 'Universal Design Principles',
      description: 'Fundamental principles that apply to most room layouts',
      color: 'bg-purple-100 border-purple-300',
      icon: '🔄'
    }
  };

  // Group decisions by furniture item
  const groupedDecisions = designDecisions.reduce((acc, decision) => {
    if (!acc[decision.furniture]) {
      acc[decision.furniture] = [];
    }
    acc[decision.furniture].push(decision);
    return acc;
  }, {});

  return (
    <div className="design-explanation">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Design Approach</h3>
        
        {designCurrent ? (
          <div className={`p-4 rounded-lg ${designCurrentInfo[designCurrent].color}`}>
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">{designCurrentInfo[designCurrent].icon}</span>
              <h4 className="font-bold">{designCurrentInfo[designCurrent].name}</h4>
            </div>
            <p>{designCurrentInfo[designCurrent].description}</p>
          </div>
        ) : (
          <div className="bg-gray-100 p-4 rounded-lg">
            <p>Select a room goal to see which design principles will be applied.</p>
          </div>
        )}
      </div>
      
      {Object.keys(groupedDecisions).length > 0 ? (
        <div>
          <h3 className="text-xl font-bold mb-4">Design Decisions Explained</h3>
          
          <div className="space-y-4">
            {Object.entries(groupedDecisions).map(([furniture, decisions]) => (
              <div key={furniture} className="border rounded-lg overflow-hidden">
                <div className="bg-ikea-blue text-white p-3">
                  <h4 className="font-bold">{furniture}</h4>
                </div>
                <div className="divide-y divide-gray-200">
                  {decisions.map((decision, index) => {
                    const currentInfo = designCurrentInfo[decision.current] || designCurrentInfo.universal;
                    
                    return (
                      <div key={index} className="p-3">
                        <div className="flex items-start">
                          <span className="text-xl mr-2 mt-1">{currentInfo.icon}</span>
                          <div>
                            <p className="font-medium">{decision.rule}</p>
                            <p className="text-sm text-gray-600">{decision.explanation}</p>
                            <div className="mt-1 text-xs text-gray-500">
                              Based on <span className="font-medium">{currentInfo.name}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : designCurrent ? (
        <div className="bg-gray-100 p-4 rounded-lg">
          <p>Add furniture to your room to see design decisions explained.</p>
        </div>
      ) : null}
      
      <div className="mt-6 bg-ikea-yellow bg-opacity-20 p-4 rounded-lg">
        <h4 className="font-bold mb-2">Why Design Principles Matter</h4>
        <p className="text-sm">
          Applying established design principles helps create spaces that are not only aesthetically pleasing
          but also functional, comfortable, and conducive to their intended purpose. Our room planner uses
          these principles to optimize your layout based on your specific goals.
        </p>
      </div>
    </div>
  );
};

export default DesignExplanation;
