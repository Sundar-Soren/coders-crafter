"use client";
import { Course, Section, dummyCourses } from "@/data";
import React, { Suspense, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import VideoPlayer from "@/app/(main)/_components/video-player";
import ProgressBar from "@/app/(main)/_components/progress-bar";
import { useStore } from "@/hooks/store";
import axios from "axios";
import CourseChapter from "@/app/(main)/course/_components/course-chapter";

const MyComponent = ({
  params,
}: {
  params: { slug: string; restIds: [string] };
}) => {
  const [visitedCourse, setVisitedCourse] = useState<Course>();
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [getTheCurrentCahpter, setGetTheCurrentCahpter] = useState<Section>();
  const { getCourseCompletionPercentage, courses, setCourses } = useStore();

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get("/api/courses");
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const selectedCourse = courses.find(
      (course) => course.slug === params.slug
    );
    if (selectedCourse) {
      setVisitedCourse(selectedCourse);

      const getTheChapter = selectedCourse.sections.find(
        (chapter) => chapter.id.toString() === params.restIds[0]
      );

      if (getTheChapter) {
        setGetTheCurrentCahpter(getTheChapter);
        setVideoUrl(getTheChapter.lessons[0].videoLink);
        return;
      }
    } else {
      fetchCourses();
    }
  }, [params.restIds, params.slug]);

  return (
    <div className="lg:flex space-y-5 gap-5 pb-5">
      <div className="w-full lg:w-4/6">
        <div>
          <Suspense fallback="Loading...">
            <VideoPlayer videoUrl={videoUrl} />
          </Suspense>
        </div>
        <div className="mt-2">
          {/* {course && (
            <Card className="p-2">
              <div className="flex gap-1 items-center font-medium mt-2">
                <BookOpen className="h-5 w-5" />
                <p>{course?.sections.length} chapters</p>
              </div>
              <CardTitle className="my-1">{course.title}</CardTitle>
              <CardDescription className="mt-2">
                {course.description}
              </CardDescription>
              <CardContent className="px-0 pt-2 flex gap-1 flex-wrap">
                {getTheCurrentCahpter?.lessons.map((lession, i) => (
                  <div
                    className="px-1 py-1 font-medium text-xs  border-2 rounded-md"
                    key={i}
                  >
                    {lession}
                  </div>
                ))}
              </CardContent>
            </Card>
          )} */}
        </div>
      </div>
      <div className=" w-full lg:w-1/3">
        {/* {course && (
          <div>
            <h1 className="font-semibold text-lg">{course.title}</h1>
            <ProgressBar value={getCourseCompletionPercentage(course?.id)} />
          </div>
        )} */}
        <div className="mt-2">
          {visitedCourse &&
            visitedCourse?.sections.map((section) => (
              <CourseChapter section={section} key={section.id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
