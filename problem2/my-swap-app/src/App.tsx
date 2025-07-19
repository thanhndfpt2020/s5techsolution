import SwapForm from './components/SwapForm';
import cryptoBg from './assets/background.png';

export default function App() {
  return (
    // <div className="min-h-screen flex items-center justify-center p-4">
    //   <SwapForm />
    // </div>

    <div className="relative min-h-screen bg-black overflow-hidden">
  {/* Background animation */}
  <div className="absolute inset-0 z-0 opacity-50">
    <img
      src={cryptoBg}
      alt="crypto background"
      className="w-full h-full object-cover animate-pulse"
    />
  </div>

  {/* Main content */}
  <div className="relative z-10 flex items-center justify-center min-h-screen">
    <SwapForm />
  </div>
</div>
  );
}