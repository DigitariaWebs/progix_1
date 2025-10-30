'use client';

import React, { useState } from 'react';
import { expertiseData, expertiseCategories } from '../../data/expertiseData';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExpertisePage() {
  const [filter, setFilter] = useState('all');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const filteredExpertise = filter === 'all' 
    ? expertiseData 
    : expertiseData.filter(item => item.type.toLowerCase() === filter);

  const toggleExpand = (itemName: string) => {
    setExpandedItem(expandedItem === itemName ? null : itemName);
  };

  return (
    <>
      {/* Header Space */}
      <div className="h-32 bg-white"></div>

      <div className="min-h-screen bg-white text-black py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left section */}
            <div className="lg:fixed lg:bottom-8 lg:left-8 lg:w-1/2 lg:max-w-[calc(50vw-4rem)] lg:px-4">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Core-Level Control
              </h1>
              <p className="text-lg mb-8 max-w-xl">
                Webisoft&apos;s powerhouse team of senior full-stack developers
                brings unmatched expertise and knowledge across a wide range of
                tech stacks.
              </p>

              {/* Filter buttons */}
              <div className="flex flex-wrap gap-2 mb-6">
                {expertiseCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setFilter(category.id)}
                    className={`px-4 py-2 border-2 border-[#0A2456] text-sm ${
                      filter === category.id
                        ? 'bg-[#0A2456] text-white'
                        : 'bg-white text-[#0A2456]'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Right section */}
            <div className="lg:w-1/2 lg:ml-[50%] lg:pl-6">
              <div className="space-y-4">
                {filteredExpertise.map((item, index) => (
                  <div key={item.name}>
                    <motion.div
                      onClick={() => toggleExpand(item.name)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border-t border-[#1D4760] py-5 cursor-pointer"
                    >
                      <div className="flex items-center justify-between px-4">
                        <h3 className="text-2xl font-medium">{item.name}</h3>
                        <div className="flex items-center">
                          <span className="text-[#1D4760] mr-4">
                            {item.type}
                          </span>
                          <motion.span
                            animate={{
                              rotate: expandedItem === item.name ? 45 : 0,
                            }}
                            className="text-xl"
                          >
                            +
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Description panel */}
                    <AnimatePresence initial={false} mode="wait">
                      {expandedItem === item.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: 'auto',
                            opacity: 1,
                            transition: {
                              height: { duration: 0.2, ease: 'easeOut' },
                              opacity: { duration: 0.15, ease: 'easeIn' },
                            },
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                              height: { duration: 0.2, ease: 'easeIn' },
                              opacity: { duration: 0.1, ease: 'easeOut' },
                            },
                          }}
                          className="overflow-hidden px-6 py-5"
                        >
                          <p className="text-[#0A2456] mb-4">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {item.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="inline-block px-3 py-1 bg-[#1D4760] text-xs font-bold text-white"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}