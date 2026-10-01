import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  CloudSun,
  CheckCircle2,
  Circle,
  Plus,
  ArrowLeft,
  Search,
  BookOpen,
} from 'lucide-react';

export const NeutralPage: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review quarterly project notes', done: true },
    { id: 2, text: 'Grocery shopping: oats, milk, fruit', done: false },
    { id: 3, text: 'Water balcony house plants', done: false },
    { id: 4, text: 'Pick up library book chapter 4', done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-800 p-6 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Minimal Bar */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-xs">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Daily Planner</h1>
              <p className="text-xs text-stone-500">Thursday, October 1 • Week 40</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Subtle, discreet return hint for demo walkthrough */}
            <button
              onClick={() => navigate('/home')}
              className="text-[11px] text-stone-400 hover:text-stone-700 px-2 py-1 rounded transition-colors inline-flex items-center gap-1 cursor-pointer"
              title="Return to demo session"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Resume</span>
            </button>
          </div>
        </div>

        {/* Weather & Quote Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Weather Widget */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">
                Local Forecast
              </span>
              <div className="text-2xl font-bold text-slate-900 mt-1">26°C</div>
              <div className="text-xs text-stone-500">Jaipur, RJ • Clear Skies</div>
            </div>
            <CloudSun className="w-10 h-10 text-amber-500/80" />
          </div>

          {/* Daily Quote (2 cols) */}
          <div className="md:col-span-2 p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-center">
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-1">
              Thought of the Day
            </span>
            <blockquote className="text-sm font-medium text-slate-700 italic">
              “Focus on one small task at a time. Steady progress creates quiet resilience.”
            </blockquote>
          </div>
        </div>

        {/* Planner Task List & Calendar Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Task Checklist (2 cols) */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900">Today’s Checklists</h2>
              <span className="text-xs text-stone-400">
                {tasks.filter((t) => t.done).length}/{tasks.length} Completed
              </span>
            </div>

            <div className="space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer text-xs transition-colors ${
                    task.done
                      ? 'bg-stone-50 border-stone-200 text-stone-400 line-through'
                      : 'bg-white border-stone-200 text-slate-800 hover:border-stone-300'
                  }`}
                >
                  {task.done ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-stone-300 shrink-0" />
                  )}
                  <span className="flex-1 font-medium">{task.text}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 font-medium cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add new item</span>
              </button>
            </div>
          </div>

          {/* Calendar Preview Mini Grid (1 col) */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900">October 2026</h2>
              <Calendar className="w-4 h-4 text-stone-400" />
            </div>

            {/* Days mini table */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-stone-400 font-semibold">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              <span className="text-stone-300 p-1.5">27</span>
              <span className="text-stone-300 p-1.5">28</span>
              <span className="text-stone-300 p-1.5">29</span>
              <span className="text-stone-300 p-1.5">30</span>
              <span className="p-1.5 rounded-lg bg-stone-900 text-white font-bold">1</span>
              <span className="p-1.5 text-stone-700">2</span>
              <span className="p-1.5 text-stone-700">3</span>
              <span className="p-1.5 text-stone-700">4</span>
              <span className="p-1.5 text-stone-700">5</span>
              <span className="p-1.5 text-stone-700">6</span>
              <span className="p-1.5 text-stone-700">7</span>
              <span className="p-1.5 text-stone-700">8</span>
              <span className="p-1.5 text-stone-700">9</span>
              <span className="p-1.5 text-stone-700">10</span>
            </div>

            <div className="text-[11px] text-stone-400 pt-2 border-t border-stone-100">
              No conflicts scheduled for this afternoon.
            </div>
          </div>
        </div>

        {/* Small Discreet Disclaimers */}
        <div className="text-center text-[11px] text-stone-400 pt-6">
          Daily Planner application interface. This screen does not clear browser history or cookies.
        </div>
      </div>
    </div>
  );
};
