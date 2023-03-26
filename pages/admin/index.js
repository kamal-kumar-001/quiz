import React from 'react'
import Admin from '../../components/Admin'
import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import AdminRoute from '../../components/dashboard/adminRoute';
import { useRouter } from 'next/router';

const AdminPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt.decode(token);

    // Extract the user ID from the payload
    const userId = decodedToken?.userId;
    // Fetch user data from API route
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error(err);
        router.push('/login');
      }
    };

    fetchUser();
  }, []);
  const [quizzes, setQuizzes] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt.decode(token);
    // Extract the user ID from the payload
    const userId = decodedToken?.userId;
    // Fetch user data from API route
    const fetchQuizzes = async () => {
      try {
        const res = await fetch('/api/quiz', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setQuizzes(data.quizzes);
      } catch (err) {
        console.error(err);
        router.push('/admin');
      }
    };

    fetchQuizzes();
  }, []);
  return (
    <AdminRoute>
      <Admin quizzes={quizzes} user={user} />
    </AdminRoute>
  )
}
export default AdminPage
