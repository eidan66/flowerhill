import React from 'react';
import Button from './Button';

const CallToAction: React.FC = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-green-800 to-green-900 text-white" dir="ltr">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Grow Your Business with Premium Flowers?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-green-100">
          Join hundreds of florists, event designers, and hospitality businesses who trust Flower Hill
          for consistent quality and reliable supply.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" size="lg" className="font-semibold">
            Request a Quote
          </Button>
          <Button variant="ghost" size="lg" className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white">
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;