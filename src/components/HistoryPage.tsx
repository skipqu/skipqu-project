import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

// Mock history data - in a real app, this would come from your backend
const MOCK_HISTORY = [
  {
    id: '1',
    date: '2024-03-10',
    total: 45.97,
    items: ['Organic Bananas', 'Whole Milk', 'Wheat Bread'],
  },
  {
    id: '2',
    date: '2024-03-08',
    total: 32.50,
    items: ['Orange Juice', 'Eggs', 'Cheese'],
  },
];

export const HistoryPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 p-6"
    >
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping History</h1>
        
        <div className="space-y-4">
          {MOCK_HISTORY.map((purchase) => (
            <motion.div
              key={purchase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 shadow-md"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock size={16} />
                  <span>{new Date(purchase.date).toLocaleDateString()}</span>
                </div>
                <span className="font-medium text-blue-600">
                  ${purchase.total.toFixed(2)}
                </span>
              </div>
              <div className="space-y-1">
                {purchase.items.map((item, index) => (
                  <div key={index} className="text-gray-700">
                    • {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};