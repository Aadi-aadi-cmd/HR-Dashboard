
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Bookmark, TrendingUp, MapPin, Mail } from 'lucide-react';
import { useBookmarks } from '../hooks/useBookmarks';

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

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const isBookmarked = bookmarks.includes(employee.id);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600 bg-green-100';
    if (rating >= 3) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={employee.image}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-sm text-gray-600 flex items-center">
                <Mail className="h-3 w-3 mr-1" />
                {employee.email}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleBookmark(employee.id);
            }}
            className={`p-2 rounded-full transition-colors ${
              isBookmarked
                ? 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                : 'text-gray-400 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {employee.address.city}, {employee.address.state}
            </span>
            <span className="text-sm text-gray-600">Age: {employee.age}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(employee.rating)}`}>
              {employee.department}
            </span>
            <div className="flex items-center space-x-1">
              {renderStars(employee.rating)}
              <span className="text-sm text-gray-600 ml-1">({employee.rating}/5)</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
          <Link
            to={`/employee/${employee.id}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors text-center"
          >
            View Details
          </Link>
          <button className="flex items-center justify-center px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors">
            <TrendingUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
