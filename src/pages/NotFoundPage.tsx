import React from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';

export const NotFoundPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="max-w-xl mx-auto px-6 py-24 text-center space-y-6">
        <div className="w-12 h-12 rounded bg-[#000000]/10 flex items-center justify-center text-[#000000] mx-auto font-mono text-sm font-semibold">
          404
        </div>
        <h1 className="text-3xl font-light text-[#000000]">Page Not Found</h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          The requested clinical view does not exist or may have been archived.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-block bg-[#000000] hover:bg-[#000000] text-white text-xs font-mono uppercase px-6 py-3 tracking-wider"
          >
            Return to Overview
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
};


