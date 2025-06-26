
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Mail, Phone, Calendar, Briefcase } from 'lucide-react';
import { useEmployees } from '../hooks/useEmployees';

const EmployeeDetail = () => {
  const { id } = useParams();
  const { employees, loading } = useEmployees();
  const [activeTab, setActiveTab] = useState('overview');

  const employee = employees.find(emp => emp.id === parseInt(id || '0'));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Employee Not Found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'Projects' },
    { id: 'feedback', label: 'Feedback' },
  ];

  const mockProjects = [
    { name: 'Q4 Marketing Campaign', status: 'In Progress', completion: 75 },
    { name: 'Website Redesign', status: 'Completed', completion: 100 },
    { name: 'Employee Training Program', status: 'Planning', completion: 25 },
  ];

  const mockFeedback = [
    { date: '2024-01-15', feedback: 'Excellent work on the recent project delivery. Shows strong leadership skills.' },
    { date: '2024-01-01', feedback: 'Great collaboration with the team. Always willing to help others.' },
    { date: '2023-12-15', feedback: 'Consistently meets deadlines and produces high-quality work.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8">
            <div className="flex items-start space-x-6 mb-8">
              <img
                src={employee.image}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {employee.firstName} {employee.lastName}
                </h1>
                <p className="text-lg text-gray-600 mb-4">{employee.department}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(employee.rating)}
                    <span className="text-sm text-gray-600 ml-1">({employee.rating}/5)</span>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="min-h-[300px]">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{employee.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{employee.address.city}, {employee.address.state}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">Age: {employee.age}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance History</h3>
                    <div className="space-y-2">
                      {Array.from({ length: 4 }, (_, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Q{4-i} 2023</span>
                          <div className="flex items-center space-x-1">
                            {renderStars(Math.floor(Math.random() * 2) + 4)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Projects</h3>
                  <div className="space-y-4">
                    {mockProjects.map((project, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{project.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.completion}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{project.completion}% complete</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'feedback' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Feedback</h3>
                  <div className="space-y-4">
                    {mockFeedback.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-900">Performance Review</span>
                          <span className="text-sm text-gray-500">{item.date}</span>
                        </div>
                        <p className="text-gray-700">{item.feedback}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
