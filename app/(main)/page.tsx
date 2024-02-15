"use client";
import React, { useEffect } from "react";
import CoursesCard from "@/app/(main)/course/_components/courses-card";
import { Course } from "@/data";
import { useStore } from "@/hooks/store";
import axios from "axios";

const Home = () => {
  const { search, setCourses, courses } = useStore();

  useEffect(() => {
    console.log("DNDKLE");
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("/api/courses");
        setCourses(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, []);

  const filterCourses = (course: Course): boolean => {
    if (search.trim() === "") {
      return true;
    }
    const searchLower = search.toLowerCase();
    return (
      course.title.toLowerCase().includes(searchLower) ||
      course.description.toLowerCase().includes(searchLower) ||
      course.sections.some(
        (section) =>
          section.title.toLowerCase().includes(searchLower) ||
          section.lessons.some(
            (lesson) =>
              lesson.title.toLowerCase().includes(searchLower) ||
              lesson.content.toLowerCase().includes(searchLower)
          )
      )
    );
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses &&
          courses.filter(filterCourses).map((course, i) => (
            <>
              <CoursesCard key={i} course={course} />
            </>
          ))}
      </div>
    </div>
  );
};

export default Home;
