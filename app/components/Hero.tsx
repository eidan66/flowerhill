import React from 'react';
import Button from './Button';
import { Icon } from './icons';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-green-50 to-amber-50 overflow-hidden" dir="ltr">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-6 leading-tight">
              Premium Israeli Flowers for Global Markets
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Wholesale excellence from field to florist worldwide. Partner with Flower Hill for
              consistent supply of premium blooms, expert logistics, and personalized service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" className="whitespace-nowrap">
                Request Wholesale Pricing
              </Button>
              <Button variant="outline" size="lg" className="whitespace-nowrap">
                View Catalog
              </Button>
            </div>
          </div>

          {/* Image Content */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-amber-200 rounded-2xl transform rotate-6"></div>
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border-8 border-white">
                <div className="aspect-video bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="mb-4 flex justify-center text-green-700">
                      <Icon name="flower" className="h-16 w-16" />
                    </div>
                    <p className="text-green-800 font-semibold">Premium Wholesale Flowers</p>
                    <p className="text-gray-600 mt-2">Serving Global Markets Since 1980s</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="container mx-auto px-4 py-8 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-green-800">30+</div>
            <div className="text-gray-600 text-sm">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-800">50+</div>
            <div className="text-gray-600 text-sm">Countries Served</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-800">1000+</div>
            <div className="text-gray-600 text-sm">Product Varieties</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-800">24/7</div>
            <div className="text-gray-600 text-sm">Customer Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;