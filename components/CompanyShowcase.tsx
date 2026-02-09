
import React from 'react';
import { COMPANIES_DATA } from '../constants';

const CompanyShowcase: React.FC = () => {
  return (
    <section className="py-12 bg-white overflow-hidden border-y border-slate-100">
      {/* Marquee Animation Container */}
      <div className="flex relative">
        <div className="flex animate-marquee whitespace-nowrap gap-12 items-center">
          {[...COMPANIES_DATA, ...COMPANIES_DATA].map((company, idx) => (
            <div 
              key={`${company.name}-${idx}`} 
              className="flex items-center group cursor-default"
            >
              <div className={`w-12 h-12 ${company.color} rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg group-hover:scale-110 transition-transform`}>
                {company.short}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default CompanyShowcase;
