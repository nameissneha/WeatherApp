import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash, CheckCircle } from "lucide-react";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Quick Task Manager</h2>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button onClick={addTask}>Add</Button>
      </div>
      {tasks.map((t, index) => (
        <Card key={index} className="flex justify-between items-center p-3 mb-2">
          <CardContent className={`flex-1 ${t.completed ? "line-through text-gray-400" : ""}`}>
            {t.text}
          </CardContent>
          <div className="flex gap-2">
            <CheckCircle
              className="cursor-pointer text-green-500"
              onClick={() => toggleTask(index)}
            />
            <Trash
              className="cursor-pointer text-red-500"
              onClick={() => deleteTask(index)}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}
