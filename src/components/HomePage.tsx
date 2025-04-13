import { ShoppingBasket, Clock, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/skipqu-logo.png';

export const HomePage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { name: 'Diary Milk Chocolate 50gm', price: 60, oldPrice: 82, discount: '10% Off', quantity: 2 },
    { name: 'Nandini Milk 1/2 Ltr', price: 27, oldPrice: 30, discount: '4% Off', quantity: 1 },
    { name: 'Diary Milk Chocolate 50gm', price: 60, oldPrice: 82, discount: '10% Off', quantity: 2 },
    { name: 'Diary Milk Chocolate 50gm', price: 60, oldPrice: 82, discount: '10% Off', quantity: 2 },
    { name: 'Diary Milk Chocolate 50gm', price: 60, oldPrice: 82, discount: '10% Off', quantity: 2 },
    { name: 'Diary Milk Chocolate 50gm', price: 60, oldPrice: 82, discount: '10% Off', quantity: 2 }
  ]);

  const itemTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const platformFee = 5;
  const totalAmount = itemTotal + platformFee;

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
        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 mt-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M10 21h4" />
            </svg>
            <div className="text-lg font-medium mb-4">No Items Added.</div>
            <button
              onClick={() => navigate('/scan')}
              className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold text-sm"
            >
              Add Item
            </button>
          </div>
        )}

        {items.length > 0 && (
          <>
            {items.map((item, index) => (
              <div key={index} className="border-b py-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-sm">{item.name}</div>
                    <div className="text-sm mt-1">
                      <span className="text-black font-bold">₹{item.price}</span>
                      <span className="line-through text-gray-400 ml-2">₹{item.oldPrice}</span>
                      <span className="text-green-600 ml-2 font-semibold">{item.discount}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-yellow-50 border-2 border-yellow-400 rounded-full px-4 py-1 w-24">
                    <button
                      className="text-yellow-600 text-lg font-bold"
                      onClick={() => {
                        setItems(prev =>
                      prev
                        .map((it, i) =>
                          i === index ? { ...it, quantity: it.quantity - 1 } : it
                        )
                        .filter(it => it.quantity > 0)
                        );
                      }}
                    >
                      -
                    </button>
                    <span className="font-bold text-base text-black">{item.quantity}</span>
                    <button
                      className="text-yellow-600 text-lg font-bold"
                      onClick={() => {
                        setItems(prev =>
                          prev.map((it, i) =>
                            i === index ? { ...it, quantity: it.quantity + 1 } : it
                          )
                        );
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right font-bold text-sm mt-1">₹{item.price * item.quantity}</div>
              </div>
            ))}

            {/* Bill Summary */}
            <div className="bg-gray-100 rounded-lg mt-4 p-4">
              <h2 className="font-semibold mb-2">Bill Summary</h2>
              <div className="flex justify-between text-sm py-1">
                <span className="flex items-center gap-1"><ShoppingCart size={16} /> Item total</span>
                <span>₹{itemTotal}</span>
              </div>
              <div className="flex justify-between text-sm py-1">
                <span className="flex items-center gap-1"><Clock size={16} /> Platform Fee</span>
                <span>₹5</span>
              </div>
              <div className="flex justify-between mt-2 font-bold text-base">
                <span>Grand Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
          </>
        )}

        {/* Pay Button (Floating with Grand Total) */}
        {items.length > 0 && (
          <div className="fixed bottom-16 left-0 right-0 px-4 z-0">
            <div className="bg-white rounded-xl shadow-lg p-3 flex items-center justify-between border">
              <div>
                <div className="text-sm text-gray-500">Grand Total</div>
                <div className="text-lg font-bold">₹{totalAmount}</div>
              </div>
              <button className="bg-teal-600 text-white px-6 py-2 rounded-full font-semibold text-base">
                Click to Pay
              </button>
            </div>
          </div>
        )}
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
          className="bg-white p-2 rounded-full -mt-6 shadow-md z-20"
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