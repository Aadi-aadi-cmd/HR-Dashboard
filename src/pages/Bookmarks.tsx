
import React from 'react';
import { useBookmarks } from '../hooks/useBookmarks';
import { useEmployees } from '../hooks/useEmployees';
import EmployeeCard from '../components/EmployeeCard';
import { Bookmark as BookmarkIcon } from 'lucide-react';

const Bookmarks = () => {
  const { bookmarks } = useBookmarks();
  const { employees, loading } = useEmployees();

  const bookmarkedEmployees = employees.filter(emp => bookmarks.includes(emp.id));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <BookmarkIcon className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Bookmarked Employees</h1>
          </div>
          <p className="text-gray-600">Your saved employee profiles for quick access</p>
        </div>

        {bookmarkedEmployees.length === 0 ? (
          <div className="text-center py-16">
            <BookmarkIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Bookmarked Employees</h3>
            <p className="text-gray-600 mb-6">Start bookmarking employees from the dashboard to see them here.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                {bookmarkedEmployees.length} bookmarked employee{bookmarkedEmployees.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedEmployees.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
