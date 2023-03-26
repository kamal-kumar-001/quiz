import { useRouter } from 'next/router';
import { useEffect } from 'react';
function isLoggedIn() {
    // Check if the user is logged in by checking for a token in local storage
    const token = localStorage.getItem('token');
    return token != null;
  }
const AdminRoute = ({ children, ...props }) => {
    const router = useRouter();
  
    useEffect(() => {
        // Redirect to the login page if the user is not logged in
        if (!isLoggedIn()) {
          router.push('/login');
        }
      }, [router]);
  
    return <>{children}</>;
  };
  
  
  export default AdminRoute;
  