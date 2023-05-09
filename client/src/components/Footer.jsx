
import { Icon } from '@iconify/react';

const Footer = () => {


  return (
    
    <footer className="bg-primary text-white p-4 text-sm mx-auto">
  <div className="text-center">
    <p>
      <strong>Steam_Dash 1.0.0</strong> by{' '}
      <a href="#" className="text-gray-300 hover:text-blue-500">
        Matthieu Felker
      </a>. Source code is licensed under the{' '}
      <a href="#" className="text-gray-300 hover:text-blue-500">
        Apache 2.0
      </a> license.
    </p>
    <p className="mt-2">
      Powered by{' '}
      <a href="#" className="text-gray-300 hover:text-blue-500">
        Steam Web API
      </a>. Not affiliated with Valve in any way.
    </p>
  </div>
</footer>
  );
};

export default Footer;
