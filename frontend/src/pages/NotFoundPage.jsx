import { Link } from "react-router-dom";

function NotFoundPage() {
  return(
    <div>
      <h1>404 Page Not Found</h1>
      <p>Click to 
       <Link to="/"> Return to Home</Link>
      </p>
    </div>  
  );
};

export default NotFoundPage;
