import React from 'react';
import { Link } from 'react-router-dom';
import { seoConfig } from '../../pages/Seo/seoConfig';

/**
 * SeoLinks Component
 * Use this in the Footer or a dedicated "Quick Links" section on the Home page.
 */
export default function SeoLinks() {
    // Grouping keys for better organization
    const keys = Object.keys(seoConfig);

    return (
        <div className="seo-links-section py-12 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h4 className="text-xl font-bold text-slate-800 mb-8 border-l-4 border-pink-500 pl-4">
                    Explore Fashion in Gurgaon
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-8">
                    {/* Neighborhoods */}
                    <div className="space-y-3">
                        <h5 className="font-semibold text-slate-600 text-sm uppercase tracking-wider mb-4">By Neighborhood</h5>
                        {keys.slice(0, 7).map(key => (
                            <Link
                                key={key}
                                to={`/gurgaon/${key}`}
                                className="block text-slate-500 hover:text-pink-600 text-sm transition-colors duration-200"
                            >
                                {seoConfig[key].h1.replace("Premium ", "").replace("Best ", "")}
                            </Link>
                        ))}
                    </div>

                    {/* Trends */}
                    <div className="space-y-3">
                        <h5 className="font-semibold text-slate-600 text-sm uppercase tracking-wider mb-4">Trends & Seasons</h5>
                        {keys.slice(7, 14).map(key => (
                            <Link
                                key={key}
                                to={`/gurgaon/${key}`}
                                className="block text-slate-500 hover:text-pink-600 text-sm transition-colors duration-200"
                            >
                                {seoConfig[key].h1.replace("Latest ", "").replace("Chic ", "")}
                            </Link>
                        ))}
                    </div>

                    {/* Fabrics */}
                    <div className="space-y-3">
                        <h5 className="font-semibold text-slate-600 text-sm uppercase tracking-wider mb-4">Fabrics & Quality</h5>
                        {keys.slice(14, 21).map(key => (
                            <Link
                                key={key}
                                to={`/gurgaon/${key}`}
                                className="block text-slate-500 hover:text-pink-600 text-sm transition-colors duration-200"
                            >
                                {seoConfig[key].h1}
                            </Link>
                        ))}
                    </div>

                    {/* Gifting & Services */}
                    <div className="space-y-3">
                        <h5 className="font-semibold text-slate-600 text-sm uppercase tracking-wider mb-4">Special Services</h5>
                        {keys.slice(21, 32).map(key => (
                            <Link
                                key={key}
                                to={`/gurgaon/${key}`}
                                className="block text-slate-500 hover:text-pink-600 text-sm transition-colors duration-200"
                            >
                                {seoConfig[key].h1}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
