"use client";
import { dummyCourses } from "@/data";
import React from "react";
import CoursesCard from "@/app/(main)/course/_components/courses-card";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {dummyCourses.map((course, i) => (
          <>
            <CoursesCard key={i} course={course} isDashboard />
          </>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
