"use client";
import React, { useEffect } from "react";
import CoursesCard from "@/app/(main)/course/_components/courses-card";
import { useStore } from "@/hooks/store";
import axios from "axios";

const Dashboard = () => {
  const { courses, setCourses } = useStore();

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get("/api/courses");
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (courses.length === 0) fetchCourses();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course, i) => (
          <>
            <CoursesCard key={i} course={course} isDashboard />
          </>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
