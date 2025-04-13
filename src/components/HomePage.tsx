import { ShoppingBasket, Clock, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/skipqu-logo.png';

export const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-6 pb-2">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="SkipQu Logo" className="h-6" />
          <span className="text-xl font-bold text-[#F6A100]">SkipQu</span>
        </div>
        <div className="text-right text-xs text-gray-700">
          <div className="flex items-center justify-end space-x-1">
            <ShoppingCart size={16} />
            <span className="text-sm font-semibold">Hometown Supermart</span>
          </div>
          <div className="text-gray-500 text-[10px]">ECC Road, Pattandur Agrahara</div>
        </div>
      </div>

      {/* Items List */}
      <div className="flex-grow px-4 pb-28 overflow-y-auto">
        {/* Items List */}
        {[
          { name: 'Diary Milk Chocolate 50gm', price: 60, oldPrice: 82, discount: '10% Off', quantity: 2 },
          { name: 'Nandini Milk 1/2 Ltr', price: 27, oldPrice: 30, discount: '4% Off', quantity: 1 },
          { name: 'Diary Milk Chocolate 50gm', price: 60, oldPrice: 82, discount: '10% Off', quantity: 2 },
          { name: 'Diary Milk Chocolate 50gm', price: 60, oldPrice: 82, discount: '10% Off', quantity: 2 },
          { name: 'Diary Milk Chocolate 50gm', price: 60, oldPrice: 82, discount: '10% Off', quantity: 2 },
          { name: 'Diary Milk Chocolate 50gm', price: 60, oldPrice: 82, discount: '10% Off', quantity: 2 }
        ].map((item, index) => (
          <div key={index} className="border-b py-3">
            <div className="font-semibold text-sm">{item.name}</div>
            <div className="text-sm">
              <span className="text-black font-bold">₹{item.price}</span>
              <span className="line-through text-gray-400 ml-2">₹{item.oldPrice}</span>
              <span className="text-green-600 ml-2 font-semibold">{item.discount}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div></div>
              <div className="flex items-center bg-yellow-100 rounded-full px-3 py-1 space-x-2 font-medium text-yellow-800">
                <button className="text-lg">-</button>
                <span>{item.quantity}</span>
                <button className="text-lg">+</button>
              </div>
              <div className="font-bold text-sm">₹{item.price * item.quantity}</div>
            </div>
          </div>
        ))}

        {/* Bill Summary */}
        <div className="bg-gray-100 rounded-lg mt-4 p-4">
          <h2 className="font-semibold mb-2">Bill Summary</h2>
          <div className="flex justify-between text-sm py-1">
            <span className="flex items-center gap-1"><ShoppingCart size={16} /> Item total</span>
            <span>₹1243</span>
          </div>
          <div className="flex justify-between text-sm py-1">
            <span className="flex items-center gap-1"><Clock size={16} /> Platform Fee</span>
            <span>₹0</span>
          </div>
          <div className="flex justify-between mt-2 font-bold text-base">
            <span>Grand Total</span>
            <span>₹1243</span>
          </div>
        </div>

        {/* Pay Button (Floating with Grand Total) */}
        <div className="fixed bottom-16 left-0 right-0 px-4 z-10">
          <div className="bg-white rounded-xl shadow-lg p-3 flex items-center justify-between border">
            <div>
              <div className="text-sm text-gray-500">Grand Total</div>
              <div className="text-lg font-bold">₹1243</div>
            </div>
            <button className="bg-teal-600 text-white px-6 py-2 rounded-full font-semibold text-base">
              Click to Pay
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-around items-center h-16 border-t border-gray-200">
        <button
          onClick={() => navigate('/history')}
          className="flex flex-col items-center text-xs text-gray-700"
        >
          <Clock size={20} />
          <span>History</span>
        </button>
        <button
          onClick={() => navigate('/scan')}
          className="bg-white p-2 rounded-full -mt-6 shadow-md"
        >
          <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center border border-teal-300">
            <ShoppingBasket size={24} className="text-teal-500" />
          </div>
        </button>
        <button
          onClick={() => navigate('/profile')}
          className="flex flex-col items-center text-xs text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1117.804 5.121M15 11a3 3 0 11-6 0 3 3 0 016 0zm-9 8a7 7 0 1114 0H6z" />
          </svg>
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
};