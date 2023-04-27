import {Icon} from "@iconify/react";
 
const Footer = () => {
  return (
    <footer className="bg-primary w-full h-32 bg-primary-800x leading-3 text-white flex items-center justify-center fixed bottom-0 left-0">
      <div className="content has-text-centered ">
        <p className="flex items-center">
          <strong className="text-gray-300 m-2">Steam_Dash 1.0.0 </strong> by{" "}
          <a className="text-gray-300 p-1 hover:text-blue-500 m-2 text-center mx-auto" href="#">
            {" "}
            Matthieu Felker.
          </a>{" "}
          Source code is licensed<a 
          className="p-2 font-bold  hover:text-blue-500"
          href="#"> Apache 2.0</a>
        
        </p>
        <span className="flex items-center justify-center tracking-wider ">
        Powered Steam Web API
      </span>
<p className="flex items-center justify-center tracking-wider ">
<span className="flex items-center ml-4 justify-center ">
Not affiliated with {""}
<a href="#">
  <Icon
    icon="simple-icons:valve"
    className="text-gray-300 w-16 h-16  align-middle m-2 hover:text-white"
  />
</a>
</span>
</p>
      </div>
    </footer>
  );
};

export default Footer;
