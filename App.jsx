import React, { useState, useEffect } from 'react';
import { Stack, Queue, LinkedList, HashMap } from './dataService';

export default function App() {
  // State for triggering re-renders when data structures are updated
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  // Data Structure instances (kept in refs or state so they persist)
  const [noticesStack] = useState(new Stack());
  const [tasksQueue] = useState(new Queue());
  const [historyList] = useState(new LinkedList());
  const [courseMap] = useState(new HashMap());

  // 1. Simulate API Call & Populate Data Structures
  useEffect(() => {
    // Populate Stack (Notices)
    noticesStack.push({ id: 1, text: "Library timing changed to 8 PM", date: "10 Oct" });
    noticesStack.push({ id: 2, text: "Exam form link is out!", date: "12 Oct" });
    noticesStack.push({ id: 3, text: "Tomorrow is a holiday", date: "15 Oct" });

    // Populate Queue (Assignments)
    tasksQueue.enqueue({ id: 1, title: "DS Assignment", deadline: "Today" });
    tasksQueue.enqueue({ id: 2, title: "Java Project", deadline: "Tomorrow" });
    tasksQueue.enqueue({ id: 3, title: "Web Lab File", deadline: "Friday" });

    // Populate Linked List (Academic History)
    historyList.append({ sem: "Sem 1", gpa: 8.5 });
    historyList.append({ sem: "Sem 2", gpa: 8.8 });
    historyList.append({ sem: "Sem 3", gpa: 9.1 });

    // Populate HashMap (Course/Student Search)
    courseMap.set("CS101", { name: "Data Structures", prof: "Dr. Sharma", credits: 4 });
    courseMap.set("CS102", { name: "Java Programming", prof: "Prof. Gupta", credits: 3 });
    courseMap.set("202401", { name: "Rahul Kumar", roll: "202401", status: "Active" });

    // Trigger re-render to show populated data
    setUpdateTrigger(prev => prev + 1);
  }, [noticesStack, tasksQueue, historyList, courseMap]);

  // Handlers for Data Structure modifications
  const handleCompleteTask = () => {
    tasksQueue.dequeue(); // FIFO: Removes the oldest task
    setUpdateTrigger(prev => prev + 1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const result = courseMap.get(searchQuery.toUpperCase());
    setSearchResult(result);
  };

  // 2D Array / Matrix for Academic Calendar
  const calendarMatrix = [
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    [ 1,   2,   3,   4,   5,   6,   7 ],
    [ 8,   9,  10,  11,  12,  13,  14 ],
    [15,  16,  17,  18,  19,  20,  21 ],
    [22,  23,  24,  25,  26,  27,  28 ]
  ];

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
        
        {/* ==========================================
            A. SIDEBAR NAVIGATION
            ========================================== */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
          <div className="p-6 text-2xl font-bold text-blue-600 dark:text-blue-400 border-b dark:border-gray-700">
            DS Dashboard
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <a href="#" className="block p-3 rounded bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-300 font-semibold">Dashboard Home</a>
            <a href="#" className="block p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-700">My Courses <span className="text-xs text-gray-400">(List)</span></a>
            <a href="#" className="block p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-700">Assignments <span className="text-xs text-gray-400">(Queue)</span></a>
            <a href="#" className="block p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-700">Notices <span className="text-xs text-gray-400">(Stack)</span></a>
          </nav>
        </aside>

        {/* MAIN LAYOUT */}
        <div className="flex-1 flex flex-col overflow-hidden">
          
          {/* ==========================================
              B. TOP HEADER
              ========================================== */}
          <header className="h-16 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-6">
            
            {/* Quick Search using HashMap */}
            <form onSubmit={handleSearch} className="flex gap-2">
              <input 
                type="text" 
                placeholder="Search Course/ID (e.g., CS101)" 
                className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">O(1) Search</button>
            </form>

            <div className="flex items-center gap-6">
              {/* Notification Bell (Peek from Stack) */}
              <div className="relative group cursor-pointer">
                <span className="text-2xl">🔔</span>
                {noticesStack.peek() && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">1</span>
                )}
                {/* Tooltip showing the top of the stack */}
                <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded p-2 text-sm z-50">
                  <p className="font-bold text-gray-500 dark:text-gray-300 text-xs mb-1">Latest Notice (Stack Peek)</p>
                  {noticesStack.peek()?.text || "No new notices"}
                </div>
              </div>

              {/* Dark Mode Toggle & Profile */}
              <button onClick={() => setDarkMode(!darkMode)} className="text-xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                {darkMode ? '☀️' : '🌙'}
              </button>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-blue-500 rounded-full"></div>
                <span className="font-medium">Admin Student</span>
              </div>
            </div>
          </header>

          {/* ==========================================
              C. MAIN CONTENT AREA (WIDGETS)
              ========================================== */}
          <main className="flex-1 overflow-y-auto p-6">
            
            {/* Hash Map Search Results Display */}
            {searchResult && (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 rounded-lg">
                <h3 className="font-bold text-green-800 dark:text-green-200">Hash Map Result (O(1) lookup):</h3>
                <pre className="text-sm mt-2">{JSON.stringify(searchResult, null, 2)}</pre>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* WIDGET 1: OVERVIEW CARD */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <h2 className="text-gray-500 dark:text-gray-400 font-semibold mb-2">Overview</h2>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Current CGPA</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">9.1</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Attendance</p>
                  <p className="text-3xl font-bold text-green-500">85%</p>
                </div>
              </div>

              {/* WIDGET 2: RECENT NOTICES (STACK) */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold">Notices <span className="text-xs font-normal bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Stack (LIFO)</span></h2>
                </div>
                <div className="flex-1 overflow-y-auto space-y-3">
                  {noticesStack.toArray().map((notice, index) => (
                    <div key={notice.id} className={`p-3 rounded border-l-4 ${index === 0 ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'}`}>
                      <p className="text-sm font-semibold">{notice.text}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notice.date}</p>
                    </div>
                  ))}
                  {noticesStack.toArray().length === 0 && <p className="text-sm text-gray-500">No notices.</p>}
                </div>
              </div>

              {/* WIDGET 3: UPCOMING TASKS (QUEUE) */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold">Tasks <span className="text-xs font-normal bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Queue (FIFO)</span></h2>
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                  {tasksQueue.toArray().map((task, index) => (
                    <div key={task.id} className={`flex justify-between p-3 rounded bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 ${index === 0 ? 'ring-2 ring-blue-500' : ''}`}>
                      <div>
                        <p className="text-sm font-semibold">{task.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Due: {task.deadline}</p>
                      </div>
                      {index === 0 && <span className="text-xs text-blue-600 dark:text-blue-400 font-bold self-center">Next in Queue</span>}
                    </div>
                  ))}
                  {tasksQueue.isEmpty() && <p className="text-sm text-gray-500">All caught up!</p>}
                </div>
                <button 
                  onClick={handleCompleteTask} 
                  disabled={tasksQueue.isEmpty()}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 rounded transition-colors"
                >
                  Complete Next Task (Dequeue)
                </button>
              </div>
              

              {/* WIDGET 4: ACADEMIC CALENDAR (2D ARRAY) */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <h2 className="font-bold mb-4">Calendar <span className="text-xs font-normal bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">2D Array</span></h2>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {calendarMatrix.map((row, rowIndex) => (
                    row.map((cell, colIndex) => (
                      <div 
                        key={`${rowIndex}-${colIndex}`} 
                        className={`p-1 text-sm ${rowIndex === 0 ? 'font-bold text-gray-400' : 'text-gray-700 dark:text-gray-300'} ${cell === 15 ? 'bg-blue-600 text-white rounded-full font-bold' : ''}`}
                      >
                        {cell}
                      </div>
                    ))
                  ))}
                </div>
              </div>
              
            </div>

            {/* BONUS: ACADEMIC HISTORY (LINKED LIST) */}
            <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h2 className="font-bold mb-4">Academic History <span className="text-xs font-normal bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Linked List</span></h2>
              <div className="flex items-center gap-4 overflow-x-auto pb-4">
                {historyList.toArray().map((node, index, arr) => (
                  <React.Fragment key={index}>
                    <div className="min-w-[120px] bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 text-center">
                      <p className="font-bold">{node.sem}</p>
                      <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold">{node.gpa}</p>
                    </div>
                    {/* Visual representation of Linked List pointers */}
                    {index < arr.length - 1 && (
                      <div className="text-gray-400 font-bold">→</div>
                    )}
                  </React.Fragment>
                ))}
                <div className="text-gray-400 font-bold">→ null</div>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
