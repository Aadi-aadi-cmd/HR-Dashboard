
import React, { useState, useMemo } from 'react';
import { useEmployees } from '../hooks/useEmployees';
import EmployeeCard from '../components/EmployeeCard';
import SearchAndFilter from '../components/SearchAndFilter';

const Dashboard = () => {
  const { employees, loading, error } = useEmployees();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  const departments = useMemo(() => {
    return Array.from(new Set(employees.map(emp => emp.department)));
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch = 
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment = !selectedDepartment || employee.department === selectedDepartment;
      const matchesRating = !selectedRating || employee.rating >= parseInt(selectedRating);

      return matchesSearch && matchesDepartment && matchesRating;
    });
  }, [employees, searchTerm, selectedDepartment, selectedRating]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading employees...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Dashboard</h1>
          <p className="text-gray-600">Manage and track employee performance</p>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          selectedRating={selectedRating}
          onRatingChange={setSelectedRating}
          departments={departments}
        />

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredEmployees.length} of {employees.length} employees
          </p>
        </div>

        {filteredEmployees.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No employees found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
