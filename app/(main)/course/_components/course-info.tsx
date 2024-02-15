import { Course } from "@/data";
import { Book, Laptop, Play, VideoIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import CourseSyllabus from "./course-syllabus";

const CourseInfo: React.FC<{ course: Course }> = ({ course }) => {
  const [courseDurationInHours, setCourseDurationInHours] = useState(0);

  const calculateTotalDurationInHours = (): number => {
    const totalMinutes = course.sections.reduce(
      (acc, section) =>
        acc + section.lessons.reduce((acc, lesson) => acc + lesson.duration, 0),
      0
    );
    const totalHours = totalMinutes / 60;
    return Number(totalHours.toFixed(1));
  };

  useEffect(() => {
    setCourseDurationInHours(calculateTotalDurationInHours());
  }, []);

  return (
    <div>
      <div className="p-2 shadow-md rounded-md">
        <h1 className="my-1 font-extrabold text-3xl">{course.title}</h1>
        <p className="mt-2 font-semibold text-base">{course.description}</p>
        <p className="mt-2">Created by : {course.instructor} </p>

        <div className="px-0 pt-2 flex gap-1 flex-wrap"></div>
      </div>
      <div className="p-2 mt-5">
        <h1 className="font-bold text-xl">This course includes:</h1>
        <ul className="mt-1 grid gap-1">
          <li className="flex items-center gap-2">
            <VideoIcon className="h-5 w-5" />
            <span>{courseDurationInHours} hours on-demand video</span>
          </li>
          <li className="flex items-center gap-2">
            <Book className="h-5 w-5" />
            <span>Free access to course materials</span>
          </li>
          <li className="flex items-center gap-2">
            <Laptop className="h-5 w-5" />
            <span>Downloadable source code</span>
          </li>
          <li className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            <span>Self-paced learning</span>
          </li>
        </ul>
      </div>
      <div>
        <CourseSyllabus syllabus={course.sections} />
      </div>
      <div className="p-2 mt-5">
        <div>
          <h2 className="font-bold text-xl">Pre-requisites:</h2>
          <ul className="list-disc ml-5">
            {course.prerequisites.map((prerequisite, index) => (
              <li key={index}>{prerequisite}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
