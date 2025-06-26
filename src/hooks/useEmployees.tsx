
import { useState, useEffect } from 'react';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  address: {
    city: string;
    state: string;
  };
  image: string;
  department: string;
  rating: number;
}

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users?limit=20');
        const data = await response.json();
        
        const processedEmployees = data.users.map((user: any, index: number) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          age: user.age,
          address: {
            city: user.address.city,
            state: user.address.state,
          },
          image: user.image,
          department: departments[index % departments.length],
          rating: Math.floor(Math.random() * 5) + 1,
        }));
        
        setEmployees(processedEmployees);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch employees');
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return { employees, loading, error };
};
