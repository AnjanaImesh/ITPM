import { useState } from 'react';

const StatusChangeTable = ({ request, onStatusChange, onCancel }) => {
  const [status, setStatus] = useState(request.status);
  const [cleaners, setCleaners] = useState(request.assignedCleaners || []);
  const [newCleaner, setNewCleaner] = useState('');

  // List of available status options
  const statusOptions = ['New', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];
  
  // Available cleaners in the system (in a real app, this would come from API)
  const availableCleaners = [
    'Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 
    'Grace', 'Hannah', 'Isaac', 'Jack', 'Kelly', 'Lisa'
  ];

  const handleAddCleaner = () => {
    if (newCleaner && !cleaners.includes(newCleaner)) {
      setCleaners([...cleaners, newCleaner]);
      setNewCleaner('');
    }
  };

  const handleRemoveCleaner = (cleaner) => {
    setCleaners(cleaners.filter(c => c !== cleaner));
  };

  const handleSubmit = () => {
    onStatusChange(request.id, status, cleaners);
  };

  // Function to get status badge styling
  const getStatusBadgeClass = (statusValue) => {
    switch (statusValue) {
      case 'New':
        return 'bg-yellow-200 text-yellow-800';
      case 'Pending':
        return 'bg-blue-100 text-blue-800';
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-purple-100 text-purple-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-t-lg border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          Update Request: {request.eventType} for {request.requesterName}
        </h3>
      </div>
      
      <div className="p-6">
        {/* Request Details Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Requester:</p>
            <p className="text-md font-medium">{request.requesterName}</p>
            <p className="text-sm text-gray-600">{request.email}</p>
            <p className="text-sm text-gray-600">{request.contactNumbers}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Event Details:</p>
            <p className="text-md font-medium">{request.eventType}</p>
            <p className="text-sm text-gray-600">Location: {request.location}</p>
            <p className="text-sm text-gray-600">
              Date/Time: {request.eventDate} at {request.eventTime}
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          {/* Current Status */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Status
            </label>
            <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusBadgeClass(request.status)}`}>
              {request.status}
            </span>
          </div>
          
          {/* Status Update Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Update Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          {/* Assigned Cleaners Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assigned Cleaners
            </label>
            
            {/* Display current cleaners with remove buttons */}
            <div className="mb-3 flex flex-wrap gap-2">
              {cleaners.length > 0 ? (
                cleaners.map(cleaner => (
                  <div key={cleaner} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md flex items-center">
                    <span>{cleaner}</span>
                    <button 
                      type="button"
                      onClick={() => handleRemoveCleaner(cleaner)}
                      className="ml-1 text-blue-500 hover:text-blue-700"
                    >
                      ×
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No cleaners assigned</p>
              )}
            </div>
            
            {/* Add new cleaner dropdown */}
            <div className="flex gap-2">
              <select
                value={newCleaner}
                onChange={(e) => setNewCleaner(e.target.value)}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a cleaner to add</option>
                {availableCleaners
                  .filter(cleaner => !cleaners.includes(cleaner))
                  .map((cleaner) => (
                    <option key={cleaner} value={cleaner}>{cleaner}</option>
                  ))}
              </select>
              <button
                type="button"
                onClick={handleAddCleaner}
                disabled={!newCleaner}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusChangeTable;